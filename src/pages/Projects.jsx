// // src/pages/Projects.jsx
// const projects = [
//   {
//     title: 'Hyperopt AI Training',
//     img: '/assets/hyperopt.png', // put hyperopt.png in public/assets/
//     role: 'Full-stack Developer',
//     description: 'To train the AI to find the best stocks',
//     link: '/assets/hyperopt_results_20250722_152314.csv', // <-- your file in public/assets/
//     download: true, // flag to add download attr
//   },
//   {
//     title: 'Fraction Calculator (C#)',
//     img: '/assets/fraction.png', // put fraction.png in public/assets/
//     role: 'C# Developer',
//     description:
//       'WinForms app implementing a Fraction class with operator overloading and unit tests.',
//     link: '/assets/fractioncalculator.zip', // replace with your repo or file when ready
//   },
// ];

// export default function Projects() {
//   return (
//     <section>
//       <p className="kicker">Projects</p>
//       <h2>Highlighted Work</h2>
//       <div className="grid" style={{ marginTop: '1rem' }}>
//         {projects.map((p) => (
//           <article className="card" key={p.title}>
//             <img
//               src={p.img}
//               alt={p.title}
//               style={{ width: '100%', borderRadius: '.75rem' }}
//             />
//             <h3>{p.title}</h3>
//             <p className="small">{p.role}</p>
//             <p>{p.description}</p>
//             <div style={{ display: 'flex', gap: '.5rem' }}>
//               <a
//                 className="btn"
//                 href={p.link}
//                 {...(p.download ? { download: '' } : {})}
//                 target={p.link?.startsWith('http') ? '_blank' : undefined}
//                 rel={p.link?.startsWith('http') ? 'noreferrer' : undefined}
//                 aria-label={`Open ${p.title}`}
//               >
//                 Open
//               </a>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// src/pages/Projects.jsx
import { useEffect, useState } from "react";

// Optional: keep these as a fallback if the API is empty/unavailable
const FALLBACK = [
  {
    title: "Hyperopt AI Training",
    img: "/assets/hyperopt.png",
    role: "Full-stack Developer",
    description: "To train the AI to find the best stocks",
    link: "/assets/hyperopt_results_20250722_152314.csv",
    download: true,
  },
  {
    title: "Fraction Calculator (C#)",
    img: "/assets/fraction.png",
    role: "C# Developer",
    description:
      "WinForms app implementing a Fraction class with operator overloading and unit tests.",
    link: "/assets/fractioncalculator.zip",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Use env var when deployed, fallback to localhost in dev
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API}/api/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Map backend fields to your UI fields (img/role/link may not exist yet)
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          title: p.title,
          description: p.description,
          // Optional fields if you add them to the DB later:
          img: p.img || "/assets/project1.jpg",
          role: p.role || "Developer",
          link: p.link,
          download: Boolean(p.download),
          completion: p.completion, // ISO date from API (optional display)
        }));

        if (alive) setProjects(mapped.length ? mapped : FALLBACK);
      } catch (e) {
        console.error(e);
        if (alive) {
          setError("Could not load projects from the server.");
          setProjects(FALLBACK);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [API]);

  if (loading) return <p>Loading projects…</p>;
  if (error)   return (
    <section>
      <p className="kicker">Projects</p>
      <h2>Highlighted Work</h2>
      <p className="small" style={{ color: "#f59e0b" }}>{error} Showing local examples.</p>
      <ProjectGrid projects={projects} />
    </section>
  );

  return (
    <section>
      <p className="kicker">Projects</p>
      <h2>Highlighted Work</h2>
      <ProjectGrid projects={projects} />
    </section>
  );
}

function ProjectGrid({ projects }) {
  return (
    <div className="grid" style={{ marginTop: "1rem" }}>
      {projects.map((p) => (
        <article className="card" key={p.title}>
          <img
            src={p.img}
            alt={p.title}
            style={{ width: "100%", borderRadius: ".75rem" }}
          />
          <h3>{p.title}</h3>
          {p.role && <p className="small">{p.role}</p>}
          <p>{p.description}</p>
          {p.completion && (
            <p className="small" style={{ opacity: 0.8 }}>
              Completed: {new Date(p.completion).toLocaleDateString()}
            </p>
          )}
          {p.link && (
            <div style={{ display: "flex", gap: ".5rem" }}>
              <a
                className="btn"
                href={p.link}
                {...(p.download ? { download: "" } : {})}
                target={p.link?.startsWith("http") ? "_blank" : undefined}
                rel={p.link?.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`Open ${p.title}`}
              >
                Open
              </a>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
