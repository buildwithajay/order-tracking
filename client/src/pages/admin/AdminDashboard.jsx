import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Users, Package, UserPlus } from 'lucide-react';
import Card from '../../components/Card';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({ name: '', price: '', isAvailable: true });
    const [roleForm, setRoleForm] = useState({ email: '', role: 'User' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiPrivate.get('/product');
            setProducts(response.data);
            console.log(response.data)
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await apiPrivate.post('/product', {
                name: productForm.name,
                price: parseFloat(productForm.price),
                isAvailable: productForm.isAvailable
            });
            setProducts([...products, response.data]);
            setShowProductModal(false);
            setProductForm({ name: '', price: '', isAvailable: true });
            toast.success('Product created successfully');
        } catch (error) {
            toast.error('Failed to create product');
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await apiPrivate.put(`/product/${editingProduct.id}`, {
                name: productForm.name,
                price: parseFloat(productForm.price),
                isAvailable: productForm.isAvailable
            });
            setProducts(products.map(p => p.id === editingProduct.id ? response.data : p));
            setShowProductModal(false);
            setEditingProduct(null);
            setProductForm({ name: '', price: '', isAvailable: true });
            toast.success('Product updated successfully');
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await apiPrivate.delete(`/product/${id}`);
            setProducts(products.filter(p => p.id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const handleAssignRole = async (e) => {
        e.preventDefault();
        try {
            await apiPrivate.post('/account/assign-role', roleForm);
            setShowRoleModal(false);
            setRoleForm({ email: '', role: 'User' });
            toast.success('Role assigned successfully');
        } catch (error) {
            toast.error('Failed to assign role');
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            price: product.price.toString(),
            isAvailable: product.isAvailable
        });
        setShowProductModal(true);
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setProductForm({ name: '', price: '', isAvailable: true });
        setShowProductModal(true);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text">Admin Dashboard</h1>
                    <p className="mt-2 text-text/70">Manage products and user roles</p>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">Total Products</p>
                                <p className="text-2xl font-bold text-text">{products.length}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                                <Package className="h-6 w-6 text-secondary" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">Available Products</p>
                                <p className="text-2xl font-bold text-text">{products.filter(p => p.isAvailable).length}</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-text/70">User Management</p>
                                <button
                                    onClick={() => setShowRoleModal(true)}
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    Assign Roles
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Products Section */}
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-text">Product Management</h2>
                        <button
                            onClick={openCreateModal}
                            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Product
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-background">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text/60">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text/60">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text/60">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text/60">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-card">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text">
                                            {product.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-text/70">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.isAvailable
                                                    ? 'bg-secondary/10 text-secondary'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {product.isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Product Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-card rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-medium mb-4">
                                {editingProduct ? 'Edit Product' : 'Create Product'}
                            </h3>
                            <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={productForm.isAvailable}
                                            onChange={(e) => setProductForm({ ...productForm, isAvailable: e.target.checked })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm font-medium text-text">Available</span>
                                    </label>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowProductModal(false)}
                                        className="px-4 py-2 text-text border border-border rounded-md hover:bg-background"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                    >
                                        {editingProduct ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Role Assignment Modal */}
                {showRoleModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-card rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-medium mb-4">Assign Role</h3>
                            <form onSubmit={handleAssignRole}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={roleForm.email}
                                        onChange={(e) => setRoleForm({ ...roleForm, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={roleForm.role}
                                        onChange={(e) => setRoleForm({ ...roleForm, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-text"
                                    >
                                        <option value="User">User</option>
                                        <option value="Manager">Manager</option>
                                        <option value="DeliveryPerson">Delivery Person</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowRoleModal(false)}
                                        className="px-4 py-2 text-text border border-border rounded-md hover:bg-background"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                                    >
                                        Assign Role
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;