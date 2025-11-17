"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
  );

  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>;
}

