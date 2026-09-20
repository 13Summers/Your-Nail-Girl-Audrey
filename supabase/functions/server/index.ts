import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

const app = new Hono();
app.use("*", logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

const BASE = "/make-server-89ce6392";

const BOOKING_TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

function normalizeEmail(email: string) {
  return String(email || "").trim().toLowerCase();
}

function makeReferralCode(name: string) {
  const prefix = String(name || "NAIL").trim().split(" ")[0].toUpperCase().slice(0, 4) || "NAIL";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}

function joinedDateLabel() {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

async function ensureClientIndexed(email: string) {
  const index: string[] = await kv.get("clients:index") ?? [];
  if (!index.includes(email)) {
    await kv.set("clients:index", [...index, email]);
  }
}

async function activeAppointmentAtSlot(date: string, time: string) {
  const index: string[] = await kv.get("clients:index") ?? [];
  for (const email of index) {
    const appointments: any[] = await kv.get(`appointments:${email}`) ?? [];
    const found = appointments.find((appt) =>
      appt.date === date &&
      appt.time === time &&
      String(appt.status || "").toLowerCase() !== "cancelled"
    );
    if (found) return found;
  }
  return null;
}

async function getUnavailableSlots() {
  const index: string[] = await kv.get("clients:index") ?? [];
  const unavailable: Record<string, string[]> = {};
  for (const email of index) {
    const appointments: any[] = await kv.get(`appointments:${email}`) ?? [];
    for (const appt of appointments) {
      if (!appt.date || !appt.time) continue;
      if (String(appt.status || "").toLowerCase() === "cancelled") continue;
      unavailable[appt.date] = Array.from(new Set([...(unavailable[appt.date] ?? []), appt.time]));
    }
  }
  return unavailable;
}

app.get(`${BASE}/health`, (c) => c.json({ status: "ok" }));

// ── Public: portfolio gallery ────────────────────────────────────────────────
app.get(`${BASE}/portfolio-gallery`, async (c) => {
  const gallery = await kv.get("portfolio:gallery") ?? [];
  return c.json({ gallery });
});

// ── Admin auth middleware ──────────────────────────────────────────────────────
const adminAuth = async (c: any, next: any) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return c.json({ error: "Unauthorized" }, 401);
  const session = await kv.get(`admin_session:${token}`);
  if (!session) return c.json({ error: "Unauthorized" }, 401);
  return next();
};

// ── Admin: login ──────────────────────────────────────────────────────────────
app.post(`${BASE}/admin/login`, async (c) => {
  const { password } = await c.req.json();
  const storedPw = await kv.get("admin:password") ?? "AudreyAdmin2026!";
  if (password !== storedPw) return c.json({ error: "Invalid password" }, 401);
  const token = crypto.randomUUID();
  await kv.set(`admin_session:${token}`, { createdAt: Date.now() });
  return c.json({ token });
});

// ── Admin: change password ────────────────────────────────────────────────────
app.put(`${BASE}/admin/password`, adminAuth, async (c) => {
  const { newPassword } = await c.req.json();
  if (!newPassword || newPassword.length < 8) return c.json({ error: "Password must be at least 8 characters" }, 400);
  await kv.set("admin:password", newPassword);
  return c.json({ ok: true });
});

// ── Admin: portfolio gallery ─────────────────────────────────────────────────
app.put(`${BASE}/admin/portfolio-gallery`, adminAuth, async (c) => {
  const { gallery } = await c.req.json();
  if (!Array.isArray(gallery)) return c.json({ error: "Gallery must be an array" }, 400);
  await kv.set("portfolio:gallery", gallery);
  return c.json({ gallery });
});

// ── Admin: list all clients ───────────────────────────────────────────────────
app.get(`${BASE}/admin/clients`, adminAuth, async (c) => {
  const index: string[] = await kv.get("clients:index") ?? [];
  const clients = (await Promise.all(
    index.map(async (email) => {
      const client = await kv.get(`client:${email}`);
      if (!client) return null;
      const { password: _pw, ...safe } = client;
      return safe;
    })
  )).filter(Boolean);
  return c.json({ clients });
});

// ── Admin: get single client ──────────────────────────────────────────────────
app.get(`${BASE}/admin/clients/:email`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const client = await kv.get(`client:${email}`);
  if (!client) return c.json({ error: "Not found" }, 404);
  const { password: _pw, ...safe } = client;
  return c.json({ client: safe });
});

