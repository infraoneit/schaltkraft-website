import { PageContainer } from '@/components/layout/PageContainer';
import { ContactForm } from '@/components/features/contact/ContactForm';

interface ContactFormBlockProps {
  data: {
    headline?: string;
    subjects?: string[];
  };
}

export function ContactFormBlock({ data }: ContactFormBlockProps) {
  return (
    <section className="section-padding bg-zinc-900">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl font-bold uppercase mb-6">{data.headline || 'Kontakt'}</h2>
            <p className="text-zinc-400 mb-8">
              Wir stehen Ihnen für alle Fragen zur Verfügung. Füllen Sie einfach das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
            </p>
            <div className="space-y-4 text-zinc-400">
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
          <div className="bg-black/20 p-6 md:p-8 rounded-2xl border border-white/10">
            <ContactForm subjects={data.subjects} />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
