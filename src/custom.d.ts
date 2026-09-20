// Allow importing common image types in TypeScript
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';
declare module '*.ico';

declare module '*.svg' {
  const content: any;
  export default content;
}
