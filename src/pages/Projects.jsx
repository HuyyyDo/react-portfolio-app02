// src/pages/Projects.jsx
const projects = [
  {
    title: 'Hyperopt AI Training',
    img: '/assets/hyperopt.png', // put hyperopt.png in public/assets/
    role: 'Full-stack Developer',
    description: 'To train the AI to find the best stocks',
    link: '/assets/hyperopt_results_20250722_152314.csv', // <-- your file in public/assets/
    download: true, // flag to add download attr
  },
  {
    title: 'Fraction Calculator (C#)',
    img: '/assets/fraction.png', // put fraction.png in public/assets/
    role: 'C# Developer',
    description:
      'WinForms app implementing a Fraction class with operator overloading and unit tests.',
    link: '/assets/FractionCalculator (2).zip', // replace with your repo or file when ready
  },
];

export default function Projects() {
  return (
    <section>
      <p className="kicker">Projects</p>
      <h2>Highlighted Work</h2>
      <div className="grid" style={{ marginTop: '1rem' }}>
        {projects.map((p) => (
          <article className="card" key={p.title}>
            <img
              src={p.img}
              alt={p.title}
              style={{ width: '100%', borderRadius: '.75rem' }}
            />
            <h3>{p.title}</h3>
            <p className="small">{p.role}</p>
            <p>{p.description}</p>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <a
                className="btn"
                href={p.link}
                {...(p.download ? { download: '' } : {})}
                target={p.link?.startsWith('http') ? '_blank' : undefined}
                rel={p.link?.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={`Open ${p.title}`}
              >
                Open
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
