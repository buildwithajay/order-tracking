import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/Card';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiPrivate.get('/product');
            setProducts(response.data.filter(p => p.isAvailable));
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(p => p.productId === product.id);
            if (existing) {
                return prev.map(p => p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p);
            }
            return [...prev, { productId: product.id, quantity: 1, name: product.name, price: product.price }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(p => p.productId !== productId));
    };

    const handleSubmit = async () => {
        if (cart.length === 0) return;

        try {
            const orderRequest = {
                items: cart.map(i => ({ productId: i.productId, quantity: i.quantity }))
            };

            const response = await apiPrivate.post('/order', orderRequest);
            toast.success("Order placed successfully!");
            navigate(`/track/${response.data.orderNumber}`);
        } catch (error) {
            toast.error("Failed to place order.");
            console.error(error);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (loading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    return (
    <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* MENU SECTION */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Menu</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.map(product => (
                        <Card
                            key={product.id}
                            className="flex flex-col justify-between hover:shadow-md transition-all"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold text-lg leading-tight">
                                        {product.name}
                                    </h3>
                                    <span className="font-bold text-indigo-600">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                className="mt-4 w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all text-sm font-medium"
                            >
                                Add to Order
                            </button>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CART SECTION */}
            <div className="lg:sticky lg:top-24 h-fit">
                <Card title="Current Order">

                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-6">
                            Your cart is empty.
                        </p>
                    ) : (
                        <ul className="space-y-4 mb-4">
                            {cart.map(item => (
                                <li
                                    key={item.productId}
                                    className="flex justify-between items-center"
                                >
                                    <div>
                                        <div className="font-medium text-sm">
                                            {item.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Qty: {item.quantity}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="text-red-500 text-xs hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* TOTAL + ACTION */}
                    <div className="border-t pt-4 mt-4 space-y-4">
                        <div className="flex justify-between items-center font-bold text-base">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={cart.length === 0}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold"
                        >
                            Place Order
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

};

export default CreateOrder;
