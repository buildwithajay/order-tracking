import { Users, Award, Globe, Shield, Zap, Heart } from 'lucide-react';

const About = () => {
    const teamMembers = [
        {
            name: 'Alex Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            bio: 'Visionary leader with 15+ years in logistics and technology.'
        },
        {
            name: 'Sarah Chen',
            role: 'CTO',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
            bio: 'Tech innovator specializing in real-time tracking systems.'
        },
        {
            name: 'Mike Rodriguez',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            bio: 'Operations expert ensuring seamless delivery experiences.'
        },
        {
            name: 'Emily Davis',
            role: 'Head of Customer Success',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
            bio: 'Customer advocate focused on exceptional service delivery.'
        }
    ];

    const values = [
        {
            icon: <Shield className="h-8 w-8" />,
            title: 'Reliability',
            description: 'We ensure your packages are delivered safely and on time, every time.'
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: 'Innovation',
            description: 'Cutting-edge technology powers our real-time tracking and delivery solutions.'
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We go above and beyond for every customer.'
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: 'Global Reach',
            description: 'Connecting businesses and customers worldwide with our extensive network.'
        }
    ];

    const stats = [
        { number: '1M+', label: 'Packages Delivered' },
        { number: '50+', label: 'Cities Covered' },
        { number: '99.9%', label: 'Uptime Guarantee' },
        { number: '24/7', label: 'Customer Support' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-800 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            About OrderTrack
                        </h1>
                        <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            We're revolutionizing the delivery industry with cutting-edge technology, 
                            real-time tracking, and unparalleled customer service.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            To make package delivery transparent, reliable, and effortless for businesses 
                            and customers worldwide through innovative technology and exceptional service.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Transforming Delivery Experience
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Founded in 2020, OrderTrack emerged from a simple idea: delivery tracking 
                                should be as easy as checking your social media. We've built a platform 
                                that provides real-time visibility into every step of the delivery process.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we serve thousands of businesses and millions of customers, 
                                processing over 100,000 deliveries monthly with industry-leading 
                                accuracy and speed.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                                alt="Team collaboration"
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center">
                                <div className="text-indigo-600 mb-4 flex justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600">
                            The passionate people behind OrderTrack
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-indigo-600 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Awards Section */}
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Recognition & Awards
                        </h2>
                        <p className="text-xl text-gray-600">
                            Industry recognition for our innovation and service
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="text-yellow-500 mb-4 flex justify-center">
                                <Award className="h-12 w-12" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Best Logistics Platform 2023
                            </h3>
                            <p className="text-gray-600">
                                TechCrunch Startup Awards
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="text-yellow-500 mb-4 flex justify-center">
                                <Award className="h-12 w-12" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Innovation in Delivery
                            </h3>
                            <p className="text-gray-600">
                                Logistics Excellence Awards
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="text-yellow-500 mb-4 flex justify-center">
                                <Award className="h-12 w-12" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Customer Choice Award
                            </h3>
                            <p className="text-gray-600">
                                E-commerce Excellence
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Join Our Journey?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Whether you're a business looking for reliable delivery solutions or 
                        a talented individual wanting to make an impact, we'd love to hear from you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg">
                            Contact Us
                        </button>
                        <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/20">
                            View Careers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;