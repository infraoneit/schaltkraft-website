'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
    subjects?: string[];
    compact?: boolean;
}

export function ContactForm({ subjects, compact = false }: ContactFormProps) {
    const [status, setStatus] = useState<FormStatus>('idle');

    const defaultSubjects = [
        'Offertanfrage',
        'Technischer Support',
        'Projektanfrage',
        'Service & Wartung',
        'Bewerbung',
        'Allgemeine Anfrage',
    ];

    const subjectOptions = subjects && subjects.length > 0 ? subjects : defaultSubjects;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Convert FormData to URLSearchParams for Netlify
        const body = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            body.append(key, String(value));
        }

        try {
            const res = await fetch('/.netlify/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });

            if (!res.ok) {
                throw new Error('Form submission failed');
            }

            setStatus('success');
            form.reset();
        } catch (error) {
            console.error('Form error:', error);
            setStatus('error');
        }
    };

    const resetForm = () => {
        setStatus('idle');
    };

    // Success state
    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Vielen Dank!</h3>
                <p className="text-zinc-400 mb-6 max-w-sm">
                    Ihre Nachricht wurde erfolgreich übermittelt. Wir werden uns so schnell wie möglich bei Ihnen melden.
                </p>
                <Button
                    type="button"
                    onClick={resetForm}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
                >
                    Neue Nachricht senden
                </Button>
            </div>
        );
    }

    // Error state
    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Fehler beim Senden</h3>
                <p className="text-zinc-400 mb-6 max-w-sm">
                    Leider konnte Ihre Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.
                </p>
                <Button
                    type="button"
                    onClick={resetForm}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold"
                >
                    Zurück zum Formular
                </Button>
            </div>
        );
    }

    const inputClasses = "w-full h-14 bg-zinc-900 border border-white/10 px-4 text-white placeholder:text-zinc-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition-all rounded-lg";
    const labelClasses = "text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2 block";

    return (
        <form
            name="contact"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <input name="bot-field" className="hidden" />

            {/* Name & Company row */}
            <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
                <div>
                    <label htmlFor="name" className={labelClasses}>
                        Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Ihr Name"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="company" className={labelClasses}>
                        Firma
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Firmenname (optional)"
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Email & Phone row */}
            <div className={`grid ${compact ? 'grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
                <div>
                    <label htmlFor="email" className={labelClasses}>
                        E-Mail <span className="text-brand-orange">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="ihre@email.ch"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className={labelClasses}>
                        Telefon
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+41 XX XXX XX XX"
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className={labelClasses}>
                    Betreff <span className="text-brand-orange">*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                >
                    <option value="" disabled>Bitte wählen...</option>
                    {subjectOptions.map((subject, idx) => (
                        <option key={idx} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className={labelClasses}>
                    Nachricht <span className="text-brand-orange">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={compact ? 4 : 5}
                    placeholder="Ihre Nachricht an uns..."
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-white placeholder:text-zinc-500 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition-all rounded-lg resize-none"
                />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-zinc-900 text-brand-orange focus:ring-brand-orange focus:ring-offset-0 cursor-pointer accent-brand-orange"
                />
                <label htmlFor="privacy" className="text-sm text-zinc-400 cursor-pointer">
                    Ich habe die <a href="/datenschutz" className="text-brand-orange hover:underline">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Daten einverstanden. <span className="text-brand-orange">*</span>
                </label>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-14 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold uppercase tracking-widest text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
                {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Wird gesendet...
                    </span>
                ) : (
                    'Nachricht senden'
                )}
            </Button>

            <p className="text-xs text-zinc-500 text-center">
                Mit <span className="text-brand-orange">*</span> gekennzeichnete Felder sind Pflichtfelder.
            </p>
        </form>
    );
}