// ── Admin: update client ──────────────────────────────────────────────────────
app.put(`${BASE}/admin/clients/:email`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const client = await kv.get(`client:${email}`);
  if (!client) return c.json({ error: "Not found" }, 404);
  const body = await c.req.json();
  const updated = { ...client, ...body, email: client.email, password: client.password };
  await kv.set(`client:${email}`, updated);
  const { password: _pw, ...safe } = updated;
  return c.json({ client: safe });
});

// ── Admin: delete client ──────────────────────────────────────────────────────
app.delete(`${BASE}/admin/clients/:email`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  await kv.del(`client:${email}`);
  await kv.del(`appointments:${email}`);
  const index: string[] = await kv.get("clients:index") ?? [];
  await kv.set("clients:index", index.filter((e) => e !== email));
  return c.json({ ok: true });
});

// ── Admin: adjust credits ─────────────────────────────────────────────────────
app.post(`${BASE}/admin/clients/:email/credits`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const { delta } = await c.req.json();
  const client = await kv.get(`client:${email}`);
  if (!client) return c.json({ error: "Not found" }, 404);
  const updated = { ...client, referralCredits: Math.max(0, (client.referralCredits ?? 0) + delta) };
  await kv.set(`client:${email}`, updated);
  return c.json({ referralCredits: updated.referralCredits });
});

// ── Admin: get appointments for client ───────────────────────────────────────
app.get(`${BASE}/admin/clients/:email/appointments`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const appointments = await kv.get(`appointments:${email}`) ?? [];
  return c.json({ appointments });
});

// ── Admin: add appointment ────────────────────────────────────────────────────
app.post(`${BASE}/admin/clients/:email/appointments`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const appt = await c.req.json();
  const existing: any[] = await kv.get(`appointments:${email}`) ?? [];
  const newAppt = { ...appt, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  await kv.set(`appointments:${email}`, [newAppt, ...existing]);
  return c.json({ appointment: newAppt });
});

// ── Admin: delete appointment ─────────────────────────────────────────────────
app.delete(`${BASE}/admin/clients/:email/appointments/:id`, adminAuth, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const id = c.req.param("id");
  const existing: any[] = await kv.get(`appointments:${email}`) ?? [];
  await kv.set(`appointments:${email}`, existing.filter((a) => a.id !== id));
  return c.json({ ok: true });
});

// ── Admin: stats ──────────────────────────────────────────────────────────────
app.get(`${BASE}/admin/stats`, adminAuth, async (c) => {
  const index: string[] = await kv.get("clients:index") ?? [];
  let totalCredits = 0;
  let totalAppointments = 0;
  for (const email of index) {
    const client = await kv.get(`client:${email}`);
    if (client) totalCredits += client.referralCredits ?? 0;
    const appts: any[] = await kv.get(`appointments:${email}`) ?? [];
    totalAppointments += appts.length;
  }
  return c.json({ totalClients: index.length, totalAppointments, totalCredits });
});

// ── Client: register ──────────────────────────────────────────────────────────
app.post(`${BASE}/clients/register`, async (c) => {
  const body = await c.req.json();
  const { name, email, phone, password, referralCode, joinedDate } = body;
  if (!name || !email || !phone || !password) return c.json({ error: "All fields required" }, 400);
  const normalizedEmail = normalizeEmail(email);
  const key = `client:${normalizedEmail}`;
  const existing = await kv.get(key);
  if (existing?.password) return c.json({ error: "Email already registered" }, 409);
  const client = {
    ...(existing ?? {}),
    name,
    email: normalizedEmail,
    phone,
    password,
    referralCode: existing?.referralCode ?? referralCode,
    referralCredits: existing?.referralCredits ?? 0,
    joinedDate: existing?.joinedDate ?? joinedDate,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await kv.set(key, client);
  await ensureClientIndexed(normalizedEmail);
  const { password: _pw, ...safe } = client;
  return c.json({ user: safe });
});

// ── Client: login ─────────────────────────────────────────────────────────────
app.post(`${BASE}/clients/login`, async (c) => {
  const { email, password } = await c.req.json();
  const client = await kv.get(`client:${email.toLowerCase()}`);
  if (!client || client.password !== password) return c.json({ error: "Invalid email or password" }, 401);
  const { password: _pw, ...safe } = client;
  return c.json({ user: safe });
});

// ── Client: update own profile ────────────────────────────────────────────────
app.put(`${BASE}/clients/:email`, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const client = await kv.get(`client:${email.toLowerCase()}`);
  if (!client) return c.json({ error: "Not found" }, 404);
  const body = await c.req.json();
  const allowed = ["name", "phone"];
  const updates: any = {};
  allowed.forEach((k) => { if (body[k] !== undefined) updates[k] = body[k]; });
  const updated = { ...client, ...updates };
  await kv.set(`client:${email.toLowerCase()}`, updated);
  const { password: _pw, ...safe } = updated;
  return c.json({ user: safe });
});

