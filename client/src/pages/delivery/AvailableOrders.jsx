import { useEffect, useState } from 'react';
import { apiPrivate } from '../../api/axios';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { toast } from 'react-toastify';
import { Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AvailableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAvailable();
    }, []);

    const fetchAvailable = async () => {
        try {
            const response = await apiPrivate.get('/order/available-for-delivery');
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            if (error.response?.status === 404) setOrders([]);
            else console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const acceptOrder = async (orderNumber) => {
        try {
            await apiPrivate.put(`/order/${orderNumber}/accept`);
            toast.success("Order Accepted!");
            navigate('/delivery/my-deliveries'); // Redirect to my deliveries
        } catch (error) {
            toast.error("Failed to accept order");
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Jobs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accept orders for delivery</p>
                </div>
                <button
                    onClick={() => navigate('/delivery/my-deliveries')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <Truck className="mr-2 h-4 w-4" />
                    My Active Deliveries
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <Truck className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No jobs available</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Check back later for new delivery requests.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <Card key={order.orderNumber} className="border-l-4 border-l-indigo-500 dark:border-l-indigo-400 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-md mb-2">
                                        Order Request
                                    </span>
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">#{order.orderNumber}</h3>
                                </div>
                                <Badge status={order.orderStatus} />
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <div className="w-8 flex justify-center"><div className="w-2 h-2 bg-gray-300 rounded-full"></div></div>
                                    <span>Pickup Required</span>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button
                                    onClick={() => acceptOrder(order.orderNumber)}
                                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all dark:focus:ring-offset-gray-900 group-hover:scale-[1.02]"
                                >
                                    <Truck className="mr-2 h-4 w-4" />
                                    Accept Delivery
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableOrders;
