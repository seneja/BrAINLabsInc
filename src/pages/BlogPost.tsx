import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { blogPosts, type BlogPost as BlogPostType } from '@/data/blog';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock, ChevronDown, Quote } from 'lucide-react';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';

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

export const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            const foundPost = blogPosts.find(p => p.id === id);
            setPost(foundPost || null);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [id]);

    const scrollToContent = () => {
        const contentSection = document.getElementById('article-content');
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isLoading && !post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Article not found</h2>
                    <Link to="/blog">
                        <Button variant="outline">Back to Blog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background">
            {post && (
                <SEO 
                    title={`${post.title} | BrAIN Labs Blog`} 
                    description={post.excerpt}
                />
            )}

            {/* ── Hero Section (Two-Column Layout) ────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden min-h-[70vh] flex flex-col justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute left-1/3 top-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute right-10 bottom-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-7xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <Link to="/blog">
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors bg-primary/5 rounded-full px-4">
                                    <ArrowLeft size={16} />
                                    Back to Blog
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left Column: Title & Meta */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                {isLoading ? (
                                    <>
                                        <Skeleton className="h-6 w-32 rounded-full" />
                                        <Skeleton className="h-12 w-full" />
                                        <Skeleton className="h-12 w-3/4" />
                                        <div className="flex gap-4 pt-4">
                                            <Skeleton className="h-5 w-24" />
                                            <Skeleton className="h-5 w-24" />
                                        </div>
                                    </>
                                ) : post && (
                                    <>
                                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-2 border border-primary/15 text-xs font-medium uppercase tracking-wide">
                                            <AcademicPaperIcon size={14} />
                                            Research Perspective
                                        </div>
                                        
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
                                            {post.title}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 rounded-full bg-primary/10">
                                                    <User size={14} className="text-primary" />
                                                </div>
                                                <span className="font-semibold text-foreground/80">{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 rounded-full bg-primary/10">
                                                    <Calendar size={14} className="text-primary" />
                                                </div>
                                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="p-1 rounded-full bg-primary/10">
                                                    <Clock size={14} className="text-primary" />
                                                </div>
                                                <span>8 min read</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Right Column: Featured Image */}
                            <motion.div 
                                variants={itemVariants}
                                className="relative group"
                            >
                                {isLoading ? (
                                    <Skeleton className="aspect-video w-full rounded-2xl md:rounded-3xl shadow-2xl" />
                                ) : post && (
                                    <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-primary/10 bg-muted">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                                    </div>
                                )}
                                {/* Decorative elements */}
                                <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                                <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer hidden md:block"
                    onClick={scrollToContent}
                >
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-2 rounded-full border border-primary/10 text-primary/40 hover:text-primary transition-colors"
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ── Main Content ────────────────────────────────────────── */}
            <section id="article-content" className="py-12 md:py-20 relative px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
                        
                        {/* Article Column */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="space-y-10"
                        >
                            {isLoading ? (
                                <div className="space-y-6">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <div className="pt-8 space-y-4">
                                        <Skeleton className="h-8 w-1/3" />
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </div>
                            ) : post && (
                                <div className="prose prose-invert prose-lg max-w-none">
                                    {/* Abstract/Intro */}
                                    <div className="relative p-6 md:p-8 rounded-2xl bg-primary/[0.03] border border-primary/10 mb-12">
                                        <Quote size={24} className="absolute -top-3 -left-3 text-primary/20 rotate-180" />
                                        <p className="text-lg md:text-xl leading-relaxed text-foreground/90 italic font-medium">
                                            {post.content.split('\n\n')[1]?.trim() || post.excerpt}
                                        </p>
                                    </div>

                                    <div className="text-muted-foreground leading-relaxed space-y-8">
                                        {post.content.split('\n\n').slice(2).map((paragraph, i) => {
                                            const cleanText = paragraph.trim();
                                            if (!cleanText) return null;
                                            
                                            // Robust header detection
                                            if (cleanText.startsWith('###') || cleanText.startsWith('##')) {
                                                const level = cleanText.startsWith('###') ? 3 : 2;
                                                const titleText = cleanText.replace(/^#+\s*/, '').trim();
                                                return level === 3 ? (
                                                    <h3 key={i} className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-primary/40 rounded-full" />
                                                        {titleText}
                                                    </h3>
                                                ) : (
                                                    <h2 key={i} className="text-2xl md:text-3xl font-bold text-foreground mt-16 mb-8">
                                                        {titleText}
                                                    </h2>
                                                );
                                            }
                                            
                                            if (cleanText.startsWith('---')) {
                                                return <hr key={i} className="border-border/40 my-12" />;
                                            }
                                            
                                            return <p key={i} className="text-base md:text-lg">{cleanText}</p>;
                                        })}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Sidebar Column */}
                        <aside className="hidden lg:block sticky top-32 space-y-10">
                            <div className="p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm space-y-8">
                                <div className="space-y-3">
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Research Shared</p>
                                    <Button variant="outline" size="sm" className="w-full rounded-xl gap-2 hover:bg-primary/5 border-primary/10">
                                        <Share2 size={14} />
                                        Share Article
                                    </Button>
                                </div>
                                
                                <div className="space-y-4">
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Key Topics</p>
                                    <div className="flex flex-wrap gap-2">
                                        {post?.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider bg-background/80 border border-border/50 px-3 py-1.5 rounded-full">
                                                <Tag size={10} className="text-primary" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl border border-primary/10 bg-primary/[0.02] space-y-4">
                                <p className="text-[11px] font-bold text-primary uppercase tracking-widest">Lab Perspective</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    This article presents the current BrAIN Labs research perspective on the evolving landscape of brain-inspired intelligence.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* ── Read More Link ──────────────────────────────────────── */}
            <section className="py-20 border-t border-border/40">
                <div className="container mx-auto px-4 text-center">
                    <Link to="/blog">
                        <Button variant="ghost" className="gap-2 text-primary hover:bg-primary/5 rounded-full px-8 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Blog Feed
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
