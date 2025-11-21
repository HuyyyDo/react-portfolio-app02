// // src/pages/Services.jsx
// import { FaFacebook, FaInstagram } from "react-icons/fa";

// const services = [
//   { title:'Web Development', desc:'React, Vite, SPA routing, REST APIs' },
//   { title:'Backend & Databases', desc:'Node, Express, SQL/NoSQL' },
//   { title:'C# / .NET', desc:'WinForms/WPF, OOP, unit testing' },
//   { title:'Hyperopt AI Training', desc:'XGBoost AI training' },
// ];

// const socials = [
//   { label: "Facebook", href: "https://facebook.com/huy.doss", Icon: FaFacebook },
//   { label: "Instagram", href: "https://www.instagram.com/huy_doss/", Icon: FaInstagram },
// ];

// export default function Services(){
//   return (
//     <section>
//       <p className="kicker">Services</p>
//       <h2>What I can help with</h2>

//       {/* Replace the old <img src="/src/assets/services.svg" /> with icons */}
//       <div
//         className="card"
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "2rem",
//           marginTop: ".75rem",
//         }}
//       >
//         {socials.map(({ label, href, Icon }) => (
//           <a
//             key={label}
//             href={href}
//             target="_blank"
//             rel="noreferrer"
//             aria-label={label}
//             title={label}
//             style={{
//               width: 120,
//               height: 120,
//               borderRadius: "9999px",
//               border: "2px solid var(--accent)",
//               display: "inline-flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "var(--accent-2)",
//             }}
//           >
//             <Icon size={56} />
//           </a>
//         ))}
//       </div>

//       <div className="grid" style={{ marginTop: "1rem" }}>
//         {services.map((s) => (
//           <article className="card" key={s.title}>
//             <h3>{s.title}</h3>
//             <p>{s.desc}</p>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// src/pages/Services.jsx
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// Local examples to fall back to if the API is empty/unavailable
const FALLBACK = [
  { title: "Web Development", desc: "React, Vite, SPA routing, REST APIs" },
  { title: "Backend & Databases", desc: "Node, Express, SQL/NoSQL" },
  { title: "C# / .NET", desc: "WinForms/WPF, OOP, unit testing" },
  { title: "Hyperopt AI Training", desc: "XGBoost AI training" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/huy.doss", Icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/huy_doss/", Icon: FaInstagram },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Use env var in prod, default to localhost in dev
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/services`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Backend uses { title, description }; map to { title, desc }
        const mapped = (Array.isArray(data) ? data : []).map(s => ({
          title: s.title,
          desc: s.description,
        }));

        if (alive) setServices(mapped.length ? mapped : FALLBACK);
      } catch (e) {
        console.error(e);
        if (alive) {
          setError("Could not load services from the server.");
          setServices(FALLBACK);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [API]);

  return (
    <section>
      <p className="kicker">Services</p>
      <h2>What I can help with</h2>

      {/* Social icons (unchanged) */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: "1.25rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          marginTop: ".75rem",
        }}
      >
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            style={{
              width: 120,
              height: 120,
              borderRadius: "9999px",
              border: "2px solid var(--accent)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--accent-2)",
            }}
          >
            <Icon size={56} />
          </a>
        ))}
      </div>

      {loading ? (
        <p style={{ marginTop: "1rem" }}>Loading services…</p>
      ) : (
        <>
          {error && (
            <p className="small" style={{ marginTop: "1rem", color: "#f59e0b" }}>
              {error} Showing local examples.
            </p>
          )}
          <div className="grid" style={{ marginTop: "1rem" }}>
            {services.map((s) => (
              <article className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
