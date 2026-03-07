import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Mail, Linkedin } from 'lucide-react';
import { contact } from '@/data/general';
import { BrainLabsLogoIcon } from '@/components/ui/BrainLabsLogo';

export const Footer: React.FC = () => {
    return (
        <footer className="relative bg-card/30 backdrop-blur-sm border-t border-border/50 mt-auto overflow-hidden">
            {/* Subtle decorative gradient */}
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/3 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* About */}
                    <div className="md:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
                            <BrainLabsLogoIcon width={32} height={32} className="group-hover:scale-105 transition-transform" />
                            <span className="text-lg font-bold group-hover:text-primary transition-colors">BrAIN Labs</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-md">
                            Research laboratory dedicated to exploring the intersection of AI, ML, and Neuroscience.
                            Developing intelligent systems through brain-inspired approaches.
                        </p>
                        <div className="flex gap-2">
                            <a
                                href={contact.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter size={16} />
                            </a>
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={16} />
                            </a>
                            <a
                                href={contact.email}
                                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2.5">
                            <Link to="/" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Home</Link>
                            <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Projects</Link>
                            <Link to="/team" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Team</Link>
                            <Link to="/publications" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Publications</Link>
                            <Link to="/events" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Events</Link>
                        </div>
                    </div>

                    {/* More */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mb-4">More</h3>
                        <div className="flex flex-col gap-2.5">
                            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">About Us</Link>
                            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary hover:translate-x-0.5 transition-all duration-200">Contact</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} BrAIN Labs. All rights reserved.
                    </p>
                    {/* <div className="flex items-center gap-3">
                        <img
                            src="/assets/images/sliit-uni-logo-black.jpg"
                            alt="SLIIT"
                            className="h-8 opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply dark:mix-blend-screen"
                        />
                    </div> */}
                </div>
            </div>
        </footer>
    );
};
