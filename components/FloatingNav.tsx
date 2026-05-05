"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, FileText, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home, external: false },
  { name: "Blog", href: "https://sakshamchaudhary.substack.com", icon: Newspaper, external: true },
  { name: "Notes", href: "https://chemical-card-e29.notion.site/My-Work-1d239851fb19800cb12de90cf8362db2", icon: NotebookPen, external: true },
  { name: "Resume", href: "https://drive.google.com/file/d/1srW6BmZ81EW-13pG-wHd8vRTMWyXNJZg/view?usp=sharing", icon: FileText, external: true },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed bottom-6 left-1/2 z-50"
    >
      <nav className="flex items-center gap-1 p-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-700/40 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-lg shadow-zinc-300/20 dark:shadow-black/30">
        {navItems.map((item) => {
          const isActive = !item.external && pathname === item.href;
          const linkProps = item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <Link
              key={item.name}
              href={item.href}
              {...linkProps}
              className={cn(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200",
                isActive
                  ? "text-white dark:text-zinc-900"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
