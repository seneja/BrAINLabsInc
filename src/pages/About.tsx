import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mission, collaborations, futureDirections, faq } from '@/data/general';
import * as Icons from 'lucide-react';
import { Target, Handshake, Rocket, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MissionCompassIcon } from '@/components/ui/PageIcons';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
        {children}
    </div>
);

export const About = () => {
    const MissionIcon = (Icons as any)[mission.iconName] || Target;
    const CollabIcon = (Icons as any)[collaborations.iconName] || Handshake;
    const FutureIcon = (Icons as any)[futureDirections.iconName] || Rocket;

    return (
        <div className="min-h-screen">
            <SEO
                title="About BrAIN Labs"
                description="Learn about BrAIN Labs' mission to pioneer AI and neuroscience research, our collaborations, and future directions."
                keywords={['About BrAIN Labs', 'AI Mission', 'Neuroscience Research', 'AI Collaborations']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute right-0 top-0 w-[28rem] h-[28rem] bg-primary/4 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl lg:pl-4"
                    >
                        <SectionLabel><MissionCompassIcon size={14} /> About Us</SectionLabel>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Pioneering{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                AI Research
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Exploring the intersection of artificial intelligence and neuroscience to build the next generation of intelligent systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Mission ──────────────────────────────────────────── */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 lg:pl-8">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                    <MissionIcon className="text-primary" size={22} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{mission.title}</h2>
                            </div>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl border-l-2 border-primary/30 pl-4">
                                {mission.description}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-5">
                            {mission.points.map((point, idx) => {
                                const PointIcon = (Icons as any)[point.iconName] || Target;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Card className="h-full transition-all duration-300 border-border/50 hover:border-primary/40 hover:shadow-md group bg-card/60">
                                            <CardHeader className="space-y-4 pb-4">
                                                <div className="p-3 rounded-xl bg-primary/8 w-fit group-hover:bg-primary/14 transition-colors">
                                                    <PointIcon className="text-primary" size={22} />
                                                </div>
                                                <p className="text-sm font-medium leading-relaxed text-foreground/90">
                                                    {point.text}
                                                </p>
                                            </CardHeader>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Collaborations ───────────────────────────────────── */}
            <section className="py-16 bg-muted/30 border-y border-border/40">
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15 shrink-0 mt-1">
                                <CollabIcon className="text-primary" size={22} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{collaborations.title}</h2>
                                <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                                    {collaborations.description}
                                </p>
                                <Link to="/contact">
                                    <Button variant="outline" size="sm" className="group border-primary/30 hover:bg-primary/8 hover:border-primary/50">
                                        Partner with Us
                                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Future Directions ────────────────────────────────── */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 lg:pl-8">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                    <FutureIcon className="text-primary" size={22} />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{futureDirections.title}</h2>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                                {futureDirections.description}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {futureDirections.points.map((point, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                                    whileHover={{ x: 4 }}
                                >
                                    <Card className="h-full transition-all duration-200 border-border/50 hover:border-primary/40 group bg-card/60">
                                        <CardContent className="pt-5 pb-5 flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                                                {point}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────── */}
            <section className="py-16 bg-muted/30 border-t border-border/50">
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/15">
                                <HelpCircle className="text-primary" size={22} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                            {faq.map((item, idx) => (
                                <AccordionItem
                                    key={idx}
                                    value={`item-${idx}`}
                                    className="border border-border/60 rounded-xl px-5 bg-background/60 hover:border-primary/30 transition-colors"
                                >
                                    <AccordionTrigger className="text-base font-medium hover:text-primary transition-colors py-4 hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
