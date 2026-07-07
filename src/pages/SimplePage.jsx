import { Link } from 'react-router-dom';

function SimplePage({ title, links }) {
  return (
    <section className="content-width flex min-h-[calc(100vh-4.375rem)] flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="text-4xl font-bold leading-tight text-gray-800">{title}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(([href, label]) => (
          <Link key={href} className="font-semibold text-primary hover:underline" to={href}>
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimplePage;
