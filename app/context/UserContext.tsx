"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Importiere den konfigurierten Supabase-Client aus deinem lib-Verzeichnis
import { supabase } from "@/lib/supabase";
// Importiere den User-Typ aus dem Supabase SDK – damit TypeScript weiß, wie ein User aussieht
import { User } from "@supabase/supabase-js";

// Definition des Typs für den Context, den wir gleich erstellen:
// - user: aktueller eingeloggter Benutzer oder null
// - setUser: Funktion, um den Benutzer zu setzen oder zu löschen
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

// React-Komponente, die den UserContext bereitstellt.
// Diese Komponente umschließt später das gesamte App-Layout (in layout.tsx)
export function UserProvider({ children }: { children: React.ReactNode }) {
  // State für den eingeloggten Benutzer
  const [user, setUser] = useState<User | null>(null);

  // Effekt läuft einmal beim Laden der App
  useEffect(() => {
    // 1. Session abfragen (wenn bereits eingeloggt)
    const getSession = async () => {
      const { data } = await supabase.auth.getSession(); // Supabase-Funktion: aktuelle Session abrufen
      setUser(data.session?.user ?? null); // Wenn Session vorhanden → User speichern, sonst null
    };
    getSession();

    // 2. Echtzeit-Listener: reagiert auf Login- und Logout-Events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Wenn ein Auth-Event passiert (Login, Logout, Token-Wechsel), aktualisiere den User
        setUser(session?.user ?? null);
      }
    );

    // 3. Cleanup: Wenn Komponente entladen wird → Listener wieder entfernen
    return () => {
      listener.subscription.unsubscribe(); // Supabase empfiehlt das, um Speicherlecks zu vermeiden
    };
  }, []);

  // Der Context stellt user + setUser global zur Verfügung
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook: Zugriff auf den UserContext
// Damit kannst du in jeder Komponente schreiben: const { user } = useUser();
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
