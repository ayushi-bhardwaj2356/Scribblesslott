export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {text ? <p>{text}</p> : null}
      </div>
    </section>
  );
}
