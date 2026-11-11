import { Link, useDocumentTitle } from '../lib/router';
import HeaderArt from '../components/HeaderArt';

export default function NotFound() {
  useDocumentTitle('Page not found: Mahmood Ahmad');
  return (
    <section className="container section" style={{ position: 'relative', isolation: 'isolate', minHeight: '50vh', display: 'grid', alignContent: 'center', gap: 'var(--s-5)' }}>
      <HeaderArt kind="scatter" />
      <h1 style={{ fontSize: 'var(--text-h2)' }}>This page doesn’t exist.</h1>
      <p style={{ color: 'var(--graphite)', maxWidth: '40em' }}>The link may be old or mistyped. Everything on the site is reachable from the home page.</p>
      <p><Link to="/" className="btn btn-primary">Go to the home page</Link></p>
    </section>
  );
}
