import { SimpleThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { GitHubIcon } from "@/components/Socialicon";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, projects, resumeUrl, notionUrl } from "../info";
import { getSubstackPosts } from "@/lib/substack";
import { ArrowUpRight, Download, NotebookPen } from "lucide-react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

const workExperience = [
  {
    company: "Starboard AI",
    role: "AI Engineer (Contract)",
    url: "https://www.starboard-ai.com/",
    description:
      "Building AI product infrastructure at an early-stage company, working across applied AI workflows, frontend systems, backend services, and fast product iteration.",
  },
  {
    company: "Valuemetrix",
    role: "Full Stack Intern",
    url: "https://www.valuemetrix.io/",
    description:
      "- Set up a service to send weekly updates and statistics about users' trading metrics.\n- Built a research report feature for individual stocks, helping users analyze stock history alongside the latest market news.",
  },
  {
    company: "Mkrypt",
    role: "Founding Engineer",
    url: "https://www.mkrypt.org/",
    description:
      "Worked primarily on two products, building them from scratch alongside strong developers in the Web3 ecosystem.\n\n- **Fluxor:** An on-chain hackathon hosting platform built with resilient, distributed backends to support large-scale hackathons. Worked with Ethereum as the primary chain alongside the Flow blockchain.\n- **Conscious Club:** An on-chain NFT marketplace with a unique concept around brand integrations and coupon codes.",
  },
  {
    company: "CNCF New Delhi",
    role: "Full Stack Engineer",
    url: "https://ocgroups.dev/cncf/group/9fryhhb",
    description:
      "- Led and contributed to the creation of the main website for the CNCF New Delhi community.\n- Deployed the project and collaborated with multiple developers.\n- Gained experience maintaining an open-source project in a community-driven environment.",
  },
];

const Index = async () => {
  const allPosts = await getSubstackPosts();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Toaster />

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-8 text-center sm:px-8">
        <div className="flex w-full justify-end">
          <SimpleThemeToggle />
        </div>

        {/* ── Header ── */}
        <header className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <div className="relative size-24 overflow-hidden rounded-full border border-primary/20 bg-card shadow-sm sm:size-28">
            <Image
              src="/profile-image.png"
              alt="Saksham Chaudhary"
              fill
              priority
              sizes="112px"
              className="object-cover"
            />
          </div>

          <div className="flex max-w-xl flex-col items-center gap-2 sm:items-start sm:text-left">
            <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-primary sm:text-4xl">
              {name}
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {bio}
            </p>
          </div>
        </header>

        {/* ── Link pills ── */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href="https://github.com/saksham1387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            <GitHubIcon className="size-3.5" />
          </a>
          <a
            href="https://x.com/Saksham1184122"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            <Image
              src="/twitter.png"
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent "
          >
            <Download className="size-3" />
            Resume
          </a>
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            <NotebookPen className="size-3" />
            My Work
          </a>
        </div>

        <div className="section-divider w-full" />

        {/* ── Main vertical stack ── */}
        <div className="flex w-full flex-col gap-8">
          {/* Work Experience */}
          <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">
                Experience
              </h2>
              <div className="relative flex flex-col pl-7 ">
                {workExperience.map((job) => (
                  <details
                    key={job.company}
                    className="group relative border-b border-border/50 py-2 text-left transition-colors open:border-primary/20"
                  >
                  
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                      <div>
                        <span className="text-sm font-medium transition-colors group-hover:text-muted-foreground">
                          {job.company}
                        </span>
                        <p className="text-[11px] text-muted-foreground">{job.role}</p>
                      </div>
                      
                    </summary>
                    <div className="flex flex-col gap-2 pb-1 pt-3">
                      <div className="experience-markdown">
                        <MDXRemote source={job.description} />
                      </div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1 text-[10px] uppercase tracking-wider text-primary transition-opacity hover:opacity-70"
                      >
                        Visit <ArrowUpRight className="size-2.5" />
                      </a>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          {/* Projects */}
          <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card group block rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-foreground/30"
                  >
                    <div className="mb-1.5 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold transition-colors group-hover:text-muted-foreground">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                    <p className="mb-2.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-warm px-2 py-0.5 text-[10px] font-medium text-warm-foreground"
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
          <section className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold">
                  Writing
                </h2>
                <a
                  href="https://sakshamchaudhary.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  All posts <ArrowUpRight className="size-2.5" />
                </a>
              </div>
              <div className="flex flex-col">
                {recentPosts.map((post, i) => (
                  <a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3 border-b border-border/50 py-2 text-left transition-colors hover:border-foreground/20"
                  >
                    <div className="flex min-w-0 items-baseline gap-3">
                      <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate text-xs font-medium transition-colors group-hover:text-muted-foreground">
                        {post.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                      {new Date(post.pubDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </a>
                ))}
              </div>
            </section>

          {/* GitHub */}
          <section className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold">
                  Consistency
                </h2>
              </div>
              <a
                href="https://github.com/saksham1387"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-x-auto rounded-lg border border-primary/10 bg-background p-3 transition-colors hover:border-primary/30"
              >
                <Image
                  src="https://ghchart.rshah.org/1b213c/saksham1387"
                  alt="GitHub contribution heatmap for Saksham Chaudhary"
                  width={640}
                  height={104}
                  unoptimized
                  className="min-w-[640px] max-w-none"
                />
              </a>
            </section>

          {/* Contact */}
          <section className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                  Say hello
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Have an idea or just want to connect? Drop me a message.
                </p>
              </div>
              <ContactForm />
            </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
