import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/general';
import { CommunicationHubIcon } from '@/components/ui/PageIcons';
import { Mail, Github, Twitter, Send, Linkedin, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';

const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm placeholder:text-muted-foreground/60';

export const Contact = () => {
    return (
        <div className="min-h-screen">
            <SEO
                title="Contact Us"
                description="Get in touch with BrAIN Labs for collaborations, inquiries, or research opportunities."
                keywords={['Contact BrAIN Labs', 'AI Collaboration', 'Research Opportunities', 'Contact Researchers']}
            />

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full mb-6 border border-primary/15 text-sm font-medium">
                            <CommunicationHubIcon size={16} />
                            Get in Touch
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                            Contact{' '}
                            <span className="bg-gradient-to-r from-foreground to-foreground/55 bg-clip-text text-transparent">
                                Us
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
                            Have a question or want to collaborate?<br />We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Contact Methods ──────────────────────────────────── */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto mb-14 rounded-2xl overflow-hidden border border-border/50 h-[380px] shadow-lg"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.19446270836!2d79.972794!3d6.915199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e352ea8f8c8!2sSLIIT!5e0!3m2!1sen!2slk!4v1645856754321!5m2!1sen!2slk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SLIIT Location"
                        />
                    </motion.div>

                    {/* Channel cards */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto mb-16">
                        {[
                            { icon: Mail, title: 'Email', description: 'Send us an email', link: contact.email, label: 'info@brainlabs.inc', color: 'from-brand-email/10 to-brand-email/5' },
                            { icon: Github, title: 'GitHub', description: 'Check out our code', link: contact.github, label: 'View Projects', color: 'from-brand-github/10 to-brand-github/5' },
                            { icon: Linkedin, title: 'LinkedIn', description: 'Connect professionally', link: contact.linkedin, label: 'Follow Us', color: 'from-brand-linkedin/10 to-brand-linkedin/5' },
                            { icon: Twitter, title: 'Twitter', description: 'Follow our updates', link: contact.twitter, label: '@brainlabs', color: 'from-brand-twitter/10 to-brand-twitter/5' },
                        ].map((method, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.6 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full transition-all duration-300 border-border/50 hover:border-primary/40 hover:shadow-lg group text-center bg-card/80">
                                    <CardHeader className="pb-3">
                                        <div className={`mx-auto mb-4 p-4 bg-gradient-to-br ${method.color} rounded-2xl w-fit border border-border/50 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300`}>
                                            <method.icon className="text-foreground group-hover:text-primary transition-colors" size={28} />
                                        </div>
                                        <CardTitle className="text-lg">{method.title}</CardTitle>
                                        <CardDescription className="text-sm">{method.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="outline"
                                            className="w-full group/btn border-border/60 hover:border-primary/40 hover:bg-primary/6 rounded-full text-sm h-9"
                                            asChild
                                        >
                                            <a href={method.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                {method.label}
                                                <Send className="group-hover/btn:translate-x-1 transition-transform" size={13} />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="border-primary/20 shadow-xl bg-card/90 backdrop-blur-sm">
                            <CardHeader className="text-center pb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-4">
                                    <MessageCircle size={22} className="text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-bold tracking-tight">Send us a Message</CardTitle>
                                <CardDescription className="text-base">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-foreground/90">Name</label>
                                            <input id="name" type="text" placeholder="Your name" className={inputClass} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground/90">Email</label>
                                            <input id="email" type="email" placeholder="your@email.com" className={inputClass} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-foreground/90">Subject</label>
                                        <input id="subject" type="text" placeholder="What's this about?" className={inputClass} />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground/90">Message</label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us more..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-12 text-sm font-medium shadow-md hover:shadow-lg transition-all"
                                    >
                                        <Send className="mr-2" size={16} />
                                        Send Message
                                    </Button>
                                </form>

                                {/* Opportunity note */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/15"
                                >
                                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                                        Interested in contributing to our research or joining our team?
                                        We regularly accept interns and PhD candidates —{' '}
                                        <span className="text-foreground font-medium">reach out to discuss opportunities!</span>
                                    </p>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
