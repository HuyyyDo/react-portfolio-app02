// src/pages/Services.jsx
import { FaFacebook, FaInstagram } from "react-icons/fa";

const services = [
  { title:'Web Development', desc:'React, Vite, SPA routing, REST APIs' },
  { title:'Backend & Databases', desc:'Node, Express, SQL/NoSQL' },
  { title:'C# / .NET', desc:'WinForms/WPF, OOP, unit testing' },
  { title:'Hyperopt AI Training', desc:'XGBoost AI training' },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/huy.doss", Icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/huy_doss/", Icon: FaInstagram },
];

export default function Services(){
  return (
    <section>
      <p className="kicker">Services</p>
      <h2>What I can help with</h2>

      {/* Replace the old <img src="/src/assets/services.svg" /> with icons */}
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

      <div className="grid" style={{ marginTop: "1rem" }}>
        {services.map((s) => (
          <article className="card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
