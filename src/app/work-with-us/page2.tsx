"use client";

import { useEffect, useState } from "react";

/* ================================
   TAIT CORE CONFIG
================================ */

const PROJECT_TYPES = [
  "Mobile App",
  "Web Platform",
  "Church Management System",
  "Education LMS System",
  "Media Streaming Platform",
  "ERP Business System",
  "Data Dashboard / BI System",
  "IoT Smart Church System",
  "Training / Digital Academy",
  "Custom Innovation Project",
];

const BASE_PRICES: Record<string, number> = {
  "Mobile App": 300000,
  "Web Platform": 250000,
  "Church Management System": 600000,
  "Education LMS System": 550000,
  "Media Streaming Platform": 500000,
  "ERP Business System": 800000,
  "Data Dashboard / BI System": 400000,
  "IoT Smart Church System": 900000,
  "Training / Digital Academy": 200000,
  "Custom Innovation Project": 0,
};

function generateId() {
  return "TAIT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

/* ================================
   MAIN COMPONENT
================================ */

export default function WorkWithUsPage() {
  const [step, setStep] = useState(1);
  const [section, setSection] = useState<
    "career" | "project" | "idea" | null
  >(null);

  const [requestId, setRequestId] = useState("");

  /* ================================
     CAREER FORM (ADVENTIST HR)
  ================================= */
  const [career, setCareer] = useState({
    full_name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    church_involvement: "",
    ministry_role: "",
    motivation: "",
    experience: "",
  });

  /* ================================
     PROJECT FORM (ENGINEERING)
  ================================= */
  const [project, setProject] = useState({
    name: "",
    goal: "",
    description: "",
    institution: "",
    type: "Mobile App",
    urgency: "normal",
    users: "",
    impact: "",
  });

  /* ================================
     IDEA FORM (COLLABORATION)
  ================================= */
  const [idea, setIdea] = useState({
    title: "",
    description: "",
    institution: "",
    impact: "",
    collaboration: "",
    beneficiaries: "",
  });

  /* ================================
     DRAFT SAVE (LOCAL STORAGE)
  ================================= */
  useEffect(() => {
    const saved = localStorage.getItem("tait_workwithus");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.career) setCareer(data.career);
      if (data.project) setProject(data.project);
      if (data.idea) setIdea(data.idea);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tait_workwithus",
      JSON.stringify({ career, project, idea })
    );
  }, [career, project, idea]);

  /* ================================
     PRICING ENGINE
  ================================= */
  const base = BASE_PRICES[project.type] || 0;

  const urgencyMultiplier =
    project.urgency === "urgent"
      ? 1.2
      : project.urgency === "mission-critical"
      ? 1.5
      : 1;

  const totalPrice = Math.round(base * urgencyMultiplier);

  /* ================================
     VALIDATION
  ================================= */
  const isEmail = (email: string) =>
    /\S+@\S+\.\S+/.test(email);

  /* ================================
     SUBMIT HANDLER (ERP READY)
  ================================= */
  const submit = async (type: string, data: any) => {
    if (type === "career") {
      if (!career.full_name || !isEmail(career.email)) {
        alert("Invalid career application");
        return;
      }
    }

    if (type === "project") {
      if (!project.name || !project.description) {
        alert("Complete project details");
        return;
      }
    }

    if (type === "idea") {
      if (!idea.title || !idea.description) {
        alert("Complete idea details");
        return;
      }
    }

    const id = generateId();
    setRequestId(id);

    const payload = {
      request_id: id,
      type,
      data,
      status: "submitted",
      created_at: new Date().toISOString(),
    };

    await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setStep(4);
  };

  /* ================================
     UI
  ================================= */
  return (
    <main className="min-h-screen bg-white px-6 py-10 max-w-4xl mx-auto relative">

      {/* ================= WATERMARK ================= */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <img
          src="/TAIT8.svg"
          className="w-full h-full object-contain"
        />
      </div>

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-[#7f264a]">
        Work With TAIT
      </h1>

      <p className="text-sm text-gray-500">
        Careers • Projects • Ideas • Adventist Digital Mission System
      </p>

      {/* ================= SECTION SELECT ================= */}
      {step === 1 && (
        <div className="space-y-4 mt-8">

          <button
            onClick={() => {
              setSection("career");
              setStep(2);
            }}
            className="w-full border p-4 rounded-xl text-left"
          >
            Career / Internship / Training
          </button>

          <button
            onClick={() => {
              setSection("project");
              setStep(2);
            }}
            className="w-full border p-4 rounded-xl text-left"
          >
            Project Development (Pricing Engine)
          </button>

          <button
            onClick={() => {
              setSection("idea");
              setStep(2);
            }}
            className="w-full border p-4 rounded-xl text-left"
          >
            Ideas & Collaboration
          </button>

        </div>
      )}

      {/* ================= CAREER ================= */}
      {step === 2 && section === "career" && (
        <div className="mt-6 space-y-3">

          <input className="border p-2 w-full" placeholder="Full Name"
            onChange={(e) =>
              setCareer({ ...career, full_name: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Email"
            onChange={(e) =>
              setCareer({ ...career, email: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Phone"
            onChange={(e) =>
              setCareer({ ...career, phone: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Skills"
            onChange={(e) =>
              setCareer({ ...career, skills: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Education"
            onChange={(e) =>
              setCareer({ ...career, education: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Church Involvement"
            onChange={(e) =>
              setCareer({ ...career, church_involvement: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Ministry Role"
            onChange={(e) =>
              setCareer({ ...career, ministry_role: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Motivation"
            onChange={(e) =>
              setCareer({ ...career, motivation: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Experience in Church Projects"
            onChange={(e) =>
              setCareer({ ...career, experience: e.target.value })
            }
          />

          <button
            onClick={() => submit("career", career)}
            className="bg-[#7f264a] text-white w-full p-3"
          >
            Submit Career Application
          </button>

        </div>
      )}

      {/* ================= PROJECT ================= */}
      {step === 2 && section === "project" && (
        <div className="mt-6 space-y-3">

          <input className="border p-2 w-full" placeholder="Project Name"
            onChange={(e) =>
              setProject({ ...project, name: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Goal"
            onChange={(e) =>
              setProject({ ...project, goal: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Description"
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Institution"
            onChange={(e) =>
              setProject({ ...project, institution: e.target.value })
            }
          />

          <select className="border p-2 w-full"
            onChange={(e) =>
              setProject({ ...project, type: e.target.value })
            }
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select className="border p-2 w-full"
            onChange={(e) =>
              setProject({ ...project, urgency: e.target.value })
            }
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent (+20%)</option>
            <option value="mission-critical">Mission Critical</option>
          </select>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-[#7f264a] font-semibold">
              Invoice Preview
            </p>
            <p>Base: {base} TZS</p>
            <p className="font-bold">Total: {totalPrice} TZS</p>
          </div>

          <button
            onClick={() => submit("project", project)}
            className="bg-[#7f264a] text-white w-full p-3"
          >
            Submit Project
          </button>

        </div>
      )}

      {/* ================= IDEA ================= */}
      {step === 2 && section === "idea" && (
        <div className="mt-6 space-y-3">

          <input className="border p-2 w-full" placeholder="Idea Title"
            onChange={(e) =>
              setIdea({ ...idea, title: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Description"
            onChange={(e) =>
              setIdea({ ...idea, description: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Institution"
            onChange={(e) =>
              setIdea({ ...idea, institution: e.target.value })
            }
          />

          <textarea className="border p-2 w-full" placeholder="Impact"
            onChange={(e) =>
              setIdea({ ...idea, impact: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Collaboration Type"
            onChange={(e) =>
              setIdea({ ...idea, collaboration: e.target.value })
            }
          />

          <input className="border p-2 w-full" placeholder="Beneficiaries"
            onChange={(e) =>
              setIdea({ ...idea, beneficiaries: e.target.value })
            }
          />

          <button
            onClick={() => submit("idea", idea)}
            className="bg-[#7f264a] text-white w-full p-3"
          >
            Submit Idea
          </button>

        </div>
      )}

      {/* ================= SUCCESS ================= */}
      {step === 4 && (
        <div className="mt-10 text-center space-y-3">

          <h2 className="text-green-600 text-xl font-bold">
            Submission Successful ✔
          </h2>

          <p>Request ID</p>

          <div className="bg-gray-100 p-3 rounded">
            {requestId}
          </div>

          <p className="text-sm text-gray-500">
            TAIT will review your submission shortly.
          </p>

        </div>
      )}

    </main>
  );
}