import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { intro } from '@/data/general';
import { grants } from '@/data/grants';
import { ArrowRight, Brain, Sparkles, Award, BookOpen, Users } from 'lucide-react';
import { NeuralBrainIcon } from '@/components/ui/PageIcons';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainNetwork } from '@/components/ui/BrainNetwork';
import { SEO } from '@/components/shared/SEO';

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const Home = () => {
    return (
        <div className="relative">
            <SEO />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-10 md:py-0">
                {/* layered background */}
                <div className="absolute inset-0 bg-background" />
                <div className="absolute top-1/4 right-10 w-[36rem] h-[36rem] bg-primary/6 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 left-10 w-[44rem] h-[44rem] bg-foreground/3 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 border border-border bg-card/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                                <NeuralBrainIcon size={14} className="text-primary" />
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">AI Research Laboratory</span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight overflow-visible">
                                <span className="block text-foreground">Brain-Inspired</span>
                                <span className="block text-muted-foreground">Intelligence.</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                                {intro.description}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Link to="/projects">
                                    <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-shadow">
                                        Explore Research
                                        <ArrowRight className="ml-2" size={16} />
                                    </Button>
                                </Link>
                                <Link to="/publications">
                                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm font-medium border-border hover:bg-secondary hover:border-primary/30 transition-colors">
                                        View Publications
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Quick stats row */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-4 border-t border-border/40">
                                {[
                                    { value: '8', label: 'Researchers' },
                                    { value: '7', label: 'Active Projects' },
                                    { value: '3+', label: 'Publications' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-foreground">{s.value}</span>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Hero graphic */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative hidden lg:flex justify-center items-center h-full w-full"
                        >
                            <div className="relative w-full h-[520px] max-w-lg flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 to-transparent rounded-full blur-3xl" />
                                <div className="absolute inset-8 border border-border/20 rounded-full" />
                                <div className="relative z-10 w-full h-full">
                                    <BrainNetwork />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ── Stats ────────────────────────────────────────────── */}
            <section className="py-20 bg-card/60 border-y border-border/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { value: '8', label: 'Researchers', icon: Users, description: 'Multidisciplinary experts' },
                            { value: '7', label: 'Active Projects', icon: Sparkles, description: 'Ongoing research' },
                            { value: '3+', label: 'Publications', icon: BookOpen, description: 'Peer-reviewed papers' },
                            { value: '2+', label: 'Research Areas', icon: Brain, description: 'LLMs & Neuromorphic' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <Card className="h-full border-border/40 hover:border-primary/30 transition-all duration-300 group bg-background/60 hover:bg-background/80 hover:shadow-md">
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
                                        <div className="p-3 rounded-xl bg-primary/8 group-hover:bg-primary/12 transition-colors">
                                            <stat.icon className="text-primary" size={22} />
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-foreground tracking-tight mb-0.5">{stat.value}</div>
                                            <div className="text-xs font-semibold text-foreground/80 uppercase tracking-widest">{stat.label}</div>
                                            <div className="text-[11px] text-muted-foreground/70 mt-1">{stat.description}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Grants ───────────────────────────────────────────── */}
            <section className="py-24 bg-background relative overflow-hidden">
                {/* background accent */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/20">
                            <Award size={15} />
                            <span className="text-xs font-medium uppercase tracking-wide">Funding & Recognition</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Research Grants</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            Supported by leading funding agencies to pioneer the next generation of AI.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {grants.map((grant, idx) => (
                            <motion.div
                                key={grant.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.12, duration: 0.5 }}
                                whileHover={{ y: -3 }}
                            >
                                <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group bg-card/80">
                                    <CardHeader>
                                        <div className="flex justify-between items-start gap-4">
                                            <CardTitle className="text-xl leading-snug group-hover:text-primary transition-colors duration-300">{grant.title}</CardTitle>
                                            <span className="text-xs font-mono bg-primary/8 text-primary px-2.5 py-1 rounded-full border border-primary/20 whitespace-nowrap shrink-0">
                                                {grant.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 pt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span className="text-sm font-semibold text-primary">{grant.agency}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{grant.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-primary/4" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 border border-border/60 bg-card/60 backdrop-blur-sm px-4 py-1.5 rounded-full mb-2">
                            <Sparkles size={14} className="text-primary" />
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Get involved</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                            Ready to explore the<br />
                            <span className="text-muted-foreground">future of AI?</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Discover our cutting-edge research and join us in pushing the boundaries of artificial intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                            <Link to="/team">
                                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all">
                                    Meet the Team
                                    <ArrowRight className="ml-2" size={16} />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm font-medium border-border hover:bg-secondary hover:border-primary/30 transition-colors">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
