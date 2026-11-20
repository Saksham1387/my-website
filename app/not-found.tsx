import Link from "next/link";

const NotFound = () => {
  return (
    <main className="article-main">
      <div className="article-nav">
        <Link href="/">← Saksham</Link>
      </div>
      <header className="article-header">
        <h1 className="article-title">Page not found</h1>
        <div className="article-meta">404</div>
      </header>
      <p className="profile-bio">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <p>
        <Link href="/">Return home</Link>
      </p>
    </main>
  );
};

export default NotFound;
