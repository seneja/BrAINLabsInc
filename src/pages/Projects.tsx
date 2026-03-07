import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/projects';
import { ResearchLabIcon } from '@/components/ui/PageIcons';
import * as Icons from 'lucide-react';
import { MessageSquare, Layers } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';

export const Projects = () => {
    const totalProjects = projects.reduce((acc, c) => acc + c.items.length, 0);

    return (
        <div className="min-h-screen">
            <SEO
                title="Research Projects"
                description="Explore our cutting-edge research in Large Language Models (LLMs) and Neuromorphic Computing at BrAIN Labs."
                keywords={['LLM', 'Neuromorphic Computing', 'AI Research', 'BrAIN Labs Projects']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute right-0 bottom-0 w-[32rem] h-[32rem] bg-primary/4 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl lg:pl-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
                            <ResearchLabIcon size={14} />
                            Research Projects
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Our{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Research
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Exploring the frontiers of AI through innovative research in large language models and neuromorphic computing.
                        </p>

                        <div className="mt-6 flex items-center gap-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">{totalProjects}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Active Projects</span>
                            </div>
                            <div className="w-px h-6 bg-border" />
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">{projects.length}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Research Areas</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Projects Content ─────────────────────────────────── */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 lg:pl-8">
                    <Tabs defaultValue="all" className="w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <TabsList className="grid w-full max-w-xs mb-12 h-10 bg-muted/60 rounded-full p-1 grid-cols-3">
                                <TabsTrigger value="all" className="text-xs font-medium rounded-full data-[state=active]:shadow-sm">All</TabsTrigger>
                                <TabsTrigger value="llm" className="text-xs font-medium rounded-full data-[state=active]:shadow-sm">LLMs</TabsTrigger>
                                <TabsTrigger value="neuro" className="text-xs font-medium rounded-full data-[state=active]:shadow-sm">Neuromorphic</TabsTrigger>
                            </TabsList>
                        </motion.div>

                        <TabsContent value="all" className="space-y-16">
                            {projects.map((category, catIdx) => (
                                <CategorySection key={catIdx} category={category} index={catIdx} />
                            ))}
                        </TabsContent>

                        <TabsContent value="llm">
                            <CategorySection category={projects[0]} index={0} />
                        </TabsContent>

                        <TabsContent value="neuro">
                            <CategorySection category={projects[1]} index={0} />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    );
};

const CategorySection = ({ category, index }: { category: typeof projects[0], index: number }) => {
    const IconComponent = (Icons as any)[category.iconName] || MessageSquare;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.7 }}
            className="space-y-6"
        >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/15">
                    <IconComponent className="text-primary" size={22} />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{category.category}</h2>
                        <Badge variant="secondary" className="bg-primary/8 text-primary border border-primary/15 text-[10px] font-semibold uppercase tracking-wide rounded-full px-2.5">
                            <Layers size={10} className="mr-1" />
                            {category.items.length} projects
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 max-w-xl">{category.description}</p>
                </div>
            </div>

            {/* Project Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.items.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08, duration: 0.5 }}
                        whileHover={{ y: -4 }}
                    >
                        <Card className="h-full border-border/50 hover:border-primary/40 hover:shadow-md transition-all duration-300 group bg-card/80">
                            <CardHeader className="pb-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5 group-hover:scale-150 transition-transform" />
                                    <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors leading-snug">
                                        {project.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-sm leading-relaxed pl-4">
                                    {project.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
