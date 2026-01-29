import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                category: 'general'
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const contactMethods = [
        {
            icon: <Phone className="h-6 w-6" />,
            title: 'Phone Support',
            description: 'Speak directly with our support team',
            contact: '+1 (555) 123-4567',
            availability: 'Mon-Fri, 9AM-6PM EST'
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: 'Email Support',
            description: 'Send us an email and we\'ll respond quickly',
            contact: 'support@ordertrack.com',
            availability: '24/7 Response'
        },
        {
            icon: <MessageCircle className="h-6 w-6" />,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            contact: 'Available on website',
            availability: 'Mon-Fri, 8AM-8PM EST'
        }
    ];

    const officeLocations = [
        {
            city: 'New York',
            address: '123 Business Ave, Suite 100',
            zipCode: 'New York, NY 10001',
            phone: '+1 (555) 123-4567'
        },
        {
            city: 'San Francisco',
            address: '456 Tech Street, Floor 5',
            zipCode: 'San Francisco, CA 94105',
            phone: '+1 (555) 987-6543'
        },
        {
            city: 'Chicago',
            address: '789 Commerce Blvd, Suite 200',
            zipCode: 'Chicago, IL 60601',
            phone: '+1 (555) 456-7890'
        }
    ];

    const categories = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing & Payments' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'feedback', label: 'Feedback' }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-linear-to-br from-primary via-primary/80 to-secondary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to our support team
                        and we'll get back to you as soon as possible.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Contact Methods */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {contactMethods.map((method, index) => (
                        <div key={index} className="bg-card rounded-xl shadow-sm border border-border p-6 text-center hover:shadow-lg transition-shadow duration-300">
                            <div className="text-primary mb-4 flex justify-center">
                                {method.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-text mb-2">
                                {method.title}
                            </h3>
                            <p className="text-text/70 mb-3">
                                {method.description}
                            </p>
                            <p className="font-medium text-text mb-1">
                                {method.contact}
                            </p>
                            <p className="text-sm text-gray-500">
                                {method.availability}
                            </p>
                        </div>
                    ))}\n                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-text mb-2">
                                Send us a Message
                            </h2>
                            <p className="text-text/70">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-text mb-2">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-3 border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block w-full px-3 py-3 border border-border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-background text-text"
                                    placeholder="Please describe your inquiry in detail..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Office Locations & Additional Info */}
                    <div className="space-y-8">
                        {/* Office Locations */}
                        <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                            <h2 className="text-2xl font-bold text-text mb-6">
                                Our Offices
                            </h2>
                            <div className="space-y-6">
                                {officeLocations.map((office, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-semibold text-text">
                                                {office.city}
                                            </h3>
                                            <p className="text-text/70 text-sm">
                                                {office.address}
                                            </p>
                                            <p className="text-text/70 text-sm">
                                                {office.zipCode}
                                            </p>
                                            <p className="text-text/70 text-sm mt-1">
                                                📞 {office.phone}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                            <h2 className="text-2xl font-bold text-text mb-6 flex items-center">
                                <Clock className="h-6 w-6 mr-2 text-primary" />
                                Business Hours
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-text/70">Monday - Friday</span>
                                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text/70">Saturday</span>
                                    <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text/70">Sunday</span>
                                    <span className="font-medium">Closed</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                                <div className="flex items-center">
                                    <Headphones className="h-5 w-5 text-primary mr-2" />
                                    <span className="text-sm font-medium text-primary-dark">
                                        24/7 Emergency Support Available
                                    </span>
                                </div>
                                <p className="text-sm text-primary mt-1">
                                    For urgent delivery issues, call our emergency hotline: +1 (555) 911-HELP
                                </p>
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <div className="bg-linear-to-r from-primary to-secondary rounded-xl p-8 text-white">
                            <h2 className="text-xl font-bold mb-2">
                                Need Quick Answers?
                            </h2>
                            <p className="mb-4 opacity-90">
                                Check out our FAQ section for instant answers to common questions.
                            </p>
                            <button className="bg-card text-primary px-4 py-2 rounded-lg font-medium hover:bg-background transition-colors">
                                View FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;