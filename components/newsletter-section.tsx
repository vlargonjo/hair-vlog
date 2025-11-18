"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика подписки
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="border-t border-slate-200 bg-gradient-to-br from-brand/5 to-brand/10 py-16 dark:border-slate-800">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/20">
              <Mail className="h-8 w-8 text-brand" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Подпишитесь на рассылку!
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Будьте в курсе эксклюзивных предложений, промо-акций, вдохновения и советов.
            <br />
            <span className="font-medium text-brand">Подпишитесь сейчас и получите доступ к уникальным предложениям!</span>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={submitted} className="sm:w-auto">
              {submitted ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Подписано!
                </>
              ) : (
                "Подписаться"
              )}
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Подписываясь, вы соглашаетесь с нашей политикой конфиденциальности. 
            Вы можете отписаться в любое время.
          </p>
        </div>
      </div>
    </section>
  );
}

