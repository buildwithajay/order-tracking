import { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const LiveDemo = () => {
    const [text, setText] = useState('');
    const [stage, setStage] = useState('typing'); // typing, searching, result, reset
    const [progress, setProgress] = useState(0);

    const targetText = 'ORD-2026-001008';

    useEffect(() => {
        let timeout;

        const animate = async () => {
            if (stage === 'typing') {
                if (text.length < targetText.length) {
                    timeout = setTimeout(() => {
                        setText(targetText.slice(0, text.length + 1));
                    }, 100);
                } else {
                    timeout = setTimeout(() => setStage('searching'), 500);
                }
            } else if (stage === 'searching') {
                timeout = setTimeout(() => {
                    setStage('result');
                    // Animate progress bar
                    let p = 0;
                    const interval = setInterval(() => {
                        p += 2;
                        if (p >= 100) {
                            clearInterval(interval);
                            setTimeout(() => setStage('reset'), 3000);
                        }
                        setProgress(p);
                    }, 20);
                }, 800);
            } else if (stage === 'reset') {
                timeout = setTimeout(() => {
                    setText('');
                    setStage('typing');
                    setProgress(0);
                }, 1000);
            }
        };

        animate();

        return () => clearTimeout(timeout);
    }, [text, stage]);

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors">
            {/* Mock Browser Header */}
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">OrderTrack Live Demo</div>
            </div>

            <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Track Your Order</h3>
                    <p className="text-gray-500 dark:text-gray-400">Real-time status updates at your fingertips</p>
                </div>

                {/* Input Area */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={text}
                            readOnly
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Order Number"
                        />
                        {stage === 'typing' && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 animate-blink"></span>
                        )}
                    </div>
                    <button
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${stage === 'searching'
                                ? 'bg-blue-700 scale-95'
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white shadow-lg shadow-blue-500/30 w-full sm:w-auto`}
                    >
                        {stage === 'searching' ? 'Tracking...' : 'Track Order'}
                    </button>
                </div>

                {/* Result Area */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${stage === 'result' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Order #ORD-2026-001008</div>
                                <div className="font-semibold text-lg text-gray-900 dark:text-white">Arriving Today</div>
                            </div>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                <Truck className="w-4 h-4 mr-1" />
                                Out for Delivery
                            </span>
                        </div>

                        {/* Interactive Timeline */}
                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>

                            {/* Animated Line */}
                            <div
                                className="absolute left-6 top-0 w-0.5 bg-green-500 transition-all duration-[3000ms] ease-linear"
                                style={{ height: `${progress}%`, maxHeight: '100%' }}
                            ></div>

                            <div className="space-y-6 relative z-10">
                                {[
                                    { icon: Clock, label: 'Order Placed', time: '10:00 AM' },
                                    { icon: CheckCircle, label: 'Confirmed', time: '10:05 AM' },
                                    { icon: Package, label: 'Packed', time: '11:30 AM' },
                                    { icon: Truck, label: 'Out for Delivery', time: '02:15 PM' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${progress >= (idx * 33) ? 'bg-green-100 dark:bg-green-900/50 border-white dark:border-gray-800 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 border-white dark:border-gray-800 text-gray-400 dark:text-gray-500'
                                            }`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className={`font-medium transition-colors duration-300 ${progress >= (idx * 33) ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                                                {item.label}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{item.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
            `}</style>
        </div>
    );
};

export default LiveDemo;
