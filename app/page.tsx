import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { ThemeProvider } from "@/components/theme-provider";
import { GitHubIcon, TwitterIcon } from "@/components/Socialicon";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, projects } from "../info";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-orange-100/10 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
        <Toaster />

        <main className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="absolute top-6 right-6">
            <SimpleThemeToggle />
          </div>

          {/* Header Section */}
          <section className="mb-8">
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

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Section */}
            <div className="space-y-8">
              {/* Work Experience */}
              <section>
                <h2 className="text-xl font-medium mb-4">Work Experience</h2>
                <div className="space-y-4">
                  <div>
                    <a
                      href="https://www.starboard-ai.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
                    >
                      Starboard AI
                    </a>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Founding Engineer
                    </p>
                  </div>

                  <div>
                    <a
                      href="https://www.valuemetrix.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline "
                    >
                      Valuemetrix
                    </a>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Full Stack Intern
                    </p>
                  </div>

                  <div>
                    <a
                      href="https://www.mkrypt.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
                    >
                      Mkrypt
                    </a>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Founding Engineer
                    </p>
                  </div>

                  <div>
                    <a
                      href="https://www.linkedin.com/company/cncgnd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
                    >
                      CNCF New Delhi
                    </a>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Full Stack Engineer
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-medium mb-4">Connect with me</h2>
                <ContactForm />
              </section>
            </div>

            {/* Right Section */}
            <div className="space-y-8">
              {/* Projects */}
              <section>
                <h2 className="text-xl font-medium mb-4">My other Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index}>
                      <a
                        href={project.github}
                        className="text-zinc-800 dark:text-zinc-200 font-medium hover:underline"
                      >
                        {project.name}
                      </a>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Blog Posts */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Recent Posts</h2>
                  <Link
                    href="/blogs"
                    className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 inline-flex items-center gap-1 transition-colors"
                  >
                    all posts <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blogs/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-zinc-800 dark:text-zinc-200 text-sm font-medium group-hover:underline truncate">
                          {post.title}
                        </p>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
