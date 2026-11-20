import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductsContext';
import categories from '../data/categories';
import usePageTitle from '../hooks/usePageTitle';

export default function Shop() {
  usePageTitle('Shop');
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const categorySlug = searchParams.get('category') || '';

  const visible = useMemo(() => {
    const category = categories.find((item) => item.slug === categorySlug);
    const term = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory = category ? product.category === category.name : true;
      const matchesName = term ? product.name.toLowerCase().includes(term) : true;
      return matchesCategory && matchesName;
    });

    const sorted = [...filtered];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => a.sortOrder - b.sortOrder);
    return sorted;
  }, [products, categorySlug, query, sort]);

  function updateCategory(slug) {
    const next = new URLSearchParams(searchParams);
    if (slug) next.set('category', slug);
    else next.delete('category');
    setSearchParams(next);
  }

  return (
    <>
      <PageHero
        eyebrow="The shop"
        title="Gifts made to be kept"
        text="Search by name, choose a category, and order on WhatsApp. Photo magazines and frames are our most loved pieces."
      />

      <section className="section">
        <div className="container">
          <div className="shop-toolbar">
            <label>
              Search
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search gifts by name"
              />
            </label>
            <label>
              Category
              <select value={categorySlug} onChange={(event) => updateCategory(event.target.value)}>
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title || category.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sort by price
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          <p className="result-count">
            {loading ? 'Gathering the collection…' : `${visible.length} gift${visible.length === 1 ? '' : 's'}`}
          </p>

          {loading ? null : visible.length ? (
            <div className="product-grid">
              {visible.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nothing matches that search</h2>
              <p>Try another name, or look through all categories.</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setQuery('');
                  setSort('featured');
                  updateCategory('');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
