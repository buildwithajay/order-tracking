import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Package, Truck, Clock, Shield, MapPin, Star, ArrowRight, CheckCircle } from 'lucide-react';
import LiveDemo from '../components/LiveDemo';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section with Live Demo Side by Side */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">
            
            {/* Left: Hero Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Track your orders,<br />
                <span className="text-yellow-300">stress-free</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Real-time tracking that actually works. Know exactly where your package is, every step of the way.
              </p>

              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/track"
                      className="inline-flex items-center bg-white/10 text-white px-8 py-4 rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors backdrop-blur-sm"
                    >
                      Track a Package
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right: Live Demo in Ultra-Realistic Mobile View */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[375px]">
                {/* iPhone-style Frame */}
                <div className="relative bg-black rounded-[3.5rem] p-3 shadow-2xl">
                  {/* Screen Container */}
                  <div className="bg-white rounded-[3rem] overflow-hidden relative">
                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-10 flex items-center justify-center">
                      <div className="w-[60px] h-[6px] bg-gray-900 rounded-full"></div>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="bg-white px-8 pt-10 pb-2 flex items-center justify-between text-[11px] font-semibold relative z-0">
                      <span className="text-gray-900">9:41</span>
                      <div className="flex items-center gap-1.5">
                        {/* Signal Icon */}
                        <svg className="w-4 h-3" viewBox="0 0 16 12" fill="none">
                          <path d="M0 8h2v4H0V8zm4-3h2v7H4V5zm4-3h2v10H8V2zm4 1h2v9h-2V3z" fill="currentColor" className="text-gray-900"/>
                        </svg>
                        {/* WiFi Icon */}
                        <svg className="w-4 h-3.5" viewBox="0 0 16 14" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 3C5.2 3 2.7 4.1 1 6l1.4 1.4c1.3-1.5 3.2-2.4 5.6-2.4s4.3.9 5.6 2.4L15 6c-1.7-1.9-4.2-3-7-3zm0 4c-1.7 0-3.2.7-4.2 1.8L5.2 10c.7-.8 1.7-1.2 2.8-1.2s2.1.4 2.8 1.2l1.4-1.2C11.2 7.7 9.7 7 8 7zm0 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor" className="text-gray-900"/>
                        </svg>
                        {/* Battery Icon */}
                        <svg className="w-6 h-3" viewBox="0 0 24 12" fill="none">
                          <rect x="1" y="1" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1" className="text-gray-900"/>
                          <rect x="2.5" y="2.5" width="15" height="7" rx="1" fill="currentColor" className="text-gray-900"/>
                          <rect x="20" y="3.5" width="3" height="5" rx="1" fill="currentColor" className="text-gray-900"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* App Content - Perfectly Scaled for Mobile */}
                    <div className="bg-white" style={{ 
                      height: '667px', 
                      width: '100%',
                      overflow: 'hidden'
                    }}>
                      {/* Scale wrapper to fit mobile viewport exactly */}
                      <div style={{
                        transform: 'scale(0.95)',
                        transformOrigin: 'top center',
                        width: '105%',
                        marginLeft: '-2.5%'
                      }}>
                        <LiveDemo />
                      </div>
                    </div>

                    {/* Home Indicator Bar */}
                    <div className="bg-white pb-2.5 flex justify-center">
                      <div className="w-[140px] h-[5px] bg-gray-900 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Physical Buttons */}
                  {/* Volume Up */}
                  <div className="absolute -left-[3px] top-[120px] w-[3px] h-[30px] bg-gray-800 rounded-l-full"></div>
                  {/* Volume Down */}
                  <div className="absolute -left-[3px] top-[160px] w-[3px] h-[30px] bg-gray-800 rounded-l-full"></div>
                  {/* Power Button */}
                  <div className="absolute -right-[3px] top-[140px] w-[3px] h-[60px] bg-gray-800 rounded-r-full"></div>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/20 via-yellow-300/10 to-transparent rounded-[4rem] blur-3xl transform scale-110"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Stats - Simplified */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-600">Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">&lt;2min</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - More Natural Layout */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-text/80 max-w-2xl">
              Simple tools that make delivery tracking effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Real-time updates
                </h3>
                <p className="text-text/80">
                  Get instant notifications the moment your package moves. No more guessing games.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Secure tracking
                </h3>
                <p className="text-text/80">
                  Your data is encrypted and protected. We take security seriously.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Accurate locations
                </h3>
                <p className="text-text/80">
                  See exactly where your package is on a map, updated in real-time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Delivery confirmation
                </h3>
                <p className="text-text/80">
                  Get photo proof and signatures when your package arrives safely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Streamlined */}
      <div className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text mb-16 text-center">
            How it works
          </h2>

          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text mb-2">
                  Enter your tracking number
                </h3>
                <p className="text-text/80 text-lg">
                  Just paste in your tracking number from any major carrier
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text mb-2">
                  Watch it move
                </h3>
                <p className="text-text/80 text-lg">
                  Follow your package in real-time as it makes its way to you
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text mb-2">
                  Get delivery confirmation
                </h3>
                <p className="text-text/80 text-lg">
                  Receive instant notification when it arrives at your door
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - Cleaner Design */}
      <div className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-text mb-16 text-center">
            What people are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text mb-6 leading-relaxed">
                "This changed how we handle deliveries. Customers love seeing exactly where their order is."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-text">Sarah Chen</div>
                  <div className="text-sm text-text/70">E-commerce Owner</div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text mb-6 leading-relaxed">
                "Best tracking platform we've tried. Simple, fast, and our team picked it up in minutes."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                  alt="Marcus Johnson"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-text">Marcus Johnson</div>
                  <div className="text-sm text-text/70">Logistics Manager</div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text mb-6 leading-relaxed">
                "Our delivery complaints dropped by 40%. OrderTrack just works."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
                  alt="Emily Rodriguez"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-text">Emily Rodriguez</div>
                  <div className="text-sm text-text/70">Small Business</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Simple and Direct */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join thousands of businesses tracking smarter with OrderTrack
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-primary px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;