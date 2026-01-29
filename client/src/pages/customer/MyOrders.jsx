import { useEffect, useState } from 'react';
import { apiPrivate } from '../../api/axios';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Package, Calendar, DollarSign } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await apiPrivate.get('/order/my-orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            My Orders
                        </h1>
                        <p className="text-gray-600">
                            Track and manage your orders
                        </p>
                    </div>

                    <Link
                        to="/create-order"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all hover:shadow-lg"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Create New Order
                    </Link>
                </div>

                {/* EMPTY STATE */}
                {orders.length === 0 ? (
                    <div className="flex items-center justify-center py-24">
                        <div className="text-center max-w-md">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <ShoppingBag className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                No orders yet
                            </h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Start by creating your first order and track it in real-time.
                            </p>
                            <Link
                                to="/create-order"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all hover:shadow-lg"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Create Your First Order
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Package className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    {orders.length}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">
                                    ${orders.reduce((s, o) => s + o.total_Amount, 0).toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Latest Order</p>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    #{orders[0]?.orderNumber}
                                </p>
                            </div>
                        </div>

                        {/* ORDERS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {orders.map(order => (
                                <div
                                    key={order.orderNumber}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                                >
                                    {/* CARD HEADER */}
                                    <div className="flex items-center justify-between p-5 bg-gray-50 border-b border-gray-200">
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">
                                                Order #{order.orderNumber}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(order.created_At).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <Badge status={order.orderStatus} />
                                    </div>

                                    {/* ITEMS */}
                                    <div className="p-5">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                            Order Items
                                        </p>

                                        <div className="space-y-2.5 max-h-36 overflow-y-auto">
                                            {order.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between items-start gap-3 pb-2.5 border-b border-gray-100 last:border-0"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {item.productName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                                        ${(item.unit_Price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="p-5 bg-gray-50 border-t border-gray-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm font-medium text-gray-600">Total Amount</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ${order.total_Amount.toFixed(2)}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/track/${order.orderNumber}`}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-all"
                                        >
                                            Track Order
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default MyOrders;