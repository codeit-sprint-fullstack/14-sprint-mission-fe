import Link from 'next/link';

export default function SimplePage({ title, description, links }) {
  return (
    <main className="content-width flex min-h-[calc(100vh-4.375rem)] flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="text-4xl font-bold leading-tight text-gray-800">{title}</h1>
      {description ? <p className="text-base text-gray-600">{description}</p> : null}
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(([href, label]) => (
          <Link key={href} className="font-semibold text-primary hover:underline" href={href}>
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
