import { ContactForm } from "@/components/ContactForm";
import { WritingList, type WritingItem } from "@/components/WritingList";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, notionUrl, projects, resumeUrl } from "../info";
import { getSubstackPosts } from "@/lib/substack";
import { getLocalArticles } from "@/lib/articles";
import { ArrowUpRight, FileText, NotebookPen } from "lucide-react";
import Image from "next/image";
import {
  GitHubIcon,
  LinkedInIcon,
  SubstackIcon,
  XIcon,
} from "@/components/Socialicon";
import { MDXRemote } from "next-mdx-remote/rsc";

const workExperience = [
  {
    company: "Starboard AI",
    role: "AI Full Stack Engineer",
    url: "https://www.starboard-ai.com/",
    description:
      "Building AI product infrastructure at an early-stage company, working across applied AI workflows, frontend systems, backend services, and fast product iteration.",
  },
  {
    company: "Valuemetrix",
    role: "Full Stack Engineer (Intern)",
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

const about = [
  "Built the notification system at Valuemetrix, a product for managing user portfolios, during an internship.",
  "Joined Starboard AI as the first hire and built the company's technology from scratch.",
  "Built multiple Web3 projects at Mkrypt.",
];

function yearOf(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : String(parsed.getFullYear());
}

function timeOf(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

type WritingEntry = WritingItem & { date: string };

const Index = async () => {
  const [articles, substackPosts] = await Promise.all([
    getLocalArticles(),
    getSubstackPosts(),
  ]);

  const writingEntries: WritingEntry[] = [
    ...articles.map((article) => ({
      title: article.title,
      href: `/articles/${article.slug}`,
      meta: `Article · ${yearOf(article.date)}`,
      tags: article.tags,
      date: article.date,
    })),
    ...substackPosts.map((post) => ({
      title: post.title,
      href: post.link,
      meta: `Post ↗ · ${yearOf(post.pubDate)}`,
      tags: ["writing"],
      external: true,
      date: post.pubDate,
    })),
  ];

  const seenTitles = new Set<string>();
  const uniqueWritingEntries = writingEntries.filter((entry) => {
    const key = entry.title.trim().toLowerCase();
    if (seenTitles.has(key)) return false;
    seenTitles.add(key);
    return true;
  });

  const writing: WritingItem[] = uniqueWritingEntries
    .sort((a, b) => timeOf(b.date) - timeOf(a.date))
    .slice(0, 8)
    .map((post) => ({
      title: post.title,
      href: post.href,
      meta: post.meta,
      tags: post.tags,
      external: post.external,
    }));

  return (
    <div id="top" className="page">
      <Toaster />

      <div className="shell">
        <aside className="profile">
          <Image
            src="/profile-image.png"
            alt={name}
            width={56}
            height={56}
            priority
            className="profile-avatar"
          />
          <div>
            <h1 className="profile-name">{name}</h1>
            <p className="profile-bio">{bio}</p>
          </div>

          <div className="profile-about">
            <h2 className="micro-label">About</h2>
            <ul className="about-list">
              {about.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <nav className="profile-links" aria-label="Links">
            <a
              href="https://github.com/saksham1387"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              aria-describedby="link-github-tip"
            >
              <GitHubIcon />
              <span className="link-popover" id="link-github-tip" role="tooltip">View my GitHub projects and code</span>
            </a>
            <a
              href="https://x.com/Saksham1184122"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              aria-describedby="link-x-tip"
            >
              <XIcon />
              <span className="link-popover" id="link-x-tip" role="tooltip">Find me on X</span>
            </a>
            <a
              href="https://www.linkedin.com/in/saksham-chaudhary-21564722a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              aria-describedby="link-linkedin-tip"
            >
              <LinkedInIcon />
              <span className="link-popover" id="link-linkedin-tip" role="tooltip">Connect with me on LinkedIn</span>
            </a>
            <a
              href="https://sakshamchaudhary.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Substack"
              aria-describedby="link-substack-tip"
            >
              <SubstackIcon />
              <span className="link-popover" id="link-substack-tip" role="tooltip">Read my writing on Substack</span>
            </a>
            <a
              href={notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="My Work"
              aria-describedby="link-work-tip"
            >
              <NotebookPen />
              <span className="link-popover" id="link-work-tip" role="tooltip">Explore my work and projects</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              aria-describedby="link-resume-tip"
            >
              <FileText />
              <span className="link-popover" id="link-resume-tip" role="tooltip">View or download my resume</span>
            </a>
          </nav>
        </aside>

        <main className="content">
          <section className="block">
            <div className="section-head">
              <h2 className="micro-label">Writing</h2>
              <a
                href="https://sakshamchaudhary.substack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                All posts ↗
              </a>
            </div>
            {writing.length > 0 ? (
              <WritingList posts={writing} />
            ) : (
              <p className="profile-bio">Nothing here yet.</p>
            )}
          </section>

          <section className="block">
            <h2 className="micro-label">Experience</h2>
            <div className="experience-list">
              {workExperience.map((job) => (
                <div key={job.company} className="experience-item">
                  <div className="experience-meta">
                    <span className="experience-company">{job.company}</span>
                    <span className="experience-role">{job.role}</span>
                  </div>
                  <div className="experience-body">
                    <div className="experience-markdown">
                      <MDXRemote source={job.description} />
                    </div>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-link"
                    >
                      Visit <ArrowUpRight className="size-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="block">
            <h2 className="micro-label">Projects</h2>
            <div className="project-grid">
              {projects.map((project) => (
                <div key={project.name} className="project-item">
                  <h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                    </a>
                    {project.current && (
                      <span className="current-badge">now</span>
                    )}
                  </h3>
                  <p>{project.description}</p>
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="block">
            <h2 className="micro-label">Say hello</h2>
            <p className="contact-intro">
              Have an idea or just want to connect? Drop me a message.
            </p>
            <ContactForm />
          </section>

          <footer className="site-footer">
            <span>
              © {new Date().getFullYear()} {name}
            </span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