// ── Client: get own appointments ──────────────────────────────────────────────
app.get(`${BASE}/clients/:email/appointments`, async (c) => {
  const email = decodeURIComponent(c.req.param("email"));
  const appointments = await kv.get(`appointments:${email.toLowerCase()}`) ?? [];
  return c.json({ appointments });
});

// ── Public booking widget: unavailable slots ─────────────────────────────────
app.get(`${BASE}/appointments/unavailable`, async (c) => {
  const unavailable = await getUnavailableSlots();
  return c.json({ unavailable });
});

// ── Public booking widget: schedule appointment ──────────────────────────────
app.post(`${BASE}/appointments/book`, async (c) => {
  const body = await c.req.json();
  const cleanName = String(body.name ?? "").trim();
  const cleanEmail = normalizeEmail(body.email);
  const cleanPhone = String(body.phone ?? "").trim();
  const service = String(body.service ?? "").trim();
  const date = String(body.date ?? "").trim();
  const time = String(body.time ?? "").trim();
  const notes = String(body.notes ?? "").trim();
  const serviceCategory = String(body.serviceCategory ?? "").trim();
  const price = String(body.price ?? "").trim();

  if (!cleanName || !cleanEmail || !cleanPhone || !service || !date || !time) {
    return c.json({ error: "Name, email, phone, service, date, and time are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return c.json({ error: "Please enter a valid email address." }, 400);
  }
  if (!/^\+?[\d\s\-().]{7,}$/.test(cleanPhone)) {
    return c.json({ error: "Please enter a valid phone number." }, 400);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return c.json({ error: "Please choose a valid date." }, 400);
  }
  const day = new Date(`${date}T00:00:00.000Z`).getUTCDay();
  if (![2, 3, 4, 5, 6].includes(day)) {
    return c.json({ error: "Appointments are available Tuesday through Saturday." }, 400);
  }
  if (!BOOKING_TIMES.includes(time)) {
    return c.json({ error: "Please choose an available appointment time." }, 400);
  }

  const taken = await activeAppointmentAtSlot(date, time);
  if (taken) {
    return c.json({ error: "That appointment time was just booked. Please choose another time." }, 409);
  }

  const now = new Date().toISOString();
  const clientKey = `client:${cleanEmail}`;
  const existingClient = await kv.get(clientKey);
  const client = {
    ...(existingClient ?? {}),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    referralCode: existingClient?.referralCode ?? makeReferralCode(cleanName),
    referralCredits: existingClient?.referralCredits ?? 0,
    joinedDate: existingClient?.joinedDate ?? joinedDateLabel(),
    createdAt: existingClient?.createdAt ?? now,
    lastBookedAt: now,
  };

  await kv.set(clientKey, client);
  await ensureClientIndexed(cleanEmail);

  const appointment = {
    id: crypto.randomUUID(),
    service,
    serviceCategory,
    price,
    date,
    time,
    status: "Upcoming",
    notes,
    clientName: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    source: "site-booking-widget",
    createdAt: now,
  };

  const existingAppointments: any[] = await kv.get(`appointments:${cleanEmail}`) ?? [];
  await kv.set(`appointments:${cleanEmail}`, [appointment, ...existingAppointments]);
  return c.json({ appointment }, 201);
});

Deno.serve(app.fetch);
