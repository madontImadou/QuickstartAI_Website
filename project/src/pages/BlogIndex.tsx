import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { blogRegistry } from '../data/blogRegistry';

const PAGE_TITLE = 'Blog – KI-Agenten, Automatisierung & Praxis | QuickStartAI';
const META_DESC = 'Praxis-Wissen zu KI-Agenten, Automatisierung und No-Code-Lösungen für Unternehmen. Kein Hype — nur was wirklich funktioniert.';

export default function BlogIndex() {
  useEffect(() => {
    const prev = document.title;
    document.title = PAGE_TITLE;

    const added: Element[] = [];
    const setMeta = (key: string, keyVal: string, content: string) => {
      let el = document.querySelector(`meta[${key}="${keyVal}"]`);
      const isNew = !el;
      if (!el) { el = document.createElement('meta'); }
      el.setAttribute(key, keyVal);
      el.setAttribute('content', content);
      if (isNew) { document.head.appendChild(el); added.push(el); }
    };

    setMeta('name', 'description', META_DESC);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:title', PAGE_TITLE);
    setMeta('property', 'og:description', META_DESC);
    setMeta('property', 'og:type', 'website');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const canonicalIsNew = !canonical;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); }
    canonical.setAttribute('href', 'https://quickstartai.de/blog');
    if (canonicalIsNew) { document.head.appendChild(canonical); added.push(canonical); }

    return () => {
      document.title = prev;
      added.forEach(el => el.parentNode?.removeChild(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav
        aria-label="Hauptnavigation"
        className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center" aria-label="QuickStartAI Startseite">
              <img
                src="/Firmenlogo-removebg-preview.png"
                alt="QuickStartAI Logo"
                width="80"
                height="80"
                className="h-20 w-auto mr-3"
              />
              <span className="text-xl font-bold text-white">QuickStartAI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/blog" className="text-white font-medium transition-colors">Blog</Link>
              <Link to="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/sales" className="text-gray-300 hover:text-white transition-colors">Preise</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/15 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-[#e2642a] transition-colors">Home</Link>
              </li>
              <li aria-hidden="true"><span className="text-gray-700">/</span></li>
              <li><span className="text-gray-400">Blog</span></li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Praxis-Wissen zu KI-Agenten und Automatisierung.
            Kein Hype — nur was wirklich funktioniert.
          </p>
        </div>
      </div>

      {/* Post grid */}
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {blogRegistry.length === 0 ? (
          <p className="text-gray-400 text-center py-16">Noch keine Beiträge vorhanden.</p>
        ) : (
          <div className="grid gap-8">
            {blogRegistry.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-[#e2642a]/40 transition-all duration-300 group"
              >
                <Link to={post.path} className="block">
                  <div className="md:flex">
                    <div className="md:w-64 flex-shrink-0">
                      <img
                        src={post.heroImage.src}
                        srcSet={post.heroImage.srcSet}
                        sizes={post.heroImage.sizes ?? '(max-width: 768px) 100vw, 256px'}
                        alt={post.heroImage.alt}
                        width={post.heroImage.width}
                        height={post.heroImage.height}
                        className="w-full h-48 md:h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-[#e2642a]/20 text-[#e2642a] text-xs font-semibold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500 text-xs">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {post.readingTime}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#e2642a] transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <time dateTime={post.publishDate} className="text-xs text-gray-500">
                          {post.publishDateFormatted}
                        </time>
                        <span className="flex items-center gap-1 text-[#e2642a] text-sm font-semibold group-hover:gap-2 transition-all">
                          Lesen
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Simple footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>&copy; 2025 QuickStartAI · <Link to="/" className="hover:text-[#e2642a] transition-colors">Startseite</Link> · <Link to="/datenschutz" className="hover:text-[#e2642a] transition-colors">Datenschutz</Link> · <Link to="/impressum" className="hover:text-[#e2642a] transition-colors">Impressum</Link></p>
        </div>
      </footer>
    </div>
  );
}
