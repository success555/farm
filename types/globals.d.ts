export {};

export type Roles = 'admin' | 'farm_manager' | 'customer';

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: Roles;
    };
    role?: Roles;
  }

  interface UserPublicMetadata {
    role?: Roles;
  }
}

