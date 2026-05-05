"use client";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    formData.email = email;
    formData.message = message;
    formData.name = name;

    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setTimeout(() => {
          toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
          });
          setName("");
          setEmail("");
          setMessage("");
          setIsSubmitting(false);
        }, 1000);
      } else {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (_) {
      console.log(_);
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-8 text-xs bg-card border-border/60 focus:border-foreground/30"
            placeholder="Name"
            required
          />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 text-xs bg-card border-border/60 focus:border-foreground/30"
            placeholder="Email"
            required
          />
        </div>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs bg-card border-border/60 focus:border-foreground/30 min-h-[60px]"
          placeholder="What's on your mind?"
          rows={2}
          required
        />
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-foreground text-background hover:opacity-90 cursor-pointer rounded-full px-4 h-7 text-xs gap-1.5"
          >
            {isSubmitting ? "Sending..." : "Send"}
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </form>
  );
}
