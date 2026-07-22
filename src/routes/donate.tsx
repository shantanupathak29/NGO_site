import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import FadeContent from "../components/FadeContent";
import Silk from "../components/donate/Silk";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate & Support - Pragati Path" },
      { name: "description", content: "Support sustainable development in Bundelkhand. View bank details and submit donor declaration details." },
      { property: "og:title", content: "Donate & Support - Pragati Path" },
      { property: "og:description", content: "Support sustainable development in Bundelkhand. View bank details and submit donor declaration details." },
    ],
  }),
  component: Donate,
  errorComponent: ({ error }) => {
    console.error("Donate Route Error:", error);
    return (
      <Layout>
        <div className="py-32 text-center max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#5C326F]">Ways to Give</h2>
          <p className="mt-4 text-[#2A1B3D] font-semibold">Your contribution directly empowers grassroots livelihoods across Bundelkhand.</p>
        </div>
      </Layout>
    );
  },
});

const projects = [
  "General Fund",
  "Sustainable Agriculture",
  "Livelihood Promotion",
  "Health & Nutrition",
  "Quality Education",
  "Women Empowerment",
  "Water, Sanitation & Environment"
];

function hexToRgb(h: string) {
  const m = h.replace("#", "");
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
}
const START = hexToRgb("#FDF4F5");
const END = hexToRgb("#2A1B3D");
const START_SILK = hexToRgb("#E8A0BF");
const END_SILK = hexToRgb("#8E5B9A");

