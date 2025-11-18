"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const [supabase] = useState(() =>
    createPagesBrowserClient({
      supabaseUrl,
      supabaseKey
    })
  );

  return <SessionContextProvider supabaseClient={supabase}>{children}</SessionContextProvider>;
}

