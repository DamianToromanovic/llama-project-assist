"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword(loginData);

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleDemoLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "demo@project-pilot.dev",
      password: "!Demo1234!",
    });

    if (error) {
      setError("Demo-Login fehlgeschlagen.");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded shadow">
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
