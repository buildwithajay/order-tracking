import { useState, useEffect } from 'react';
import { Package, Clock, MapPin, CheckCircle, Truck, Phone, Navigation, AlertCircle } from 'lucide-react';
import { useOrderUpdates } from '../../hooks/useOrderUpdates';
import { toast } from 'react-toastify';
import { apiPrivate } from '../../api/axios';
import { startConnection } from '../../signalR/signalrConnection';
const DeliveryDashboard = () => {
    const { acceptDelivery, markAsDelivered, isConnected } = useOrderUpdates();
    const [availableOrders, setAvailableOrders] = useState([]);
    const [outForDelivery, setOutForDelivery] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [myDeliveries, setMyDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        let conn;

        const connectSignalR = async () => {
            try {
                const token = localStorage.getItem("token");
                conn = await startConnection(token);

                // 1) When new order becomes available
                conn.on("NewAvailableDeliveryOrder", (order) => {
                    setAvailableOrders(prev => {
                        if (prev.some(o => o.orderNumber === order.orderNumber)) return prev;
                        return [order, ...prev];
                    });

                    toast.success(`New order available: ${order.orderNumber}`);
                });



            } catch (err) {
                console.error("SignalR connection failed:", err);
            }
        };

        connectSignalR();

        return () => {
            if (conn) {
                conn.off("NewAvailableDeliveryOrder");

            }
        };
    }, []);

    useEffect(() => {
        fetchOrders();

    }, [myDeliveries]);
    const fetchOrders = async () => {
        try {
            setLoading(true);

            // Fetch available orders from backend
            const availableResponse = await apiPrivate.get("/order/available-for-delivery")
            setAvailableOrders(availableResponse.data)
            const outForDeliveryResponse = await apiPrivate.get("/order/outfordeliveryorders")
            setOutForDelivery(outForDeliveryResponse.data)
            const completedOrderRespone = await apiPrivate.get("/order/delivered-orders-by-delivery-person-id")
            setCompletedOrders(completedOrderRespone.data)
        }

        catch (error) {
            console.error('Error fetching orders:', error);
            setAvailableOrders([]);
            setMyDeliveries([]);
        } finally {
            setLoading(false);
        }
    };


    const handleAcceptDelivery = async (orderNumber) => {
        const success = await acceptDelivery(orderNumber);
        if (success) {
            const order = availableOrders.find(o => o.orderNumber === orderNumber);
            if (order) {
                setAvailableOrders(prev => prev.filter(o => o.orderNumber !== orderNumber));
                setMyDeliveries(prev => [...prev, { ...order, status: 'Assigned', acceptedAt: new Date().toISOString() }]);
                setActiveTab('myDeliveries');
            }
        }
    };

    const handleMarkAsDelivered = async (orderNumber) => {
        const success = await markAsDelivered(orderNumber);
        if (success) {
            setMyDeliveries(prev =>
                prev.map(order =>
                    order.orderNumber === orderNumber
                        ? { ...order, status: 'Delivered', deliveredAt: new Date().toISOString() }
                        : order
                )

            );
            setActiveTab("myDeliveries");
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-secondary/10 text-secondary';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Assigned': return 'bg-primary/10 text-primary';
            case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-secondary/10 text-secondary';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-text">Delivery Dashboard</h1>
                            <p className="mt-2 text-text/70">Manage your deliveries and track performance</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm ${isConnected ? 'bg-secondary/10 text-secondary' : 'bg-red-100 text-red-800'
                                }`}>
                                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-secondary' : 'bg-red-500'
                                    }`}></div>
                                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">Available Orders</p>
                                <p className="text-2xl font-bold text-text">{availableOrders.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <Truck className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">My Deliveries</p>
                                <p className="text-2xl font-bold text-text">{outForDelivery.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                                <CheckCircle className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">Completed Today</p>
                                <p className="text-2xl font-bold text-text">
                                    {completedOrders.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">In Progress</p>
                                <p className="text-2xl font-bold text-text">
                                    {outForDelivery.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-border">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('available')}
                                className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${activeTab === 'available'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text/70 hover:border-border hover:text-text'
                                    }`}
                            >
                                Available Orders ({availableOrders.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('myDeliveries')}
                                className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${activeTab === 'myDeliveries'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text/70 hover:border-border hover:text-text'
                                    }`}
                            >
                                My Deliveries ({outForDelivery.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === 'available' && (
                        <div className="grid gap-6">
                            {availableOrders.length === 0 ? (
                                <div className="rounded-xl bg-card p-12 text-center shadow-sm ring-1 ring-border">
                                    <Package className="mx-auto h-12 w-12 text-text/20" />
                                    <h3 className="mt-4 text-lg font-medium text-text">No available orders</h3>
                                    <p className="mt-2 text-text/70">Check back later for new delivery opportunities.</p>
                                </div>
                            ) : (
                                availableOrders.map((order) => (
                                    <div key={order.orderNumber} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                                        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-semibold text-text">{order.orderNumber}</h3>
                                                    {order.priority && (
                                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(order.priority)}`}>
                                                            {order.priority} Priority
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                                                        <p className="flex items-center text-sm text-gray-600">
                                                            <Phone className="mr-1 h-4 w-4" />
                                                            {order.customerPhone}
                                                        </p>
                                                        <p className="flex items-center text-sm text-text/70">
                                                            <MapPin className="mr-1 h-4 w-4" />
                                                            {order.deliveryAddress}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-text/70">Items: {order.items?.map(item => `${item.name} (${item.quantity})`).join(', ')}</p>
                                                        <p className="text-sm text-text/70">Amount: ${order.totalAmount}</p>
                                                        <p className="flex items-center text-sm text-text/70">
                                                            <Navigation className="mr-1 h-4 w-4" />
                                                            Distance: {order.estimatedDistance}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => handleAcceptDelivery(order.orderNumber)}
                                                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                                                >
                                                    Accept Delivery
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'myDeliveries' && (
                        <div className="grid gap-6">
                            {outForDelivery.length === 0 ? (
                                <div className="rounded-xl bg-card p-12 text-center shadow-sm ring-1 ring-border">
                                    <Truck className="mx-auto h-12 w-12 text-text/20" />
                                    <h3 className="mt-4 text-lg font-medium text-text">No active deliveries</h3>
                                    <p className="mt-2 text-text/70">Accept orders from the available tab to start delivering.</p>
                                </div>
                            ) : (
                                outForDelivery.map((order) => (
                                    <div key={order.id} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
                                        <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-semibold text-text">{order.orderNumber}</h3>
                                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-text/70">Customer: {order.customerName}</p>
                                                        <p className="flex items-center text-sm text-text/70">
                                                            <Phone className="mr-1 h-4 w-4" />
                                                            {order.customerPhone}
                                                        </p>
                                                        <p className="flex items-center text-sm text-text/70">
                                                            <MapPin className="mr-1 h-4 w-4" />
                                                            {order.deliveryAddress}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-text/70">Items: {order.items?.map(item => `${item.name} (${item.quantity})`).join(', ')}</p>
                                                        <p className="text-sm text-text/70">Amount: ${order.totalAmount}</p>
                                                        {order.acceptedAt && (
                                                            <p className="text-sm text-text/70">
                                                                Accepted: {new Date(order.acceptedAt).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="flex flex-col space-y-2">

                                                <button
                                                    onClick={() => handleMarkAsDelivered(order.orderNumber)}
                                                    className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white hover:bg-secondary/90 transition-colors"
                                                >
                                                    Mark as Delivered
                                                </button>


                                                {order.status === 'Delivered' && (
                                                    <div className="flex items-center space-x-2 text-secondary">
                                                        <CheckCircle className="h-5 w-5" />
                                                        <span className="text-sm font-medium">Completed</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeliveryDashboard;