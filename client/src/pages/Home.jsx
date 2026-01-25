import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Package, Truck, Clock, Shield, MapPin, Users, TrendingUp, CheckCircle, ArrowRight, Star, Sparkles, Zap } from 'lucide-react';
import LiveDemo from '../components/LiveDemo';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Real-time updates delivered instantly to your device"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Safe",
      description: "End-to-end encryption keeps your data protected"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance whenever you need it"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Insights",
      description: "AI-powered analytics for better delivery predictions"
    }
  ];

  const stats = [
    { number: "1M+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "<2min", label: "Avg Response" },
    { number: "150+", label: "Countries" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Owner",
      content: "OrderTrack transformed our delivery experience. Customers love the real-time updates!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Logistics Manager",
      content: "The best tracking platform we've used. Intuitive, fast, and incredibly reliable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business",
      content: "Our delivery efficiency improved by 40% since switching to OrderTrack. Amazing!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>
        </div>

        <div className="relative px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                New: AI-Powered Delivery Predictions
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Track Orders Like
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Never Before
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Experience the future of package tracking with real-time updates,
              smart notifications, and seamless delivery management.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:scale-105"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:scale-105"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/track"
                    className="inline-flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    Track Package
                  </Link>
                </>
              )}
            </div>

            <div className="mt-12 sm:mt-24">
              <LiveDemo />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-4 animate-bounce opacity-60 sm:left-10">
          <Package className="h-6 w-6 text-yellow-300 sm:h-8 sm:w-8" />
        </div>
        <div className="absolute top-32 right-4 animate-pulse opacity-60 sm:right-20">
          <Truck className="h-8 w-8 text-orange-300 sm:h-10 sm:w-10" />
        </div>
        <div className="absolute bottom-20 left-4 animate-bounce delay-1000 opacity-60 sm:left-20">
          <MapPin className="h-5 w-5 text-blue-300 sm:h-6 sm:w-6" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-10 sm:py-16 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600 sm:text-3xl lg:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300 sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 py-12 sm:py-24 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Why Choose OrderTrack?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Built for modern businesses that demand excellence
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="group relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-blue-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-800 py-16 sm:py-24 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Simple. Fast. Reliable.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Get started in minutes with our streamlined process
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Create Order", desc: "Quick setup with smart defaults" },
              { step: "02", title: "Real-time Tracking", desc: "Live updates every step of the way" },
              { step: "03", title: "Delivered", desc: "Confirmation with proof of delivery" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Loved by thousands
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              See what our customers are saying
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
                <div className="mt-6 flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to revolutionize your deliveries?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Join thousands of businesses already using OrderTrack to delight their customers.
          </p>
          {!user && (
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;