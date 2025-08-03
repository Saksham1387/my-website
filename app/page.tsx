import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { ThemeProvider } from "@/components/theme-provider";
import { GitHubIcon, TwitterIcon } from "@/components/Socialicon";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, projects } from "../info";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingPosts } from "@/components/LandingPosts";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
        <Toaster />

        <main className="container mx-auto px-6 py-16 max-w-3xl">
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold">{name}</h1>
              <div className="flex gap-2">
                <a
                  href="https://github.com/saksham1387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Saksham37718116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <TwitterIcon className="w-5 h-5 pt-1" />
                </a>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{bio}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium mb-3">Work Experience</h2>

            <div className="mb-8">
              <a
                href="https://www.starboard-ai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
              >
                Starboard AI
              </a>
              <p className="text-zinc-600 dark:text-zinc-400">
                Founding Engineer
              </p>
            </div>

            <div className="mb-8">
              <a
                href="https://www.valuemetrix.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
              >
                valuemetrix 
              </a>
              <p className="text-zinc-600 dark:text-zinc-400">
                Full Stack Intern
              </p>
            </div>

            <div className="mb-8">
              <a
                href="https://www.mkrypt.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
              >
                Mkrypt
              </a>
              <p className="text-zinc-600 dark:text-zinc-400">
                Founding Engineer
              </p>
            </div>

            <div className="mb-8">
              <a
                href="https://www.linkedin.com/company/cncgnd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
              >
                CNCF New Delhi
              </a>
              <p className="text-zinc-600 dark:text-zinc-400">
                Full Stack Engineer
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Latest blog posts</h2>
              <Link
                href="/blogs"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1 text-sm transition-colors"
              >
                View all posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
           

           <LandingPosts/>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-6">My other Projects</h2>

            {projects.map((project, index) => (
              <div className="mb-8" key={index}>
                <a
                  href={project.github}
                  className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
                >
                  {project.name}
                </a>
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  {project.description}
                </p>
              </div>
            ))}
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium mb-6">Connect with me</h2>
            <ContactForm />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