function interpolateColorHex(start: number[], end: number[], factor: number) {
  const r = Math.round(start[0] + (end[0] - start[0]) * factor);
  const g = Math.round(start[1] + (end[1] - start[1]) * factor);
  const b = Math.round(start[2] + (end[2] - start[2]) * factor);
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function Donate() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = `rgb(${Math.round(START[0] + (END[0] - START[0]) * progress)}, ${Math.round(
    START[1] + (END[1] - START[1]) * progress,
  )}, ${Math.round(START[2] + (END[2] - START[2]) * progress)})`;

  const silkColor = interpolateColorHex(START_SILK, END_SILK, progress);

  const [formData, setFormData] = useState({
    donorName: "",
    organization: "",
    donorType: "",
    donorTypeOther: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    email: "",
    mobile: "",
    website: "",
    projectSupported: "General Fund",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    mode: "",
    purpose: "",
    pan: "",
    receiptRequired: "",
    consent: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.donorName.trim()) newErrors.donorName = "Donor Name is required";
    if (!formData.donorType) newErrors.donorType = "Donor Type is required";
    if (formData.donorType === "Other" && !formData.donorTypeOther.trim()) {
      newErrors.donorTypeOther = "Please specify donor type";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "PIN/ZIP Code is required";
    } else if (!/^\d+$/.test(formData.pinCode)) {
      newErrors.pinCode = "PIN Code must be numeric";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (formData.country.toLowerCase() === "india" && !/^\d{10}$/.test(formData.mobile.replace(/[-+ ]/g, ""))) {
      newErrors.mobile = "Indian mobile number must be 10 digits";
    }

    if (!formData.amount) {
      newErrors.amount = "Donation Amount is required";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount = "Donation Amount must be greater than zero";
    }

    if (!formData.date) newErrors.date = "Donation Date is required";
    if (!formData.mode) newErrors.mode = "Mode of Donation is required";
    
    if (formData.pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.pan.trim())) {
      newErrors.pan = "PAN must be in standard format (e.g. ABCDE1234F)";
    }

    if (!formData.receiptRequired) newErrors.receiptRequired = "Receipt preference is required";
    if (!formData.consent) newErrors.consent = "Consent preference is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setError(null);

    const key = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    const web3FormsData = {
      access_key: key,
      subject: `New Donor Declaration: ₹${formData.amount} from ${formData.donorName}`,
      from_name: "Pragati Path Website",
      ...formData,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(web3FormsData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit details. Please check your connection.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Full Screen Fixed Silk WebGL Background Canvas */}
      <div
        aria-hidden
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: bg }}
      >
        <Silk
          speed={5}
          scale={1.2}
          color={silkColor}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <Layout>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-16">
          {/* Header */}
          <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
            <div className="text-center max-w-3xl mx-auto space-y-4 bg-[#FDF4F5]/85 backdrop-blur-xl p-8 rounded-3xl border border-[#BA90C6] shadow-2xl">
              <span className="text-[#5C326F] font-bold text-xs uppercase tracking-widest block">Support Us</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#5C326F]">Ways to Give</h1>
              <p className="text-base text-[#2A1B3D] font-semibold">
                Your contribution directly empowers grassroots livelihoods, water security, health prevention, and quality education across Bundelkhand.
              </p>
            </div>
          </FadeContent>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Ways to Donate */}
            <div className="lg:col-span-5 space-y-8">
              <FadeContent blur duration={800} threshold={0.1} initialOpacity={0}>
                <div className="bg-[#FDF4F5]/85 backdrop-blur-xl p-8 rounded-3xl border border-[#BA90C6] shadow-2xl space-y-8">
                  <h3 className="text-2xl font-extrabold text-[#5C326F] border-b border-[#BA90C6]/40 pb-4">Direct Transfer / UPI</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-[#FDF4F5] rounded-2xl border border-[#BA90C6]/60 space-y-2 shadow-sm">
                      <h4 className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider">Merchant Details</h4>
                      <p className="text-sm font-extrabold text-[#2A1B3D]">Merchant Name: PRAGATI PATH</p>
                      <p className="text-xs text-[#2A1B3D] font-bold">MID: 037215003370166 · TID: 91976005</p>
                      <p className="text-xs text-[#2A1B3D] font-bold">Helpdesk: +91 22 6226 0555</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-[#5C326F]">Bank Account (Local Fund)</h4>
                        <p className="text-xs text-[#2A1B3D] font-bold">For contributions originating from within India</p>
                        <div className="text-sm text-[#2A1B3D] font-bold bg-[#FDF4F5] p-4 rounded-xl space-y-1 font-mono border border-[#BA90C6]/50 shadow-sm">
                          <div>Bank: Central Bank of India</div>
                          <div>Branch: Sipri Bazar, Jhansi</div>
                          <div>A/c Name: Pragati Path</div>
                          <div>A/c No: 1605433883</div>
                          <div>IFSC: CBIN0028172</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-[#5C326F]">Bank Account (FCRA Fund)</h4>
                        <p className="text-xs text-[#2A1B3D] font-bold">For international/foreign contributions</p>
                        <div className="text-sm text-[#2A1B3D] font-bold bg-[#FDF4F5] p-4 rounded-xl space-y-1 font-mono border border-[#BA90C6]/50 shadow-sm">
                          <div>Bank: State Bank of India</div>
                          <div>Branch: Parliament Street, New Delhi</div>
                          <div>A/c Name: Pragati Path</div>
                          <div>A/c No: 40183701804</div>
                          <div>IFSC: SBIN0000691</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#BA90C6]/40 pt-6 space-y-2">
                      <p className="text-xs text-[#2A1B3D] font-bold leading-relaxed">
                        Donations are eligible for tax exemption under Section 80G.
                      </p>
                      <p className="text-sm font-extrabold text-[#5C326F]">
                        80G Registration No: AAATP7242DF20131
                      </p>
                    </div>
                  </div>
                </div>
              </FadeContent>

              <FadeContent blur duration={800} delay={150} threshold={0.1} initialOpacity={0}>
                <div className="bg-[#FDF4F5]/85 backdrop-blur-xl border border-[#BA90C6] rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
                  <span className="material-symbols-outlined text-4xl text-[#5C326F]">qr_code_2</span>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#5C326F]">BharatQR / UPI Code</h4>
                    <p className="text-xs text-[#2A1B3D] font-bold mt-1">Scan to make a quick contribution via any UPI app.</p>
                  </div>
                  <div className="w-48 h-48 bg-white border border-[#BA90C6]/60 rounded-2xl overflow-hidden shadow-md flex items-center justify-center p-2">
                    <img src="/donate-qr.jpg" alt="BharatQR / UPI Code" className="w-full h-full object-contain" />
                  </div>
                </div>
              </FadeContent>
            </div>

            {/* Right Column: Donor Form */}
            <div className="lg:col-span-7">
              <FadeContent blur duration={800} delay={100} threshold={0.1} initialOpacity={0}>
                <div className="bg-[#FDF4F5]/85 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-[#BA90C6] shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-16 space-y-6">
                      <div className="w-16 h-16 rounded-full bg-[#5C326F]/20 text-[#5C326F] flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl font-bold">done</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-extrabold text-[#5C326F]">Thank You for Your Support!</h3>
                        <p className="text-sm text-[#2A1B3D] font-bold max-w-md mx-auto leading-relaxed">
                          We have successfully received your donor details. A representative will contact you at <strong>{formData.email}</strong> to verify the transfer and send across your 80G tax exemption certificate.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-[#5C326F] text-[#FDF4F5] font-extrabold text-xs py-3 px-6 rounded-full hover:bg-[#8E5B9A] transition-all shadow-md"
                      >
                        Submit Another Detail
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h3 className="text-2xl font-extrabold text-[#5C326F] border-b border-[#BA90C6]/40 pb-4">Donor Declaration Form</h3>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Donor Name *</label>
                        <input
                          type="text"
                          value={formData.donorName}
                          onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="John Doe"
                        />
                        {errors.donorName && <p className="text-xs text-red-600 font-bold">{errors.donorName}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Organization/Company (Optional)</label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="ABC Industries"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Donor Type *</label>
                        <div className="grid grid-cols-2 gap-3 text-sm font-bold text-[#2A1B3D]">
                          {["Individual", "Corporate (CSR)", "Foundation", "Government Agency", "International Agency", "Other"].map((t) => (
                            <label key={t} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="donorType"
                                value={t}
                                checked={formData.donorType === t}
                                onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                                className="accent-[#5C326F]"
                              />
                              <span>{t}</span>
                            </label>
                          ))}
                        </div>
                        {formData.donorType === "Other" && (
                          <input
                            type="text"
                            value={formData.donorTypeOther}
                            onChange={(e) => setFormData({ ...formData, donorTypeOther: e.target.value })}
                            className="w-full mt-2 px-4 py-2.5 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                            placeholder="Please specify..."
                          />
                        )}
                        {errors.donorType && <p className="text-xs text-red-600 font-bold">{errors.donorType}</p>}
                        {errors.donorTypeOther && <p className="text-xs text-red-600 font-bold">{errors.donorTypeOther}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Address *</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm h-24 font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="House/Office number, Street name"
                        />
                        {errors.address && <p className="text-xs text-red-600 font-bold">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">City *</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          />
                          {errors.city && <p className="text-xs text-red-600 font-bold">{errors.city}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">State *</label>
                          <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          />
                          {errors.state && <p className="text-xs text-red-600 font-bold">{errors.state}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Country *</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          />
                          {errors.country && <p className="text-xs text-red-600 font-bold">{errors.country}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">PIN / ZIP Code *</label>
                          <input
                            type="text"
                            value={formData.pinCode}
                            onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                            placeholder="284003"
                          />
                          {errors.pinCode && <p className="text-xs text-red-600 font-bold">{errors.pinCode}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Mobile Number *</label>
                          <input
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                            placeholder="9415194988"
                          />
                          {errors.mobile && <p className="text-xs text-red-600 font-bold">{errors.mobile}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                            placeholder="donor@example.com"
                          />
                          {errors.email && <p className="text-xs text-red-600 font-bold">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Website (Optional)</label>
                          <input
                            type="text"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Project Supported *</label>
                          <select
                            value={formData.projectSupported}
                            onChange={(e) => setFormData({ ...formData, projectSupported: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] bg-[#FDF4F5] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D]"
                          >
                            {projects.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Donation Amount (₹) *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#5C326F] font-bold">₹</span>
                            <input
                              type="number"
                              value={formData.amount}
                              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                              className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                              placeholder="5000"
                              min="1"
                            />
                          </div>
                          {errors.amount && <p className="text-xs text-red-600 font-bold">{errors.amount}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Donation Date *</label>
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          />
                          {errors.date && <p className="text-xs text-red-600 font-bold">{errors.date}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Mode of Donation *</label>
                          <select
                            value={formData.mode}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] bg-[#FDF4F5] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D]"
                          >
                            <option value="">Select Mode...</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="UPI">UPI</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online Payment Gateway">Online Payment Gateway</option>
                            <option value="Cash">Cash (where legally permitted)</option>
                          </select>
                          {errors.mode && <p className="text-xs text-red-600 font-bold">{errors.mode}</p>}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Purpose of Donation (Optional)</label>
                        <textarea
                          value={formData.purpose}
                          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm h-20 font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="e.g. Support child education books"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">PAN Number (Optional)</label>
                        <input
                          type="text"
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="ABCDE1234F"
                        />
                        {errors.pan && <p className="text-xs text-red-600 font-bold">{errors.pan}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">80G Tax Exemption Receipt Required? *</label>
                        <div className="flex gap-6 text-sm font-bold text-[#2A1B3D]">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="receiptRequired"
                              value="Yes"
                              checked={formData.receiptRequired === "Yes"}
                              onChange={(e) => setFormData({ ...formData, receiptRequired: e.target.value })}
                              className="accent-[#5C326F]"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="receiptRequired"
                              value="No"
                              checked={formData.receiptRequired === "No"}
                              onChange={(e) => setFormData({ ...formData, receiptRequired: e.target.value })}
                              className="accent-[#5C326F]"
                            />
                            <span>No</span>
                          </label>
                        </div>
                        {errors.receiptRequired && <p className="text-xs text-red-600 font-bold">{errors.receiptRequired}</p>}
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Acknowledge Preference *</label>
                        <div className="space-y-3 text-sm font-bold text-[#2A1B3D]">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.consent === "public"}
                              onChange={() => setFormData({ ...formData, consent: formData.consent === "public" ? "" : "public" })}
                              className="mt-1 accent-[#5C326F]"
                            />
                            <span>I agree that my name may be displayed on the organization's donor acknowledgment page.</span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.consent === "anonymous"}
                              onChange={() => setFormData({ ...formData, consent: formData.consent === "anonymous" ? "" : "anonymous" })}
                              className="mt-1 accent-[#5C326F]"
                            />
                            <span>I wish to remain anonymous.</span>
                          </label>
                        </div>
                        {errors.consent && <p className="text-xs text-red-600 font-bold">{errors.consent}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-extrabold text-[#5C326F] uppercase tracking-wider block">Message to the Organization (Optional)</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#BA90C6] focus:outline-none focus:ring-2 focus:ring-[#5C326F]/30 text-sm h-24 font-bold text-[#2A1B3D] bg-[#FDF4F5]"
                          placeholder="Leave a short note..."
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-100/80 backdrop-blur-sm border border-red-300 text-red-800 rounded-xl text-sm font-semibold">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#5C326F] hover:bg-[#8E5B9A] text-[#FDF4F5] font-extrabold py-4 px-6 rounded-full transition-all shadow-lg hover:scale-[1.02] block text-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Donate / Submit Details"}
                      </button>
                    </form>
                  )}
                </div>
              </FadeContent>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
