"use client";

import { useState } from "react";
import { hotelData } from "@/data/hotelData";

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [message, setMessage] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      setMessage("Please fill in name, phone, and email.");
      return;
    }

    setMessage("Demo mode: form validated locally. Connect backend delivery before going live.");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-3 rounded-3xl border border-white/15 bg-[#14130f] p-7 text-sm text-blue-100/85">
        <p>{hotelData.contact.phone}</p>
        <p>{hotelData.contact.email}</p>
        <p>{hotelData.contact.address}</p>
        <p>Instagram: {hotelData.social.instagram}</p>
        <p>Facebook: {hotelData.social.facebook}</p>
      </div>
      <form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-white/15 bg-[#14130f] p-7">
        <input
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm"
          placeholder="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm"
          placeholder="Phone"
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          required
        />
        <input
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <textarea
          className="min-h-32 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm"
          placeholder="Message"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        />
        <button className="rounded-full bg-[#b8893e] px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#0b0b08] hover:bg-[#d6ad63]">Send Inquiry</button>
        {message ? <p className="text-xs text-blue-100/75">{message}</p> : null}
      </form>
    </div>
  );
}
