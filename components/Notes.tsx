"use client";

import React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Notes() {
  const [note, setNote] = useState<string>("");

  return <div>Notizblock</div>;
}
