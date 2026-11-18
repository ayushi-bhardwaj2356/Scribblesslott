import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <section className="section">
      <div className="container empty-state">
        <p className="script">Lost among the gifts</p>
        <h1>This page is not in the studio</h1>
        <Link className="btn" to="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
