import { auth } from '@clerk/nextjs/server';
import { Roles } from '@/types/globals';

export const checkRole = (role: Roles): boolean => {
  const { sessionClaims } = auth();
  const userRole = sessionClaims?.metadata?.role || sessionClaims?.role;
  return userRole === role;
};

export const getUserRole = (): Roles | undefined => {
  const { sessionClaims } = auth();
  return sessionClaims?.metadata?.role || sessionClaims?.role;
};

