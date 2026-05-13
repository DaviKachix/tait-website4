"use client";

import { useState } from "react";

export default function WorkWithUsPage() {
  const [mode, setMode] = useState<
    null | "careers" | "internships" | "volunteering" | "partnership"
  >(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      const res = await fetch(
        "http://178.105.7.40:5000/api/recruitment/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: mode,
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.message || "Error submitting");
      }
    } catch (err) {
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-12">
  <br>
        </br>
         <br>
        </br>
         <br>
        </br>
      {/* INTRO */}
      <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#7f264a]/10 flex items-center justify-center text-[#7f264a]">
          <i className="fa-solid fa-people-group"></i>
        </div>

        <h1 className="text-xl font-semibold">Work With Us</h1>

        <p className="text-sm text-gray-500 leading-relaxed">
          We are building digital systems, media platforms, and mission tools for the Church.
          Join us through careers, internships, volunteering, or partnership.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[
          {
            key: "careers",
            label: "Careers",
            icon: "fa-briefcase",
            desc: "Join our team in software, media, and digital systems development.",
          },
          {
            key: "internships",
            label: "Internships",
            icon: "fa-graduation-cap",
            desc: "Learn and grow through real-world mission technology projects.",
          },
          {
            key: "volunteering",
            label: "Volunteering",
            icon: "fa-hands-helping",
            desc: "Support mission work with your skills and time.",
          },
          {
            key: "partnership",
            label: "Partnership",
            icon: "fa-handshake",
            desc: "Collaborate with institutions, churches, and organizations.",
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setMode(item.key as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition ${
              mode === item.key
                ? "bg-[#7f264a] text-white border-[#7f264a]"
                : "bg-white hover:border-[#7f264a]/40"
            }`}
          >
            <i className={`fa-solid ${item.icon}`} />
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p
                className={`text-xs ${
                  mode === item.key ? "text-white/80" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* FORM */}
      {mode && (
        <div className="max-w-2xl mx-auto mt-10 bg-white border rounded-2xl p-6 space-y-4">

          <div className="flex items-center gap-2 text-[#7f264a] font-semibold">
            <i className="fa-solid fa-circle-info"></i>
            {mode.toUpperCase()}
          </div>

          <p className="text-sm text-gray-600">
            Submit your details and we will reach out to you.
          </p>

          {/* INPUTS */}
          <div className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-3 border rounded-xl"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={submitApplication}
            disabled={loading}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7f264a] hover:bg-[#6a1f3f]"}`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Submitting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                Apply & Create Account
              </>
            )}
          </button>

          {/* SUCCESS */}
          {success && (
            <div className="mt-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
              <div className="flex items-center gap-2 font-medium">
                <i className="fa-solid fa-circle-check"></i>
                Application Submitted
              </div>
              <p className="mt-1">
                Successfully submitted. Credentials and confirmation email have been sent to your inbox.
              </p>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <div className="max-w-2xl mx-auto text-center mt-12 text-sm text-gray-500 space-y-1">
        <p>
          <i className="fa-solid fa-envelope text-[#7f264a] mr-2"></i>
          info@tait.tz
        </p>

        <p>
          <i className="fa-brands fa-whatsapp text-green-600 mr-2"></i>
          +255 620 517 139
        </p>

        <p className="text-xs pt-2">
          TAIT — Integrated for Mission through Digital Systems & Media
        </p>
      </div>

    </main>
  );
}