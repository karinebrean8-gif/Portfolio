import React, { useState } from 'react';

// ============================================================================
// IMMUTABLE CONFIGURATION DATA (Architecture Decoupling)
// ============================================================================

const PERSONAL_INFO = {
    name: "Shakib Mia",
    mobile: "01946834067",
    email: "r01227673@gmail.com",
};

const SOCIAL_LINKS = [
    {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/shakib-mia-497531", // Fixed standard URL structure
        icon: "💼",
        label: "Connect professionally"
    },
    {
        platform: "GitHub",
        url: "https://github.com/karinebrean8-gif/NextShop",
        icon: "💻",
        label: "Review architecture"
    },
    {
        platform: "Facebook",
        url: "https://www.facebook.com/shakib.mia.497531",
        icon: "🌐",
        label: "Get in touch"
    }
];

const CONTACT_CHANNELS = [
    {
        type: "Email",
        value: PERSONAL_INFO.email,
        href: `mailto:${PERSONAL_INFO.email}`,
        icon: "✉️",
        description: "For architectural consultancies and executive inquiries."
    },
    {
        type: "Phone",
        value: PERSONAL_INFO.mobile,
        href: `tel:${PERSONAL_INFO.mobile}`,
        icon: "📱",
        description: "Direct line for critical system-down situations or high-level strategy."
    }
];

const FORM_FIELDS = [
    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@enterprise.com', required: true },
    { id: 'subject', label: 'Subject / Project Scope', type: 'text', placeholder: 'System Architecture Re-design', required: true },
    { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Describe your scaling or system engineering challenges...', required: true }
];

const INITIAL_FORM_STATE = Object.freeze(
    FORM_FIELDS.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {})
);

// ============================================================================
// BUSINESS LOGIC & SERVICES (Promises / API Layer Simulation)
// ============================================================================

const submitContactForm = (formData) => {
    return new Promise((resolve, reject) => {
        // Simulating FAANG-scale API Gateway network latency
        setTimeout(() => {
            if (!formData.email || !formData.message) {
                reject(new Error("Incomplete payload. Validation failed at edge gateway."));
            } else {
                resolve({ status: 200, message: "Payload successfully ingested into queue system." });
            }
        }, 1200);
    });
};

// ============================================================================
// PRINCIPAL COMPONENT
// ============================================================================

export default function Contact() {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: '' });

        try {
            const response = await submitContactForm(formData);
            setSubmitStatus({ success: true, message: "Message dispatched successfully. Expect a response within one business cycle." });
            setFormData(INITIAL_FORM_STATE);
        } catch (error) {
            setSubmitStatus({ success: false, message: error.message || "Failed to route payload. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-24 px-6 md:px-12 lg:px-24 font-sans selection:bg-emerald-500 selection:text-slate-950">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COLUMN: ARCHITECT METRICS & DIRECT CHANNELS */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Availability: Enterprise Consulting
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
                            Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Connection</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                            With over 50 years of collective digital transformation experience, I build systems that outlast infrastructural shifts. Let's design your next scale horizon.
                        </p>
                    </div>

                    {/* Direct Communication Channels (Mapped) */}
                    <div className="space-y-6">
                        {CONTACT_CHANNELS.map((channel) => (
                            <a
                                key={channel.type}
                                href={channel.href}
                                className="group flex items-start gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/40 transition-all duration-300"
                            >
                                <span className="text-2xl p-2 rounded-lg bg-slate-800 text-emerald-400 group-hover:scale-110 transition-transform">
                                    {channel.icon}
                                </span>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{channel.type}</h4>
                                    <p className="text-white font-mono text-base my-1">{channel.value}</p>
                                    <p className="text-xs text-slate-400">{channel.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Social Matrices (Mapped) */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Global Identity Nodes</h3>
                        <div className="flex flex-wrap gap-3">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.platform}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
                                >
                                    <span className="mr-2">{link.icon}</span>
                                    {link.platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: SECURE DISPATCH FORM */}
                <div className="lg:col-span-7">
                    <div className="p-8 md:p-10 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-2">Secure Gateway Dispatch</h2>
                        <p className="text-sm text-slate-400 mb-8">All incoming vectors are automatically screened, categorized, and indexed.</p>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            {FORM_FIELDS.map((field) => (
                                <div key={field.id} className="flex flex-col space-y-2">
                                    <label htmlFor={field.id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        {field.label} {field.required && <span className="text-emerald-400">*</span>}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.id}
                                            name={field.id}
                                            required={field.required}
                                            rows="5"
                                            placeholder={field.placeholder}
                                            value={formData[field.id]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-800 bg-slate-950/50 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200 resize-none font-mono text-sm"
                                        />
                                    ) : (
                                        <input
                                            id={field.id}
                                            name={field.id}
                                            type={field.type}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            value={formData[field.id]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-800 bg-slate-950/50 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all duration-200 font-mono text-sm"
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Status Notifications */}
                            {submitStatus.message && (
                                <div className={`p-4 rounded-lg text-sm border font-mono ${submitStatus.success
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                    }`}>
                                    {submitStatus.success ? '⚡ SUCCESS: ' : '⚠️ ERROR: '} {submitStatus.message}
                                </div>
                            )}

                            {/* Dynamic Submission Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 rounded-lg font-bold text-sm tracking-wider uppercase text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-lg shadow-emerald-500/10"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Streaming Payload...
                                    </span>
                                ) : (
                                    "Execute Dispatch Vector"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}