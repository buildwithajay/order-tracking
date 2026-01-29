import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import { ShoppingCart, Plus, Minus, Trash2, Package } from 'lucide-react';

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

    const updateQuantity = (productId, delta) => {
        setCart(prev => {
            return prev.map(p => {
                if (p.productId === productId) {
                    const newQty = p.quantity + delta;
                    return newQty > 0 ? { ...p, quantity: newQty } : p;
                }
                return p;
            }).filter(p => p.quantity > 0);
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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
                
                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Create Order
                    </h1>
                    <p className="text-gray-600">
                        Select products to add to your order
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* PRODUCTS SECTION */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
                            <span className="text-sm text-gray-600">
                                {products.length} items available
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-lg text-gray-900 leading-tight">
                                                    {product.name}
                                                </h3>
                                                <span className="text-xl font-bold text-primary ml-2">
                                                    ${product.price}
                                                </span>
                                            </div>
                                            
                                            {product.description && (
                                                <p className="text-sm text-gray-600 mb-4">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all font-semibold flex items-center justify-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CART SECTION */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            
                            {/* Cart Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        Current Order
                                    </h3>
                                    {cart.length > 0 && (
                                        <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Cart Content */}
                            <div className="p-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Package className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            Your cart is empty
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            Add items from the menu
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 mb-6">
                                        {cart.map(item => (
                                            <div
                                                key={item.productId}
                                                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        ${item.price} each
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="font-bold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                    
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, -1)}
                                                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                        >
                                                            <Minus className="h-3 w-3 text-gray-700" />
                                                        </button>
                                                        <span className="w-8 text-center font-semibold text-sm text-gray-900">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.productId, 1)}
                                                            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                        >
                                                            <Plus className="h-3 w-3 text-gray-700" />
                                                        </button>
                                                        <button
                                                            onClick={() => removeFromCart(item.productId)}
                                                            className="ml-1 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                        >
                                                            <Trash2 className="h-3 w-3 text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Total & Action */}
                                {cart.length > 0 && (
                                    <div className="space-y-4 pt-4 border-t-2 border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Subtotal</span>
                                            <span className="text-gray-900 font-semibold">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all font-bold text-base shadow-lg"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreateOrder;