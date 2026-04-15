'use client';

import { useState, useEffect } from 'react';
import { Download, Mail, X, Send, CheckCircle, Loader2 } from 'lucide-react';

// ============================================================
// CONFIGURATION — fill these in after setting up EmailJS
// See: https://dashboard.emailjs.com
// ============================================================
const RESUME_URL              = 'https://raw.githubusercontent.com/paragagnihotri/resume/main/Parag_Agnihotri_Resume.pdf';
const EMAILJS_PUBLIC_KEY      = 'oX_smBrjE63rAHHkL';
const EMAILJS_SERVICE_ID      = 'service_c7oa3zk';
const EMAILJS_TEMPLATE_NOTIFY = 'template_rxjj41t'; // notification email → you
const EMAILJS_TEMPLATE_ACK    = 'template_oc5qo6l';    // acknowledgement email → sender

async function sendViaEmailJS(templateId: string, params: Record<string, string>) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:      EMAILJS_SERVICE_ID,
      template_id:     templateId,
      user_id:         EMAILJS_PUBLIC_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error('EmailJS error ' + res.status);
}

type FormState = { name: string; email: string; subject: string; message: string };
type Status    = 'idle' | 'sending' | 'success' | 'error';

export default function HeroButtons() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [form,     setForm]     = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status,   setStatus]   = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* Lock body scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  function openModal() {
    setStatus('idle');
    setErrorMsg('');
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsOpen(true);
  }

  function closeModal() {
    if (status === 'sending') return;
    setIsOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const params = {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
        to_email:   'agnihotriparag2201@gmail.com',
      };
      await sendViaEmailJS(EMAILJS_TEMPLATE_NOTIFY, params);
      await sendViaEmailJS(EMAILJS_TEMPLATE_ACK,    params);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email me directly at agnihotriparag2201@gmail.com.');
    }
  }

  const inputClass =
    'w-full px-3.5 py-2.5 border border-brown-200 rounded-xl text-sm text-brown-900 bg-cream ' +
    'placeholder:text-brown-300 focus:outline-none focus:border-brown-500 focus:ring-2 ' +
    'focus:ring-brown-500/15 transition-all';

  return (
    <>
      {/* ── Buttons ── */}
      <div className="flex flex-wrap gap-3 mt-8">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="btn-primary"
        >
          <Download size={16} />
          Download Resume
        </a>
        <button className="btn-outline" onClick={openModal}>
          <Mail size={16} />
          Contact Me
        </button>
      </div>

      {/* ── Modal ── */}
      {isOpen && (
        <div
          className="modal-backdrop-enter fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(44,24,16,0.55)', backdropFilter: 'blur(5px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-box-enter bg-white rounded-2xl w-full max-w-lg shadow-warm-lg max-h-[90vh] overflow-y-auto">

            {status === 'success' ? (
              /* ── Success state ── */
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-brown-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-brown-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-brown-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-brown-500 text-sm mb-6">
                  Thanks for reaching out,{' '}
                  <span className="font-medium text-brown-700">{form.name}</span>.
                  I&apos;ll get back to you soon. A confirmation has been sent to{' '}
                  <span className="font-medium text-brown-700">{form.email}</span>.
                </p>
                <button className="btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              /* ── Form state ── */
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-brown-900">
                      Get in Touch
                    </h2>
                    <p className="text-brown-500 text-sm mt-1">
                      I&apos;d love to hear from you. Send me a message!
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1.5 rounded-lg text-brown-400 hover:text-brown-700 hover:bg-brown-100 transition-colors ml-4 flex-shrink-0"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-1.5">
                        Name <span className="text-brown-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-1.5">
                        Email <span className="text-brown-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">
                      Subject <span className="text-brown-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={inputClass}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1.5">
                      Message <span className="text-brown-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Your message..."
                      value={form.message}
                      onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      className={inputClass + ' resize-y'}
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <p className="text-red-600 text-xs text-center">{errorMsg}</p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 justify-end pt-1">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={closeModal}
                      disabled={status === 'sending'}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <><Loader2 size={15} className="animate-spin" /> Sending…</>
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
