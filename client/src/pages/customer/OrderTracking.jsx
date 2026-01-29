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

            conn.off("updateOrderStatus");
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-4"></div>
                    <p className="text-gray-600 font-medium text-lg">Loading tracking information...</p>
                </div>
            </div>
        );
    }

    // Cancelled State
    if (currentStep === -2) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-12 text-center">
                            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6">
                                <XCircle className="h-20 w-20 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-3">Order Cancelled</h1>
                            <p className="text-red-100">Order #{orderNumber}</p>
                        </div>
                        <div className="p-12 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                This order has been cancelled
                            </h2>
                            <p className="text-gray-600 mb-8">
                                If you have any questions, please contact our support team.
                            </p>
                            <button className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-lg transition-all">
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
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Card with Current Status */}
                <div className="bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8 sm:p-10 md:p-12">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="text-center sm:text-left">
                                <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wide">Tracking Order</p>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                                    #{orderNumber}
                                </h1>
                                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                                    {currentStepData && (
                                        <>
                                            {(() => {
                                                const Icon = currentStepData.icon;
                                                return <Icon className="h-6 w-6 text-white" />;
                                            })()}
                                            <span className="text-white font-semibold text-base">
                                                {currentStepData.label}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative bg-white/10 backdrop-blur-md rounded-full p-10">
                                    {currentStepData && (
                                        (() => {
                                            const Icon = currentStepData.icon;
                                            return <Icon className="h-16 w-16 text-white" />;
                                        })()
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-white rounded-3xl shadow-md p-8 sm:p-10 md:p-12 border border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
                        Order Progress
                    </h2>

                    {/* Desktop/Tablet Horizontal Progress */}
                    <div className="hidden sm:block">
                        <div className="relative pb-8">
                            {/* Progress Bar Background */}
                            <div className="absolute top-8 left-0 w-full h-2 bg-gray-200 rounded-full" />

                            {/* Active Progress Bar with Animation */}
                            <div
                                className="absolute top-8 left-0 h-2 rounded-full transition-all duration-300 ease-out"
                                style={{
                                    width: `${animatedProgress}%`,
                                    background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
                                }}
                            />

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
                                                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg scale-110'
                                                    : 'bg-gray-200 text-gray-400'
                                                }
                                                ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}
                                            `}>
                                                <Icon className={`${isCompleted ? 'w-7 h-7' : 'w-6 h-6'}`} />
                                            </div>
                                            <div className={`
                                                mt-4 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-gray-500'
                                                }
                                            `}>
                                                {step.label}
                                            </div>
                                            {isCompleted && (
                                                <div className="mt-2 text-xs text-green-600 font-medium">
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
                                                ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg'
                                                : 'bg-gray-200 text-gray-400'
                                            }
                                            ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}
                                        `}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`
                                                text-base font-bold
                                                ${isCompleted ? 'text-primary' : 'text-gray-500'}
                                            `}>
                                                {step.label}
                                            </div>
                                            {isCompleted && (
                                                <div className="text-xs text-green-600 font-medium mt-1">
                                                    ✓ Completed
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={`
                                            ml-7 mt-2 mb-2 w-0.5 h-8 transition-all duration-500
                                            ${index < currentStep
                                                ? 'bg-gradient-to-b from-primary to-secondary'
                                                : 'bg-gray-200'
                                            }
                                        `} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Timeline History */}
                <div className="bg-white rounded-3xl shadow-md p-8 sm:p-10 md:p-12 border border-gray-200">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-primary/10 rounded-full p-3">
                            <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
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
                                                        className="absolute left-6 top-16 -ml-px h-full w-0.5 bg-gray-200"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <div className="relative flex gap-6">
                                                    <div className="flex-shrink-0">
                                                        <div className={`
                                                            h-12 w-12 rounded-full flex items-center justify-center shadow-sm
                                                            ${eventIdx === 0
                                                                ? 'bg-gradient-to-br from-primary to-secondary ring-4 ring-primary/20'
                                                                : 'bg-gray-100'
                                                            }
                                                        `}>
                                                            <Icon className={`h-5 w-5 ${eventIdx === 0 ? 'text-white' : 'text-gray-500'}`} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-gray-50 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                                    <span className={`
                                                                        inline-block px-3 py-1 rounded-full text-xs font-bold
                                                                        ${eventIdx === 0
                                                                            ? 'bg-primary/10 text-primary'
                                                                            : 'bg-gray-200 text-gray-600'
                                                                        }
                                                                    `}>
                                                                        {statusStr}
                                                                    </span>
                                                                    {eventIdx === 0 && (
                                                                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                                                            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                                                            Latest Update
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">
                                                                    Status updated to <span className="font-bold text-gray-900">{statusStr}</span>
                                                                </p>
                                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <User className="h-4 w-4" />
                                                                        <span className="font-medium">{event.fullName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white rounded-lg px-3 py-2 border border-gray-200">
                                                                <Calendar className="h-4 w-4 flex-shrink-0" />
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
                                <li className="text-center py-12 text-gray-500">
                                    No timeline events available
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;