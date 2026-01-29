import { useState, useEffect } from 'react';
import { MapPin, Package, Truck, CheckCircle, Clock, Search, Phone, Mail } from 'lucide-react';
import { useOrderUpdates } from '../hooks/useOrderUpdates';
import { apiPrivate } from '../api/axios';
import { getStatusString } from '../utils/orderHelpers';

const OrderTracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { joinOrderGroup } = useOrderUpdates();

    const handleTrackOrder = async () => {
        if (!trackingId.trim()) {
            setError('Please enter a tracking ID');
            return;
        }

        setLoading(true);
        setError('');
        setOrderData(null);
        setOrderHistory([]);

        try {
            // Get order status history from backend
            const response = await apiPrivate.get(`order/${trackingId}/order-status`)


            const historyData = await response.data;
            setOrderHistory(historyData);

            // Track order for updates
            await joinOrderGroup(trackingId);

            // Create order data from history
            if (historyData.length > 0) {
                const latestStatus = historyData[historyData.length - 1];
                setOrderData({
                    orderNumber: trackingId,
                    currentStatus: getStatusString(latestStatus.order_Status),
                    trackingHistory: historyData.map(item => ({
                        status: getStatusString(item.order_Status),
                        timestamp: new Date(item.updated_At).toLocaleString(),
                        updatedBy: item.fullName,
                        completed: true
                    }))
                });
            }
            setError('');

        } catch (error) {
            console.error('Error fetching order:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Confirmed': return 'bg-primary/10 text-primary';
            case 'OutForDelivery': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-secondary/10 text-secondary';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="h-4 w-4" />;
            case 'Confirmed': return <Package className="h-4 w-4" />;
            case 'OutForDelivery': return <Truck className="h-4 w-4" />;
            case 'Delivered': return <CheckCircle className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    };

    const getStatusDisplayName = (status) => {
        switch (status) {
            case 'OutForDelivery': return 'Out for Delivery';
            default: return status;
        }
    };
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Track Your Order
                    </h1>
                    <p className="text-sm sm:text-base text-text/70">
                        Enter your order number to see real-time updates
                    </p>
                </div>

                {/* TRACK INPUT */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-text/70 mb-2">
                                Order Number
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                                    placeholder="e.g. ORD-12345"
                                    className="w-full pl-10 pr-3 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleTrackOrder}
                            disabled={loading}
                            className="sm:self-end px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Tracking…' : 'Track Order'}
                        </button>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* ORDER DETAILS */}
                {orderData && (
                    <div className="space-y-6">

                        {/* STATUS CARD */}
                        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                <h2 className="text-lg font-semibold text-text">
                                    Order Status
                                </h2>

                                <span
                                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(orderData.currentStatus)}`}
                                >
                                    {getStatusIcon(orderData.currentStatus)}
                                    {getStatusDisplayName(orderData.currentStatus)}
                                </span>
                            </div>

                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-text/70">Order Number</span>
                                    <span className="font-medium text-text">{orderData.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text/70">Current Status</span>
                                    <span className="font-medium text-text">
                                        {getStatusDisplayName(orderData.currentStatus)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* TIMELINE */}
                        <div className="bg-card rounded-xl border border-border shadow-sm p-5">
                            <h2 className="text-lg font-semibold text-text mb-5">
                                Order Timeline
                            </h2>

                            <div className="space-y-6">
                                {orderData.trackingHistory.map((event, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-9 h-9 rounded-full flex items-center justify-center ${event.completed
                                                        ? 'bg-secondary/10 text-secondary'
                                                        : 'bg-background text-text/40'
                                                    }`}
                                            >
                                                {getStatusIcon(event.status)}
                                            </div>

                                            {index < orderData.trackingHistory.length - 1 && (
                                                <div className="w-0.5 h-full bg-border mt-1"></div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                                <h3 className="font-medium text-text">
                                                    {getStatusDisplayName(event.status)}
                                                </h3>
                                                <span className="text-xs text-text/60">
                                                    {event.timestamp}
                                                </span>
                                            </div>

                                            {event.updatedBy && (
                                                <p className="text-sm text-text/60 mt-1">
                                                    Updated by {event.updatedBy}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default OrderTracking;