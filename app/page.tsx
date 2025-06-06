"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAppStore } from "./store/useAppStore";

type Login = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const login = async (email: string, password: string) => {
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (authError || !user) {
      setError(authError?.message || "Login fehlgeschlagen");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      setError("Profil konnte nicht geladen werden.");
      return;
    }

    setUser(profile);
    router.push("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
  };

  const handleDemoLogin = async () => {
    await login("demo@project-pilot.dev", "!Demo1234!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-accent p-6 rounded shadow-xl">
        <header className="text-xl font-bold mb-4 text-center">
          Login zu ProjectPilot
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
          >
            Demo starten
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}
