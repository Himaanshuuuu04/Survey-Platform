"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Audience = 'brands' | 'participants';

const Ctx = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: 'brands',
  setAudience: () => {},
});

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('brands');
  useEffect(() => {
    document.documentElement.setAttribute('data-audience', audience);
  }, [audience]);
  return <Ctx.Provider value={{ audience, setAudience }}>{children}</Ctx.Provider>;
}

export const useAudience = () => useContext(Ctx);
