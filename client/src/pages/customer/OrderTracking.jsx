import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiPrivate } from '../../api/axios';
import Card from '../../components/Card';
import { CheckCircle, Clock, Truck, Package, XCircle, User, Calendar, ArrowRight } from 'lucide-react';
import { getStatusString } from '../../utils/orderHelpers';
import { startConnection, getConnection } from '../../signalR/signalrConnection';

const STEPS = [
    { status: 'Pending', label: 'Order Placed', icon: Clock, color: 'amber' },
    { status: 'Confirmed', label: 'Confirmed', icon: CheckCircle, color: 'blue' },
    { status: 'OutForDelivery', label: 'Out for Delivery', icon: Truck, color: 'purple' },
    { status: 'Delivered', label: 'Delivered', icon: Package, color: 'green' },
];

const OrderTracking = () => {
    const { orderNumber } = useParams();
    const [order, setOrder] = useState(null);
    const [history, setHistory] = useState([]);
    const [animatedProgress, setAnimatedProgress] = useState(0);

    const fetchOrderHistory = async () => {
        try {
            const response = await apiPrivate.get(`/order/${orderNumber}/order-status`);
            setHistory(response.data);
            if (response.data.length > 0) {
                const latest = response.data[response.data.length - 1];
                setOrder({ orderStatus: latest.order_Status, orderNumber: latest.orderNumber });
            }
        } catch (error) {
            console.error("Failed to fetch history");
        }
    };

    useEffect(() => {
  

  fetchOrderHistory();

  if (!orderNumber) return;
    const handleStatusUpdated = (event) => {
    setHistory(prev => [
      ...prev,
      {
        order_Status: event.status,
        updated_At: event.updatedAt,
        fullName: event.fullName,
        orderNumber: event.orderNumber
      }
    ]);

    setOrder({
      orderNumber: event.orderNumber,
      orderStatus: event.status
    });
  };

  const connect = async () => {
    const token = localStorage.getItem("token");
    const conn = await startConnection(token);

    conn.off("updateOrderStatus"); // prevent duplicates
    conn.on("updateOrderStatus", handleStatusUpdated);

    await conn.invoke("JoinOrder", orderNumber);
  };

  connect();

  return () => {
    const conn = getConnection();
    conn?.off("updateOrderStatus", handleStatusUpdated);
  };
}, [orderNumber]);



    const getCurrentStepIndex = () => {
        if (!order) return -1;
        const statusStr = getStatusString(order.orderStatus);
        if (statusStr === 'Cancelled') return -2;
        return STEPS.findIndex(s => s.status === statusStr);
    };

    const currentStep = getCurrentStepIndex();

    // Animate progress bar
    useEffect(() => {
        if (currentStep >= 0) {
            const targetProgress = (currentStep / (STEPS.length - 1)) * 100;
            const duration = 1500;
            const steps = 60;
            const increment = targetProgress / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= targetProgress) {
                    setAnimatedProgress(targetProgress);
                    clearInterval(timer);
                } else {
                    setAnimatedProgress(current);
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [currentStep]);

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">Loading tracking information...</p>
                </div>
            </div>
        );
    }

    // Cancelled State
    if (currentStep === -2) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 px-6 py-8 text-center">
                            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                                <XCircle className="h-16 w-16 sm:h-20 sm:w-20 text-white" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Order Cancelled</h1>
                            <p className="text-red-100 text-sm sm:text-base">Order #{orderNumber}</p>
                        </div>
                        <div className="p-8 sm:p-12 text-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                This order has been cancelled
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                If you have any questions, please contact our support team.
                            </p>
                            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentStepData = STEPS[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
                {/* Header Card with Current Status */}
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-6 sm:p-8 md:p-10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-white/80 text-sm sm:text-base font-medium mb-2">Tracking Order</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                    #{orderNumber}
                                </h1>
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
                                    {currentStepData && (
                                        <>
                                            {(() => {
                                                const Icon = currentStepData.icon;
                                                return <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />;
                                            })()}
                                            <span className="text-white font-semibold text-sm sm:text-base">
                                                {currentStepData.label}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="relative bg-white/10 backdrop-blur-md rounded-full p-6 sm:p-8">
                                    {currentStepData && (
                                        (() => {
                                            const Icon = currentStepData.icon;
                                            return <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-white" />;
                                        })()
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
                        Order Progress
                    </h2>

                    {/* Desktop/Tablet Horizontal Progress */}
                    <div className="hidden sm:block">
                        <div className="relative pb-8">
                            {/* Progress Bar Background */}
                            <div className="absolute top-8 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />

                            {/* Active Progress Bar with Animation */}
                            <div
                                className="absolute top-8 left-0 h-2 rounded-full transition-all duration-300 ease-out"
                                style={{
                                    width: `${animatedProgress}%`,
                                    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                                }}
                            >
                                {/* Animated Shimmer Effect */}
                                <div className="absolute inset-0 overflow-hidden rounded-full">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{
                                            animation: 'shimmer 2s infinite',
                                            transform: 'translateX(-100%)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="relative flex justify-between">
                                {STEPS.map((step, index) => {
                                    const Icon = step.icon;
                                    const isCompleted = index <= currentStep;
                                    const isCurrent = index === currentStep;

                                    return (
                                        <div key={step.status} className="flex flex-col items-center" style={{ width: '25%' }}>
                                            <div className={`
                                                w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform
                                                ${isCompleted
                                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg scale-110'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                                }
                                                ${isCurrent ? 'ring-4 ring-indigo-200 dark:ring-indigo-800 animate-pulse' : ''}
                                            `}>
                                                <Icon className={`${isCompleted ? 'w-7 h-7' : 'w-6 h-6'}`} />
                                            </div>
                                            <div className={`
                                                mt-4 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                }
                                            `}>
                                                {step.label}
                                            </div>
                                            {isCompleted && (
                                                <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                                                    ✓ Completed
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Vertical Progress */}
                    <div className="sm:hidden space-y-6">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = index <= currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.status} className="relative">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
                                            ${isCompleted
                                                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                            }
                                            ${isCurrent ? 'ring-4 ring-indigo-200 dark:ring-indigo-800 scale-110' : ''}
                                        `}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`
                                                text-base font-bold
                                                ${isCompleted
                                                    ? 'text-indigo-600 dark:text-indigo-400'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                }
                                            `}>
                                                {step.label}
                                            </div>
                                            {isCompleted && (
                                                <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                                    ✓ Completed
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={`
                                            ml-7 mt-2 mb-2 w-0.5 h-8 transition-all duration-500
                                            ${index < currentStep
                                                ? 'bg-gradient-to-b from-indigo-500 to-purple-500'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                            }
                                        `} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Timeline History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full p-3">
                            <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Order Timeline
                        </h2>
                    </div>

                    <div className="flow-root">
                        <ul className="space-y-6">
                            {history.length > 0 ? (
                                history.slice().reverse().map((event, eventIdx) => {
                                    const statusStr = getStatusString(event.order_Status);
                                    const stepData = STEPS.find(s => s.status === statusStr);
                                    const Icon = stepData?.icon || Clock;

                                    return (
                                        <li key={eventIdx}>
                                            <div className="relative">
                                                {eventIdx !== history.length - 1 && (
                                                    <span
                                                        className="absolute left-6 top-16 -ml-px h-full w-0.5 bg-gradient-to-b from-indigo-200 to-transparent dark:from-indigo-800"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <div className="relative flex gap-4 sm:gap-6">
                                                    <div className="flex-shrink-0">
                                                        <div className={`
                                                            h-12 w-12 rounded-full flex items-center justify-center shadow-lg
                                                            ${eventIdx === 0
                                                                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 ring-4 ring-indigo-100 dark:ring-indigo-900'
                                                                : 'bg-gray-100 dark:bg-gray-700'
                                                            }
                                                        `}>
                                                            <Icon className={`h-5 w-5 ${eventIdx === 0 ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                    <span className={`
                                                                        inline-block px-3 py-1 rounded-full text-xs font-bold
                                                                        ${eventIdx === 0
                                                                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                                                                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                                                        }
                                                                    `}>
                                                                        {statusStr}
                                                                    </span>
                                                                    {eventIdx === 0 && (
                                                                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                                            Latest Update
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
                                                                    Status updated to <span className="font-bold text-gray-900 dark:text-white">{statusStr}</span>
                                                                </p>
                                                                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <User className="h-3.5 w-3.5" />
                                                                        <span className="font-medium">{event.fullName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg px-3 py-2">
                                                                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                                                <time dateTime={event.updated_At} className="whitespace-nowrap">
                                                                    {new Date(event.updated_At).toLocaleString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No timeline events available
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Keyframe Animation for Shimmer */}

        </div>
    );
};

export default OrderTracking;