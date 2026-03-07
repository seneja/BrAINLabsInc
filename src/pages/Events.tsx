import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pastEvents, upcomingEvents, eventResources } from '@/data/events';
import { WorkshopCalendarIcon } from '@/components/ui/PageIcons';
import { ExternalLink, MapPin, Clock } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';

export const Events = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Events & Workshops"
                description="Join BrAIN Labs for workshops, seminars, and collaborative events exploring the latest in AI and neuroscience."
                keywords={['AI Workshops', 'Research Seminars', 'BrAIN Labs Events', 'Neuroscience Conferences']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute right-10 top-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl lg:pl-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3 py-1.5 rounded-full mb-5 border border-primary/15 text-xs font-medium uppercase tracking-wide">
                            <WorkshopCalendarIcon size={14} />
                            Events & Workshops
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
                            Events &{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Workshops
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Join us for workshops, seminars, and collaborative events exploring the latest in AI research.
                        </p>

                        {/* Stats row */}
                        <div className="mt-6 flex items-center gap-6">
                            {upcomingEvents.length > 0 && (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-primary">{upcomingEvents.length}</span>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Upcoming</span>
                                    </div>
                                    <div className="w-px h-6 bg-border" />
                                </>
                            )}
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">{pastEvents.length}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Past Events</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Upcoming Events ──────────────────────────────────── */}
            {upcomingEvents.length > 0 && (
                <section className="py-10 md:py-14">
                    <div className="container mx-auto px-4 lg:pl-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">Upcoming Events</h2>
                            </div>
                            <p className="text-sm text-muted-foreground ml-5">Don't miss our upcoming workshops and seminars.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
                            {upcomingEvents.map((event, idx) => (
                                <EventCard key={idx} event={event} index={idx} upcoming />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Past Events ──────────────────────────────────────── */}
            <section className={`py-10 md:py-14 ${upcomingEvents.length > 0 ? 'border-t border-border/40 bg-muted/20' : ''}`}>
                <div className="container mx-auto px-4 lg:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Past Events</h2>
                        </div>
                        <p className="text-sm text-muted-foreground ml-5">Explore our previous workshops and resources.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
                        {pastEvents.map((event, idx) => (
                            <EventCard key={idx} event={event} index={idx} />
                        ))}
                    </div>

                    {/* Resources CTA */}
                    {eventResources && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 max-w-2xl"
                        >
                            <Card className="bg-gradient-to-br from-primary/8 to-primary/4 border-primary/20 hover:border-primary/35 transition-colors">
                                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                    <div className="space-y-1.5">
                                        <h3 className="font-semibold text-foreground flex items-center gap-2.5">
                                            <div className="p-1.5 bg-primary/15 rounded-lg">
                                                <ExternalLink size={14} className="text-primary" />
                                            </div>
                                            {eventResources.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                                            {eventResources.description}
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm" className="shrink-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50 rounded-full px-5" asChild>
                                        <a href={eventResources.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            Access Resources
                                            <ExternalLink size={12} />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

const EventCard = ({ event, index, upcoming = false }: {
    event: typeof pastEvents[0],
    index: number,
    upcoming?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.09, duration: 0.5 }}
            whileHover={{ y: -4 }}
        >
            <Card className={`h-full transition-all duration-300 group flex flex-col hover:shadow-md ${upcoming ? 'border-primary/30 bg-primary/4 hover:border-primary/50' : 'border-border/50 bg-card/80 hover:border-primary/30'}`}>
                <CardHeader className="pb-3 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <Badge
                            variant="secondary"
                            className={`text-[10px] px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-full ${upcoming ? 'bg-primary/15 text-primary border border-primary/25' : 'bg-muted text-muted-foreground'}`}
                        >
                            {event.type || 'Event'}
                        </Badge>
                        {upcoming && (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">
                                    Upcoming
                                </Badge>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <CardTitle className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                            {event.title}
                        </CardTitle>
                        <CardDescription className="flex items-start gap-2 text-sm">
                            <MapPin size={13} className="shrink-0 text-muted-foreground mt-0.5" />
                            <span>{event.description}</span>
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="pt-0 mt-auto">
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Clock size={13} className="text-primary/60" />
                            {event.date}
                        </div>

                        {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group/link transition-colors"
                            >
                                View Details
                                <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
