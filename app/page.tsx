import { ThemeToggle } from "@/components/ThemeToggle";
import { ContactForm } from "@/components/ContactForm";
import { ThemeProvider } from "@/components/theme-provider";
import { GitHubIcon, TwitterIcon } from "@/components/Socialicon";
import { Toaster } from "@/components/ui/toaster";
import { bio, name, projects } from "../info";

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
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
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
                href="https://www.linkedin.com/company/mkrypt/posts/?feedView=all"
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
            <h2 className="text-xl font-medium mb-6">Join the community</h2>
            <ContactForm />
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
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
