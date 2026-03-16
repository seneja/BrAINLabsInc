import { motion, type Variants } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Badge } from '@/components/ui/badge';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const Blog = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Blog | BrAIN Labs"
                description="Explore our latest research perspectives and insights at the intersection of AI and Neuroscience."
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
                            <BookOpen size={14} />
                            Research Blog
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Latest{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Perspectives
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Insights and deep dives into the frontiers of Brain-Inspired Intelligence and Neuromorphic systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Blog Cards ───────────────────────────────────────── */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl"
                    >
                        {blogPosts.map((post) => (
                            <motion.div key={post.id} variants={itemVariants}>
                                <Card className="h-full flex flex-col transition-all duration-300 border-border/50 hover:border-primary/30 hover:shadow-xl group bg-card/80 overflow-hidden">
                                    {/* Card Image */}
                                    <div className="aspect-[16/9] overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <CardContent className="p-6 flex flex-col flex-1 gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase tracking-wider px-2 py-0">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-primary/60" />
                                                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>

                                            <Link to={`/blog/${post.id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="group/btn text-primary hover:text-primary hover:bg-primary/8 rounded-full h-8 px-4 font-semibold text-xs transition-all"
                                                >
                                                    Read More
                                                    <ArrowRight className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" size={14} />
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
