"use client";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied");
    } catch {
      setStatus("Couldn’t copy. Use the email link.");
    }
  }
  return (
    <span className="copy-email">
      <button type="button" onClick={copy}>
        Copy email
      </button>
      <span role="status">{status}</span>
    </span>
  );
}
