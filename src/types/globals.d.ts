export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: number;
    };
  }
}
