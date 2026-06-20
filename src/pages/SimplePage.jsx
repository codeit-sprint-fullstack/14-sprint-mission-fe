function SimplePage({ title, links }) {
  return (
    <section className="content-width flex min-h-[calc(100vh-70px)] flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="text-4xl font-bold leading-tight text-gray-800">{title}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(([href, label]) => (
          <a key={href} className="font-semibold text-primary hover:underline" href={`#${href}`}>
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default SimplePage;
