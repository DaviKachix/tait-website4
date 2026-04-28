"use client";

import { useState, useEffect } from "react";

/* ================= CONFIG ================= */

const PROJECT_TYPES = [
  "Mobile App",
  "Web Platform",
  "Church Management System",
  "Education LMS System",
  "Media Streaming Platform",
  "ERP Business System",
];

const BASE_PRICES: Record<string, number> = {
  "Mobile App": 300000,
  "Web Platform": 250000,
  "Church Management System": 600000,
  "Education LMS System": 550000,
  "Media Streaming Platform": 500000,
  "ERP Business System": 800000,
};

const normalizeType = (mode: string) => {
  if (mode === "careers") return "career";
  if (mode === "internships") return "internship";
  if (mode === "volunteering") return "volunteer";
  return mode;
};

/* ================= COMPONENT ================= */

export default function WorkWithUsPage() {
  const [mode, setMode] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [career, setCareer] = useState({
    skills: "",
    motivation: "",
  });

  const [project, setProject] = useState({
    name: "",
    description: "",
    type: "Mobile App",
    urgency: "normal",
  });

  const [idea, setIdea] = useState({
    title: "",
    description: "",
  });

  /* ================= PRICING ================= */
  const base = BASE_PRICES[project.type] || 0;
  const multiplier =
    project.urgency === "urgent" ? 1.2 :
    project.urgency === "mission" ? 1.5 : 1;

  const totalPrice = Math.round(base * multiplier);

  /* ================= HANDLERS ================= */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitApplication = async () => {
    if (!mode || !form.email) {
      alert("Please select category and enter email");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      let details: any = {};

      if (["careers", "internships", "volunteering"].includes(mode)) {
        details = career;
      }

      if (mode === "project") {
        details = {
          ...project,
          price: totalPrice,
        };
      }

      if (mode === "partnership" || mode === "idea") {
        details = idea;
      }

      const payload = {
        type: normalizeType(mode),
        basic: form,
        details,
        meta: {
          source: "tait_web",
          created_at: new Date().toISOString(),
        },
      };

      const res = await fetch(
        "http://178.105.7.40:5000/api/recruitment/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message || "Error submitting");
      }
    } catch (err) {
      alert("Network error");
    }

    setLoading(false);
  };

  /* ================= UI ================= */
  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">

      {/* INTRO */}
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
        <h1 className="text-xl font-semibold">Work With Us</h1>
        <p className="text-sm text-gray-500">
          Join TAIT through careers, projects, volunteering, or partnerships.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[
          { key: "careers", label: "Careers" },
          { key: "internships", label: "Internships" },
          { key: "volunteering", label: "Volunteering" },
          { key: "project", label: "Build a Project" },
          { key: "idea", label: "Submit Idea" },
          { key: "partnership", label: "Partnership" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setMode(item.key)}
            className={`w-full p-3 border rounded-xl text-left ${
              mode === item.key ? "bg-[#7f264a] text-white" : "bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* FORM */}
      {mode && (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl space-y-4">

          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 border" />

          {/* CAREER */}
          {["careers", "internships", "volunteering"].includes(mode) && (
            <>
              <textarea placeholder="Skills" className="w-full p-2 border" onChange={(e) => setCareer({ ...career, skills: e.target.value })} />
              <textarea placeholder="Motivation" className="w-full p-2 border" onChange={(e) => setCareer({ ...career, motivation: e.target.value })} />
            </>
          )}

          {/* PROJECT */}
          {mode === "project" && (
            <>
              <input placeholder="Project Name" className="w-full p-2 border" onChange={(e) => setProject({ ...project, name: e.target.value })} />
              <textarea placeholder="Description" className="w-full p-2 border" onChange={(e) => setProject({ ...project, description: e.target.value })} />

              <select className="w-full p-2 border" onChange={(e) => setProject({ ...project, type: e.target.value })}>
                {PROJECT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <div className="bg-gray-100 p-3">
                Total: {totalPrice} TZS
              </div>
            </>
          )}

          {/* IDEA */}
          {(mode === "idea" || mode === "partnership") && (
            <>
              <input placeholder="Title" className="w-full p-2 border" onChange={(e) => setIdea({ ...idea, title: e.target.value })} />
              <textarea placeholder="Description" className="w-full p-2 border" onChange={(e) => setIdea({ ...idea, description: e.target.value })} />
            </>
          )}

          <button onClick={submitApplication} disabled={loading} className="w-full bg-[#7f264a] text-white p-3">
            {loading ? "Submitting..." : "Submit"}
          </button>

          {success && <p className="text-green-600">Submitted successfully</p>}

        </div>
      )}

    </main>
  );
}
