import { useState, useEffect } from 'react';
import { Package, Users, Truck, TrendingUp, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useOrderUpdates } from '../../hooks/useOrderUpdates';
import { apiPrivate } from '../../api/axios';
import { toast } from 'react-toastify';

const ManagerDashboard = () => {
    const { confirmOrder, isConnected } = useOrderUpdates();
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allorders, setAllOrders] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    useEffect(() => {
        fetchPendingOrders();
        FetchTotalOrders();
        FetchDeliveredOrders();
    }, []);

    const fetchPendingOrders = async () => {
        try {
            setLoading(true);
            const response = await apiPrivate.get('/order/pending-orders');
            setPendingOrders(response.data);
        } catch (error) {
            console.error('Error fetching pending orders:', error);
            setPendingOrders([]);
        } finally {
            setLoading(false);
        }
    };
    const FetchTotalOrders = async () => {
        try {
            setLoading(true);
            const response = await apiPrivate.get("/order/getAllOrders")
            setAllOrders(response.data)
        } catch (error) {
            console.error('Error fetching pending orders:', error);
            setPendingOrders([]);
        } finally {
            setLoading(false);
        }
    
    }
    const FetchDeliveredOrders = async () => {
        try{
            setLoading(true);
            const response = await apiPrivate.get("/order/delivered-orders")
            setDelivered(response.data)

        }catch(error){
            console.log("Error fetching delivered orders")
            setDelivered([]);
        }finally{
            setLoading(false);
        }
    }
    const handleConfirmOrder = async (orderNumber) => {
        const success = await confirmOrder(orderNumber);
        if (success) {
            // Remove the confirmed order from pending list
            setPendingOrders(prev => prev.filter(order => order.orderNumber !== orderNumber));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Confirmed': return 'bg-blue-100 text-blue-800';
            case 'OutForDelivery': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                            <p className="mt-2 text-gray-600">Manage pending orders and monitor system status</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                    }`}></div>
                                <span>{isConnected ? 'Real-time Connected' : 'Disconnected'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{allorders.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <Truck className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">In Transit</p>
                                <p className="text-2xl font-bold text-gray-900">-</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Delivered</p>
                                <p className="text-2xl font-bold text-gray-900">{delivered.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Orders Table */}
                <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
                        <p className="text-sm text-gray-600">Orders waiting for confirmation</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Order Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {pendingOrders.map((order) => (
                                    <tr key={order.orderNumber} className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleConfirmOrder(order.orderNumber)}
                                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Confirm Order
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pendingOrders.length === 0 && (
                        <div className="p-12 text-center">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No pending orders</h3>
                            <p className="mt-2 text-gray-600">
                                All orders have been processed or no new orders have been placed.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;