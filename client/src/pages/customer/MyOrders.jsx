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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        My Orders
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track and manage your orders
                    </p>
                </div>

                <Link
                    to="/create-order"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition"
                >
                    <ShoppingBag className="h-4 w-4" />
                    Create Order
                </Link>
            </div>

            {/* EMPTY STATE */}
            {orders.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center max-w-sm">
                        <ShoppingBag className="h-16 w-16 mx-auto text-indigo-500 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No orders yet
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                            Start by creating your first order.
                        </p>
                        <Link
                            to="/create-order"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Create Order
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {orders.length}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                            <p className="text-sm text-gray-500">Total Spent</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${orders.reduce((s, o) => s + o.total_Amount, 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                            <p className="text-sm text-gray-500">Latest Order</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                #{orders[0]?.orderNumber}
                            </p>
                        </div>
                    </div>

                    {/* ORDERS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {orders.map(order => (
                            <div
                                key={order.orderNumber}
                                className="bg-white dark:bg-gray-800 rounded-xl border hover:shadow-lg transition"
                            >
                                {/* CARD HEADER */}
                                <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-gray-700/40 rounded-t-xl">
                                    <div>
                                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                            Order #{order.orderNumber}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(order.created_At).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Badge status={order.orderStatus} />
                                </div>

                                {/* ITEMS */}
                                <div className="p-4 space-y-3">
                                    <p className="text-xs font-semibold text-gray-500 uppercase">
                                        Items
                                    </p>

                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between text-sm"
                                            >
                                                <span className="truncate text-gray-700 dark:text-gray-300">
                                                    {item.productName} × {item.quantity}
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    ${(item.unit_Price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="p-4 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-gray-600">Total</span>
                                        <span className="text-xl font-bold text-indigo-600">
                                            ${order.total_Amount.toFixed(2)}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/track/${order.orderNumber}`}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
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