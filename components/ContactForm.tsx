"use client";
import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

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
            title: "Success!",
            description: "Thank you for joining the community!",
          });
          setName("");
          setEmail("");
          setMessage("");
          setIsSubmitting(false);
        }, 1000);
      } else {
        toast({
          title: "Failed to send Message",
          description: "Thank you for joining the community!",
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f5f5f5] focus:right-0"
              placeholder="Saksham"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f5f5f5]"
              placeholder="saksham@developer.com"
              required
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#333333] hover:bg-zinc-900 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 w-full cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#f5f5f5]"
            placeholder="Type your message here..."
            rows={4}
            required
          />
        </div>
      </div>
    </form>
  );
}
