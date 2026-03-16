import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrainLabsHorizontalLogo } from '@/components/ui/BrainLabsLogo';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Projects', path: '/projects' },
        { label: 'Team', path: '/team' },
        { label: 'Publications', path: '/publications' },
        { label: 'Events', path: '/events' },
        { label: 'Blog', path: '/blog' },
        { label: 'About', path: '/about' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20"> 
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-1 group"> 
                        <BrainLabsHorizontalLogo width={220} height={55} className="group-hover:opacity-80 transition-opacity" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-all relative group ${isActive(link.path)
                                    ? 'text-primary'
                                    : 'text-foreground/70 hover:text-primary'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-[20px] left-0 right-0 h-0.5 bg-primary" />
                                )}
                                <span className="absolute -bottom-[20px] left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
                            </Link>
                        ))}
                        <Link to="/contact">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border/50">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-medium transition-colors py-2 ${isActive(link.path)
                                        ? 'text-primary'
                                        : 'text-foreground/70 hover:text-primary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link to="/contact" onClick={() => setIsOpen(false)}>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
