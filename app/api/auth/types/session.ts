export type authSession = { 
  user: {
      id: string;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
  };
  expires: string;
} | undefined
