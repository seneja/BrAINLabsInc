import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { publications } from '@/data/publications';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';
import { ExternalLink, FileText, Calendar, BookOpen, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/shared/SEO';

export const Publications = () => {
    // Group by year
    const publicationsByYear = publications.reduce((acc, pub) => {
        if (!acc[pub.year]) acc[pub.year] = [];
        acc[pub.year].push(pub);
        return acc;
    }, {} as Record<number, typeof publications>);

    const years = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a));

    // Global citation index (latest year first, latest pub first within year = [1], [2]…)
    let citationCounter = 0;
    const citationMap = new Map<string, number>();
    years.forEach(year => {
        publicationsByYear[Number(year)].forEach(pub => {
            citationCounter++;
            citationMap.set(pub.title, citationCounter);
        });
    });

    return (
        <div className="min-h-screen">
            <SEO
                title="Publications"
                description="Browse peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
                keywords={['Research Publications', 'AI Papers', 'Neuroscience Research', 'Academic Publications']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute left-1/3 top-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl lg:pl-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
                            <AcademicPaperIcon size={14} />
                            Publications
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Research{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Output
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers.
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <Quote size={14} className="text-primary/60" />
                            <span><span className="font-semibold text-foreground">{publications.length}</span> publications across {years.length} year{years.length !== 1 ? 's' : ''}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Publications by Year ─────────────────────────────── */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 lg:pl-8">
                    <div className="max-w-4xl space-y-14">
                        {years.map((year, yearIdx) => (
                            <motion.div
                                key={year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: yearIdx * 0.1, duration: 0.6 }}
                                className="space-y-5"
                            >
                                {/* Year Header */}
                                <div className="flex items-center gap-4 sticky top-20 z-10 bg-background/80 backdrop-blur-sm py-2 -mx-2 px-2 rounded-lg">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/15">
                                            <Calendar size={16} className="text-primary" />
                                        </div>
                                        <span className="text-primary font-bold text-2xl tracking-tight">{year}</span>
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-border/80 to-transparent" />
                                    <Badge variant="secondary" className="bg-primary/8 text-primary border border-primary/15 text-[10px] font-semibold rounded-full px-2.5 tabular-nums">
                                        {publicationsByYear[Number(year)].length} paper{publicationsByYear[Number(year)].length !== 1 ? 's' : ''}
                                    </Badge>
                                </div>

                                {/* Publications */}
                                <div className="space-y-4">
                                    {publicationsByYear[Number(year)].map((pub, idx) => {
                                        const citeNum = citationMap.get(pub.title) ?? 0;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                                whileHover={{ x: 3 }}
                                            >
                                                <Card className="transition-all duration-300 border-border/50 hover:border-primary/30 hover:shadow-md group bg-card/80">
                                                    <CardContent className="p-5 md:p-6">
                                                        <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start">
                                                            {/* Citation number */}
                                                            <div className="hidden md:flex shrink-0 w-9 h-9 items-center justify-center rounded-xl bg-primary/8 border border-primary/15 text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                                                                {citeNum}
                                                            </div>

                                                            <div className="flex-1 space-y-3 min-w-0">
                                                                <div>
                                                                    <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors mb-2">
                                                                        {pub.title}
                                                                    </h3>
                                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                                        {pub.authors}
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-wrap items-center gap-3">
                                                                    <Badge variant="outline" className="font-medium border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors rounded-full">
                                                                        <BookOpen size={11} className="mr-1.5" />
                                                                        {pub.venue}
                                                                    </Badge>
                                                                    {pub.doi && (
                                                                        <span className="text-muted-foreground font-mono text-[11px] opacity-60">
                                                                            DOI: {pub.doi}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {pub.link && (
                                                                <div className="shrink-0">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="group/btn text-muted-foreground hover:text-primary hover:bg-primary/8 rounded-lg h-8 px-3"
                                                                        asChild
                                                                    >
                                                                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                                                                            <FileText size={13} />
                                                                            <span className="text-xs font-medium">View</span>
                                                                            <ExternalLink className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" size={11} />
                                                                        </a>
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
