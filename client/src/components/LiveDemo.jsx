import { useState, useEffect } from 'react';
import { Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';

const LiveDemo = () => {
  const [step, setStep] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  
  const fullTrackingNumber = 'ORD-2025-001008';

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Step 1: Type tracking number
      if (step === 0) {
        for (let i = 0; i <= fullTrackingNumber.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 150));
          setTrackingNumber(fullTrackingNumber.slice(0, i));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        setStep(1);
      }
      
      // Step 2: Click track button
      if (step === 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setStep(2);
      }
      
      // Step 3: Show timeline
      if (step === 2) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setShowTimeline(true);
      }
    };

    sequence();
  }, [step]);

  // Timeline data
  const timelineSteps = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Order Placed',
      time: '2 days ago',
      location: 'New York, NY',
      status: 'completed'
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Package Processed',
      time: '1 day ago',
      location: 'Distribution Center',
      status: 'completed'
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Out for Delivery',
      time: '2 hours ago',
      location: 'Local Facility',
      status: 'active'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Delivered',
      time: 'Estimated in 3 hours',
      location: 'Your Address',
      status: 'pending'
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header - Mobile Optimized */}
      <div className="px-5 pt-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Track Package</h2>
        <p className="text-xs text-gray-600">Enter your tracking number</p>
      </div>

      {/* Search Input Section */}
      <div className={`px-5 transition-all duration-500 ${showTimeline ? 'opacity-50 scale-95' : 'opacity-100'}`}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={trackingNumber}
              readOnly
              placeholder="Enter tracking number"
              className="flex-1 outline-none text-gray-900 font-medium text-sm"
            />
          </div>
        </div>

        <button
          className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 ${
            step >= 1 
              ? 'bg-gradient-to-r from-primary to-secondary shadow-md scale-[0.98]' 
              : 'bg-gradient-to-r from-primary to-secondary shadow-sm'
          }`}
        >
          {step >= 1 ? 'Tracking...' : 'Track Package'}
        </button>
      </div>

      {/* Timeline Section */}
      {showTimeline && (
        <div className="px-5 mt-6 animate-fadeIn pb-6">
          {/* Delivery Status Card */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 mb-5 text-white shadow-md">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs opacity-90 mb-0.5">Status</p>
                <h3 className="text-lg font-bold">Out for Delivery</h3>
              </div>
              <Truck className="w-7 h-7 animate-bounce" />
            </div>
            <p className="text-xs opacity-90">Estimated: Today, 5:00 PM</p>
          </div>

          {/* Timeline */}
          <div className="space-y-0.5">
            {timelineSteps.map((item, index) => (
              <div
                key={index}
                className={`relative animate-slideIn`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex gap-3">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        item.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : item.status === 'active'
                          ? 'bg-primary text-white ring-4 ring-primary/20'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    {index < timelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-14 ${
                          item.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-5">
                    <h4 className={`font-semibold text-sm mb-0.5 ${
                      item.status === 'active' ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-5 pt-5 border-t border-gray-200">
            <button className="w-full py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors active:scale-[0.98]">
              View Full Details
            </button>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LiveDemo;