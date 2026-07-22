import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { CrowdCanvas } from "../components/CrowdCanvas";
import Grainient from "../components/Grainient";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us - Pragati Path" },
      { name: "description", content: "Reach out to Pragati Path to learn about our grassroots initiatives in Bundelkhand or support our mission." },
      { property: "og:title", content: "Contact Us - Pragati Path" },
      { property: "og:description", content: "Reach out to Pragati Path to learn about our grassroots initiatives in Bundelkhand or support our mission." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const key = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    formData.append("access_key", key);
    formData.append("subject", `New Contact Form Submission: ${formData.get("subject") || "General Inquiry"}`);
    formData.append("from_name", "Pragati Path Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Grainient WebGL Background Requirement 14 */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <Grainient
          color1="#C0DBEA"
          color2="#E8A0BF"
          color3="#BA90C6"
          timeSpeed={0.9}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <Layout>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-14 bg-[#FDF4F5]/85 backdrop-blur-xl p-8 rounded-3xl border border-[#BA90C6] shadow-2xl max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#714B7F] mb-3">Enquire Now</h1>
            <p className="text-base text-[#B55981] font-semibold max-w-2xl mx-auto">
              Reach out to us to learn more about our grassroots initiatives in Bundelkhand, or to
              discover how you can support our mission for people-centered development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info */}
            <div className="lg:col-span-5 bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-[#BA90C6]">
              <div className="h-2 w-full bg-gradient-to-r from-[#BA90C6] via-[#E8A0BF] to-[#C0DBEA]" />
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#714B7F] mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <InfoRow icon="location_on" title="Our Office">
                    B-205, Deendayal Nagar,<br />Sipri Bazar, Jhansi,<br />Uttar Pradesh, India - 284003
                  </InfoRow>
                  <InfoRow icon="mail" title="Email Us">
                    pragatipath2001@gmail.com<br />pragatipath_org@yahoo.com
                  </InfoRow>
                  <InfoRow icon="call" title="Call Us">
                    +91 94151 94988<br />+91 94256 64863
                  </InfoRow>
                </div>
                <div className="mt-10 pt-6 border-t border-[#BA90C6]/30">
                  <h4 className="text-xs text-[#6A94AE] uppercase tracking-wider mb-3 font-bold">
                    Follow Our Work
                  </h4>
                  <div className="flex gap-3">
                    {["share", "group"].map((i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full bg-[#FDF4F5] border border-[#BA90C6]/40 flex items-center justify-center text-[#714B7F] hover:bg-[#E8A0BF] hover:text-[#FDF4F5] transition-colors shadow-sm"
                      >
                        <span className="material-symbols-outlined">{i}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-[#BA90C6]">
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {error && (
                  <div className="p-4 bg-red-100/80 backdrop-blur-sm border border-red-300 text-red-800 rounded-xl text-sm font-semibold">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="fullName" name="fullName" label="Full Name" placeholder="Jane Doe" required />
                  <Field id="phone" name="phone" type="tel" label="Phone Number" placeholder="+91 98765 43210" />
                </div>
                <Field id="email" name="email" type="email" label="Email Address" placeholder="jane@example.com" required />
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-[#714B7F] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-[#FDF4F5] border border-[#BA90C6] rounded-xl px-4 py-3 text-sm text-[#714B7F] focus:outline-none focus:ring-2 focus:ring-[#BA90C6]/30 transition-colors font-medium"
                  >
                    <option value="">Select a topic</option>
                    <option value="Volunteering Opportunities">Volunteering Opportunities</option>
                    <option value="Donation Inquiry">Donation Inquiry</option>
                    <option value="Partnership Proposal">Partnership Proposal</option>
                    <option value="General Information">General Information</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-[#714B7F] uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                    className="w-full bg-[#FDF4F5] border border-[#BA90C6] rounded-xl px-4 py-3 text-sm text-[#714B7F] focus:outline-none focus:ring-2 focus:ring-[#BA90C6]/30 transition-colors resize-y font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-[#BA90C6] text-[#FDF4F5] font-bold rounded-full hover:bg-[#E8A0BF] transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {isSubmitting ? "Sending..." : sent ? "Message Sent ✓" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <CrowdCanvas />
      </Layout>
    </>
  );
}

function InfoRow({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-2xl bg-[#BA90C6]/20 text-[#714B7F] shrink-0 border border-[#BA90C6]/30">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="text-base font-bold text-[#714B7F] mb-1">{title}</h3>
        <p className="text-[#B55981] font-medium text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function Field({ id, name, label, placeholder, type = "text", required = false }: { id: string; name?: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[#714B7F] uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#FDF4F5] border border-[#BA90C6] rounded-xl px-4 py-3 text-sm text-[#714B7F] focus:outline-none focus:ring-2 focus:ring-[#BA90C6]/30 transition-colors font-medium"
      />
    </div>
  );
}
