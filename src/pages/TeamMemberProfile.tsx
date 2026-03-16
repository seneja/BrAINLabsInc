import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { team, type TeamMember } from '@/data/team';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Mail, 
    Linkedin, 
    Globe, 
    GraduationCap, 
    Briefcase, 
    Award, 
    BookOpen, 
    Search,
    ChevronRight,
    Zap
} from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const TeamMemberProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [member, setMember] = useState<TeamMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const timer = setTimeout(() => {
            const foundMember = team.find(m => m.id === id);
            setMember(foundMember || null);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [id]);

    if (!isLoading && !member) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Member not found</h2>
                    <Link to="/team">
                        <Button variant="outline">Back to Team</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background">
            {member && (
                <SEO 
                    title={`${member.name} | BrAIN Labs Team`} 
                    description={`${member.position} at BrAIN Labs - ${member.university}`}
                />
            )}

            {/* ── Hero Section (Enhanced Three-Column Layout) ────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden min-h-[60vh] flex flex-col justify-center border-b border-border/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute left-1/3 top-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-7xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <Link to="/team">
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors bg-primary/5 rounded-full px-4">
                                    <ArrowLeft size={16} />
                                    Back to Team
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="grid lg:grid-cols-[auto_1fr_400px] gap-12 lg:gap-16 items-start">
                            {/* Column 1: Badge + Avatar */}
                            <motion.div variants={itemVariants} className="shrink-0 relative group flex flex-col items-start gap-3">
                                <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                                    <Zap size={10} />
                                    Team Member
                                </div>
                                {isLoading ? (
                                    <Skeleton className="w-40 h-40 md:w-56 md:h-56 rounded-3xl" />
                                ) : (
                                    <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
                                        {member?.image ? (
                                            <img 
                                                src={member.image} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                                                <span className="text-5xl font-bold text-primary/40">
                                                    {member?.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Column 2: Core Info */}
                            <motion.div variants={itemVariants} className="space-y-6 lg:pt-10">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-10 w-3/4" />
                                        <Skeleton className="h-6 w-1/2" />
                                        <Skeleton className="h-6 w-2/3" />
                                        <div className="flex gap-4 pt-4">
                                            <Skeleton className="h-10 w-24 rounded-full" />
                                            <Skeleton className="h-10 w-24 rounded-full" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-3">
                                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                                                {member?.name}
                                            </h1>
                                            <p className="text-xl md:text-2xl text-primary/90 font-semibold tracking-tight">
                                                {member?.position}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 text-sm md:text-base text-muted-foreground/80">
                                            <div className="flex items-center gap-3">
                                                <GraduationCap size={18} className="text-primary/60 shrink-0" />
                                                <span>Faculty of Computing | Computer Science</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Globe size={18} className="text-primary/60 shrink-0" />
                                                <span>{member?.university}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-6">
                                            {member?.contact && (
                                                <Button size="sm" variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 h-10 px-6" asChild>
                                                    <a href={`mailto:${member.contact}`}>
                                                        <Mail size={14} />
                                                        Email
                                                    </a>
                                                </Button>
                                            )}
                                            {member?.linkedin && (
                                                <Button size="sm" variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5 h-10 px-6" asChild>
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                        <Linkedin size={14} />
                                                        LinkedIn
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Column 3: Quick Insights (Interests, Awards, Ongoing) */}
                            <motion.div 
                                variants={itemVariants} 
                                className="hidden lg:block space-y-8 p-6 md:p-8 rounded-3xl border border-primary/10 bg-primary/[0.02] backdrop-blur-sm self-start"
                            >
                                {isLoading ? (
                                    <div className="space-y-6">
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-16 w-full" />
                                        <Skeleton className="h-6 w-1/3" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>
                                ) : (
                                    <>
                                        {/* Interests */}
                                        {member?.researchInterests && (
                                            <div className="space-y-5">
                                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                                                    <Search size={14} strokeWidth={3} />
                                                    Research Interests
                                                </h3>
                                                <div className="space-y-4">
                                                    {member.researchInterests.theoretical && (
                                                        <div className="space-y-2">
                                                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Theoretical</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {member.researchInterests.theoretical.map(interest => (
                                                                    <Badge key={interest} variant="secondary" className="bg-background/80 hover:bg-primary/5 border-border/50 text-[10px] px-2 py-0.5">
                                                                        {interest}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {member.researchInterests.applied && (
                                                        <div className="space-y-2">
                                                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Applied</p>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {member.researchInterests.applied.map(interest => (
                                                                    <Badge key={interest} variant="secondary" className="bg-background/80 hover:bg-primary/5 border-border/50 text-[10px] px-2 py-0.5">
                                                                        {interest}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Ongoing */}
                                        {member?.ongoingResearch && (
                                            <div className="space-y-4 pt-4 border-t border-primary/5">
                                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                                                    <Zap size={14} strokeWidth={3} />
                                                    Ongoing Research
                                                </h3>
                                                <div className="space-y-3">
                                                    {member.ongoingResearch.map((res, i) => (
                                                        <div key={i} className="flex gap-3">
                                                            <div className="w-1 h-auto bg-primary/20 rounded-full shrink-0" />
                                                            <p className="text-[11px] text-foreground/80 leading-relaxed italic line-clamp-2">{res}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Awards */}
                                        {member?.honoursAndAwards && (
                                            <div className="space-y-4 pt-4 border-t border-primary/5">
                                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary flex items-center gap-2">
                                                    <Award size={14} strokeWidth={3} />
                                                    Recent Awards
                                                </h3>
                                                <div className="space-y-2">
                                                    {member.honoursAndAwards.slice(0, 2).map((award, i) => (
                                                        <div key={i} className="flex gap-2 text-[11px] text-muted-foreground">
                                                            <span className="text-primary">•</span>
                                                            <p className="line-clamp-2">{award}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Mobile/Tablet Secondary Info ── */}
            <section className="lg:hidden py-10 bg-muted/20 border-b border-border/40">
                <div className="container mx-auto px-4 space-y-8">
                </div>
            </section>

            {/* ── Main Content ────────────────────────────────────────── */}
            <section className="py-12 md:py-20 relative px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
                        
                        {/* Details Column */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="space-y-16"
                        >
                            {isLoading ? (
                                <div className="space-y-8">
                                    <Skeleton className="h-8 w-1/4" />
                                    <Skeleton className="h-32 w-full" />
                                    <Skeleton className="h-8 w-1/4" />
                                    <Skeleton className="h-32 w-full" />
                                </div>
                            ) : (
                                <>
                                    {/* Career Summary */}
                                    {member?.careerSummary && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                                                <div className="p-2 bg-primary/10 rounded-xl">
                                                    <Briefcase size={20} className="text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold">Career Summary</h2>
                                            </div>

                                            {/* Academic Career */}
                                            {member.careerSummary.academic && (
                                                <div className="space-y-10">
                                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70">Academic Experience</h3>
                                                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/30 before:via-primary/10 before:to-transparent">
                                                        {member.careerSummary.academic.map((exp, idx) => (
                                                            <div key={idx} className="relative pl-10">
                                                                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-background border-2 border-primary/30 flex items-center justify-center">
                                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                                                                        <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                                                                        <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded leading-none">{exp.period}</span>
                                                                    </div>
                                                                    <p className="text-primary font-medium text-sm">{exp.institution}</p>
                                                                    {exp.details && (
                                                                        <ul className="mt-4 space-y-2">
                                                                            {exp.details.map((detail, dIdx) => (
                                                                                <li key={dIdx} className="text-muted-foreground text-sm flex gap-2">
                                                                                    <ChevronRight size={14} className="shrink-0 mt-1 text-primary/40" />
                                                                                    {detail}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Industry Career */}
                                            {member.careerSummary.industry && (
                                                <div className="space-y-10">
                                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70">Industry Experience</h3>
                                                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/30 before:via-primary/10 before:to-transparent">
                                                        {member.careerSummary.industry.map((exp, idx) => (
                                                            <div key={idx} className="relative pl-10">
                                                                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-background border-2 border-primary/30 flex items-center justify-center">
                                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                                                                        <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                                                                        <span className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded leading-none">{exp.period}</span>
                                                                    </div>
                                                                    <p className="text-primary font-medium text-sm">{exp.institution}</p>
                                                                    {exp.details && (
                                                                        <ul className="mt-4 space-y-2">
                                                                            {exp.details.map((detail, dIdx) => (
                                                                                <li key={dIdx} className="text-muted-foreground text-sm flex gap-2">
                                                                                    <ChevronRight size={14} className="shrink-0 mt-1 text-primary/40" />
                                                                                    {detail}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Academic Qualifications */}
                                    {member?.academicQualifications && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                                                <div className="p-2 bg-primary/10 rounded-xl">
                                                    <GraduationCap size={20} className="text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold">Academic Qualifications</h2>
                                            </div>
                                            <div className="grid gap-6">
                                                {member.academicQualifications.map((qual, idx) => (
                                                    <div key={idx} className="p-6 rounded-2xl bg-muted/30 border border-border/50 space-y-3">
                                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                                            <h3 className="text-lg font-bold">{qual.degree}</h3>
                                                            <Badge variant="outline" className="font-mono text-[11px]">{qual.period}</Badge>
                                                        </div>
                                                        <p className="text-primary/80 font-medium">{qual.institution}</p>
                                                        {qual.details && (
                                                            <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                                                                {qual.details}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Publications */}
                                    {member?.publications && member.publications.length > 0 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 border-b border-border/40 pb-4">
                                                <div className="p-2 bg-primary/10 rounded-xl">
                                                    <BookOpen size={20} className="text-primary" />
                                                </div>
                                                <h2 className="text-2xl font-bold">Selected Publications</h2>
                                            </div>
                                            <div className="space-y-4">
                                                {member.publications.map((pub, idx) => (
                                                    <div key={idx} className="group p-5 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card/60 backdrop-blur-sm">
                                                        <div className="flex gap-4">
                                                            <div className="hidden sm:flex shrink-0 w-10 h-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                                                                {idx + 1}
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                                                                    {pub.title}
                                                                </h4>
                                                                <p className="text-sm text-muted-foreground">{pub.authors}</p>
                                                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                                                    <Badge variant="secondary" className="text-[10px] bg-primary/5 text-primary">
                                                                        {pub.venue}, {pub.year}
                                                                    </Badge>
                                                                    {pub.type === 'under_review' && (
                                                                        <Badge className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20">Under Review</Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>

                        {/* Sticky Sidebar */}
                        <aside className="space-y-10 lg:sticky lg:top-32">
                            {member?.honoursAndAwards && member.honoursAndAwards.length > 2 && (
                                <div className="p-8 rounded-3xl border border-border/50 bg-card/40 space-y-6">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70 flex items-center gap-2">
                                        <Award size={14} />
                                        Full Award Honors
                                    </h3>
                                    <div className="space-y-4">
                                        {member.honoursAndAwards.map((award, i) => (
                                            <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                                                <span className="text-primary text-lg leading-none">•</span>
                                                <p>{award}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="p-8 rounded-3xl border border-primary/10 bg-primary/[0.02] space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/70">Connect</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Interested in collaborating with our research team? Get in touch with BrAIN Labs to explore opportunities.
                                </p>
                                <Link to="/contact">
                                    <Button className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 py-6">
                                        Work with us
                                    </Button>
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── Footer Link ────────────────────────────────────────── */}
            <section className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 text-center">
                    <Link to="/team">
                        <Button variant="ghost" className="gap-2 text-primary hover:bg-primary/5 rounded-full px-8 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Meet More Researchers
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};