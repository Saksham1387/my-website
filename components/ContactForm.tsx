"use client";

import { useState } from "react";
import type React from "react";

import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Please try again.",
        });
      }
    } catch {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-row">
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contact-input"
          placeholder="Name"
          aria-label="Name"
          autoComplete="name"
          required
        />
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="contact-input"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
      </div>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="contact-input contact-textarea"
        placeholder="What's on your mind?"
        aria-label="Message"
        rows={3}
        required
      />
      <button type="submit" disabled={isSubmitting} className="contact-submit">
        {isSubmitting ? "Sending..." : "Send →"}
      </button>
    </form>
  );
}
