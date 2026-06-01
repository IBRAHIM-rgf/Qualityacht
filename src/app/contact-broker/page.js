'use client';

// Page contact broker — page globale liée depuis privat-jet modal (et réutilisable ailleurs).
// Minimaliste pour l'instant : titre + formulaire simple + lien retour. À étoffer.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send, Phone, Mail } from 'lucide-react';

export default function ContactBrokerPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : brancher sur l'endpoint d'envoi mail (nodemailer existe déjà dans le projet)
    setSent(true);
  };

  return (
    <div className="bg-[#26272a] text-[#acb0cd] min-h-screen pt-[70px] md:pt-24">
      <style>{`
        .reveal-up { opacity: 0; transform: translateY(40px); transition: opacity 1.6s ease, transform 1.6s ease; }
      `}</style>

      {/* ══ HEADER ══ */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16 text-center">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c2622a] mb-3">
          Get in touch
        </p>
        <h1 className="trajan-regular text-3xl md:text-5xl uppercase tracking-[0.1em] md:tracking-[0.15em] text-[#C0C0C0]">
          Contact a Broker
        </h1>
        <div className="relative w-32 h-6 mx-auto mt-4 mb-6">
          <Image src="/images/title-line.png" alt="" fill className="object-contain" />
        </div>
        <p className="text-base md:text-lg text-[#acb0cd]/80 max-w-2xl mx-auto leading-relaxed">
          Nos brokers sont disponibles 24/7 pour répondre à toutes vos demandes — yacht charter, jet privé, transferts.
          Décrivez votre projet en quelques lignes, nous revenons vers vous sous 24h.
        </p>
      </div>

      {/* ══ Coordonnées rapides ══ */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 pb-8 grid sm:grid-cols-2 gap-4">
        <a href="tel:+33000000000" className="rounded-xl border border-[#C0C0C0]/40 bg-[#3a3b3f] p-5 flex items-center gap-3 hover:border-[#B03E00] transition-colors">
          <Phone className="w-6 h-6 text-[#B03E00]" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60">Téléphone</p>
            <p className="text-[#C0C0C0] text-sm md:text-base font-medium">+33 (0)0 00 00 00 00</p>
          </div>
        </a>
        <a href="mailto:broker@qualityacht.com" className="rounded-xl border border-[#C0C0C0]/40 bg-[#3a3b3f] p-5 flex items-center gap-3 hover:border-[#B03E00] transition-colors">
          <Mail className="w-6 h-6 text-[#B03E00]" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60">Email</p>
            <p className="text-[#C0C0C0] text-sm md:text-base font-medium">broker@qualityacht.com</p>
          </div>
        </a>
      </div>

      {/* ══ Formulaire ══ */}
      <div className="max-w-2xl mx-auto px-5 md:px-8 pb-16">
        {sent ? (
          <div className="rounded-xl border border-[#B03E00] bg-[#B03E00]/10 p-8 text-center">
            <p className="trajan-regular text-xl md:text-2xl text-[#C0C0C0] mb-2">Message envoyé</p>
            <p className="text-sm text-[#acb0cd]">Un broker reviendra vers vous sous 24h.</p>
            <Link href="/" className="inline-flex items-center gap-2 mt-6 text-sm text-[#B03E00] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl border border-[#C0C0C0]/30 bg-[#3a3b3f] p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Nom complet *</label>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#26272a] border border-[#C0C0C0]/30 rounded-lg text-[#C0C0C0] focus:border-[#B03E00] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Téléphone</label>
                <input
                  type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#26272a] border border-[#C0C0C0]/30 rounded-lg text-[#C0C0C0] focus:border-[#B03E00] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Email *</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#26272a] border border-[#C0C0C0]/30 rounded-lg text-[#C0C0C0] focus:border-[#B03E00] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Sujet</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3 py-2 bg-[#26272a] border border-[#C0C0C0]/30 rounded-lg text-[#C0C0C0] focus:border-[#B03E00] outline-none"
              >
                <option value="">— Choisir —</option>
                <option value="yacht">Location de yacht</option>
                <option value="jet">Jet privé</option>
                <option value="airport">Transfert aéroport</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#acb0cd]/60 mb-1">Message *</label>
              <textarea
                required rows={6} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Décrivez votre projet : destination, dates, nombre de passagers, préférences…"
                className="w-full px-3 py-2 bg-[#26272a] border border-[#C0C0C0]/30 rounded-lg text-[#C0C0C0] focus:border-[#B03E00] outline-none resize-y"
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-2">
              <Link href="/" className="text-sm text-[#acb0cd]/70 hover:text-[#B03E00] flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C0C0C0] px-8 py-2.5 text-sm uppercase tracking-[0.2em] font-medium text-[#B03E00] transition-all hover:bg-[#B03E00]/10 hover:border-[#B03E00] shadow-[0_4px_15px_rgba(192,192,192,0.3)]"
              >
                <Send className="w-4 h-4" />
                Envoyer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
