import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
            { name: 'Blog', href: '#' }
        ],
        services: [
            { name: 'Order Tracking', href: '/track' },
            { name: 'Delivery Services', href: '#' },
            { name: 'API Documentation', href: '#' },
            { name: 'Enterprise Solutions', href: '#' }
        ],
        support: [
            { name: 'Help Center', href: '#' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'FAQ', href: '#' },
            { name: 'Live Chat', href: '#' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'GDPR', href: '#' }
        ]
    };

    const socialLinks = [
        { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
        { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
        { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
        { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' }
    ];

    return (
        <footer className="bg-card text-text border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <Package className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold">OrderTrack</span>
                        </div>
                        <p className="text-text/70 mb-6 leading-relaxed">
                            The most advanced order tracking platform, providing real-time visibility
                            and exceptional delivery experiences for businesses and customers worldwide.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center text-text/70">
                                <Mail className="h-4 w-4 mr-3 text-primary" />
                                <span className="text-sm">support@ordertrack.com</span>
                            </div>
                            <div className="flex items-center text-text/70">
                                <Phone className="h-4 w-4 mr-3 text-primary" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-text/70">
                                <MapPin className="h-4 w-4 mr-3 text-primary" />
                                <span className="text-sm">123 Business Ave, New York, NY 10001</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-text/70 hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-text/70 hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-text/70 hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-text/70 hover:text-primary text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="border-t border-border mt-12 pt-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-text mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-text/70 text-sm">
                                Subscribe to our newsletter for the latest updates and features.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-border mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-text/60 text-sm mb-4 md:mb-0">
                            © {currentYear} OrderTrack. All rights reserved.
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="text-text/60 hover:text-primary transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-border mt-8 pt-8">
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        <div className="text-xs text-text/60 text-center">
                            <div className="font-semibold">SSL SECURED</div>
                            <div>256-bit encryption</div>
                        </div>
                        <div className="text-xs text-text/60 text-center">
                            <div className="font-semibold">GDPR COMPLIANT</div>
                            <div>Data protection</div>
                        </div>
                        <div className="text-xs text-text/60 text-center">
                            <div className="font-semibold">99.9% UPTIME</div>
                            <div>Guaranteed availability</div>
                        </div>
                        <div className="text-xs text-text/60 text-center">
                            <div className="font-semibold">24/7 SUPPORT</div>
                            <div>Always here to help</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;