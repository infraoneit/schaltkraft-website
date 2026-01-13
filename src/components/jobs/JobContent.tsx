import { Target, User, Gift, Mail, Briefcase, CheckCircle2 } from 'lucide-react';

interface JobContentProps {
    description: string;
}

interface Section {
    title: string;
    content: string;
    iconType: string;
}

// Map section headers to icon types
function getIconType(title: string): string {
    const normalizedTitle = title.toLowerCase();
    if (normalizedTitle.includes('mission')) return 'briefcase';
    if (normalizedTitle.includes('aufgaben')) return 'target';
    if (normalizedTitle.includes('profil') || normalizedTitle.includes('mitbringst')) return 'user';
    if (normalizedTitle.includes('bieten')) return 'gift';
    if (normalizedTitle.includes('kontakt')) return 'mail';
    return 'check';
}

function IconComponent({ iconType }: { iconType: string }) {
    switch (iconType) {
        case 'briefcase': return <Briefcase className="w-6 h-6 text-brand-orange" />;
        case 'target': return <Target className="w-6 h-6 text-brand-orange" />;
        case 'user': return <User className="w-6 h-6 text-brand-orange" />;
        case 'gift': return <Gift className="w-6 h-6 text-brand-orange" />;
        case 'mail': return <Mail className="w-6 h-6 text-brand-orange" />;
        default: return <CheckCircle2 className="w-6 h-6 text-brand-orange" />;
    }
}

function parseHtmlToSections(html: string): { intro: string; sections: Section[] } {
    const sections: Section[] = [];
    let intro = '';

    // Split by h2/h3 tags while keeping them
    const parts = html.split(/(<h[23][^>]*>.*?<\/h[23]>)/gi);

    let currentSection: Section | null = null;

    parts.forEach((part) => {
        const headerMatch = part.match(/<h[23][^>]*>(.*?)<\/h[23]>/i);
        if (headerMatch) {
            if (currentSection) {
                sections.push(currentSection);
            }
            const title = headerMatch[1].replace(/<[^>]*>/g, '').trim();
            currentSection = {
                title,
                content: '',
                iconType: getIconType(title)
            };
        } else if (currentSection) {
            currentSection.content += part;
        } else if (part.trim()) {
            intro += part;
        }
    });

    if (currentSection) {
        sections.push(currentSection);
    }

    return { intro, sections };
}

export function JobContent({ description }: JobContentProps) {
    if (!description) {
        return null;
    }

    const { intro, sections } = parseHtmlToSections(description);

    return (
        <div className="space-y-6">
            {/* Intro section */}
            {intro && (
                <div
                    className="text-lg text-zinc-300 leading-relaxed mb-8 prose prose-invert max-w-none prose-p:text-zinc-300 prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: intro }}
                />
            )}

            {/* Content sections as cards */}
            {sections.map((section, idx) => (
                <div
                    key={idx}
                    className="bg-zinc-900/60 rounded-2xl p-6 md:p-8 border border-white/10 hover:border-brand-orange/30 transition-all duration-300"
                >
                    {/* Section header with icon */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 border border-brand-orange/30 flex items-center justify-center shrink-0">
                            <IconComponent iconType={section.iconType} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                            {section.title}
                        </h3>
                    </div>

                    {/* Section content */}
                    <div
                        className="prose prose-invert prose-base max-w-none 
                            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:my-3
                            prose-ul:my-4 prose-ul:space-y-2
                            prose-li:text-zinc-300 prose-li:pl-2 prose-li:marker:text-brand-orange
                            prose-strong:text-white prose-strong:font-semibold
                            prose-a:text-brand-orange"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                </div>
            ))}
        </div>
    );
}
