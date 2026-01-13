'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { ContactForm } from '@/components/features/contact/ContactForm';

interface ContactTeaserBlockProps {
    data: {
        headline?: string;
        text?: string;
    }
}

export function ContactTeaserBlock({ data }: ContactTeaserBlockProps) {
    return (
        <section className="py-24 bg-zinc-900 border-t border-white/10">
            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Text Side */}
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-6">
                            {data.headline || 'Kontaktieren Sie uns'}
                        </h2>
                        <p className="text-xl text-zinc-400 mb-8 max-w-md">
                            {data.text || 'Wir freuen uns auf Ihre Anfrage.'}
                        </p>
                        <div className="hidden lg:block space-y-4 text-zinc-400">
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                Schnelle Antwort innerhalb von 24h
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                Persönliche Beratung
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                                Unverbindliche Offerte
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-black/50 p-6 md:p-8 rounded-2xl border border-white/10">
                        <ContactForm compact />
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
