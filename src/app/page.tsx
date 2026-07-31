"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: number;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#050709", color: "#f3f4f6", fontFamily: "Inter, sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, background: "linear-gradient(135deg, #6366f1, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>
        HealthAI Patient Dashboard
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>A real-time patient monitoring dashboard with AI-powered diagnostics, appointment scheduling, prescription management, a</p>

      {loading ? (
        <p style={{ color: "#4b5563" }}>Loading projects...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {projects.map(p => (
            <div key={p.id} style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "1.25rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>{p.title}</h2>
              <p style={{ fontSize: "0.875rem", color: "#94a3b8" }}>{p.description}</p>
              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", background: "rgba(99,102,241,0.2)", color: "#a5b4fc", borderRadius: "0.25rem" }}>{p.status}</span>
                <span style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", background: "rgba(16,185,129,0.2)", color: "#6ee7b7", borderRadius: "0.25rem" }}>${p.budget?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}