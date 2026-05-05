import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { GitHubIcon, TwitterIcon } from "@/components/Socialicon";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, projects, resumeUrl, notionUrl } from "../info";
import { getSubstackPosts } from "@/lib/substack";
import { ArrowUpRight, Download, NotebookPen } from "lucide-react";

const workExperience = [
  { company: "Starboard AI (Current)", role: "Founding Engineer", url: "https://www.starboard-ai.com/" },
  { company: "Valuemetrix", role: "Full Stack Intern", url: "https://www.valuemetrix.io/" },
  { company: "Mkrypt", role: "Founding Engineer", url: "https://www.mkrypt.org/" },
  { company: "CNCF New Delhi", role: "Full Stack Engineer", url: "https://www.linkedin.com/company/cncgnd/" },
];

const Index = async () => {
  const allPosts = await getSubstackPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Toaster />

      <main className="mx-auto max-w-6xl px-6 sm:px-8 py-8">

        {/* ── Header row ── */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl tracking-tight leading-none mb-1.5">
              {name}
            </h1>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              {bio}
            </p>
          </div>
          <SimpleThemeToggle />
        </div>

        {/* ── Link pills ── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <a
            href="https://github.com/saksham1387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href="https://x.com/Saksham1184122"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            Twitter
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Download className="w-3 h-3" />
            Resume
          </a>
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            <NotebookPen className="w-3 h-3" />
            My Work
          </a>
        </div>

        <div className="section-divider mb-8" />

        {/* ── Main two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-8">

            {/* Work Experience */}
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight mb-3">
                Experience
              </h2>
              <div className="space-y-0">
                {workExperience.map((job) => (
                  <a
                    key={job.company}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 border-b border-border/50 hover:border-foreground/20 transition-colors"
                  >
                    <div>
                      <span className="font-medium text-sm group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {job.company}
                      </span>
                      <p className="text-[11px] text-muted-foreground">{job.role}</p>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight mb-1">
                Say hello
              </h2>
              <p className="text-[11px] text-muted-foreground mb-3">
                Have an idea or just want to connect? Drop me a message.
              </p>
              <ContactForm />
            </section>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-8">

            {/* Projects */}
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight mb-3">
                Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card group block rounded-xl border border-border bg-card p-4 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-sm font-semibold group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 mt-0.5" />
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-2.5 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-warm text-warm-foreground font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Blog */}
            <section>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="font-[family-name:var(--font-display)] text-xl tracking-tight">
                  Writing
                </h2>
                <a
                  href="https://sakshamchaudhary.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors tracking-wider uppercase"
                >
                  All posts <ArrowUpRight className="h-2.5 w-2.5" />
                </a>
              </div>
              <div className="space-y-0">
                {recentPosts.map((post, i) => (
                  <a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3 py-2 border-b border-border/50 hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="text-[10px] text-muted-foreground/40 font-mono tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-medium truncate group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">
                      {new Date(post.pubDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
