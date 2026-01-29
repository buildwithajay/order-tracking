import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { LogOut, Package, User, LayoutDashboard, Home, Info, Search, Menu, X, ShoppingBag, Truck, ClipboardList, List } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';


const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const userRoles = Array.isArray(user?.roles) ? user.roles : [user?.roles];
    const isAdmin = userRoles.includes('Admin');
    const isManager = userRoles.includes('Manager') || userRoles.includes('Admin');
    const isDelivery = userRoles.includes('DeliveryPerson');
    const isCustomer = userRoles.includes('User') || (!isManager && !isDelivery && !isAdmin);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    const navigation = [
        { name: 'Home', href: '/', icon: Home, public: true },
        { name: 'Track Order', href: '/track', icon: Search, public: true },
        { name: 'About', href: '/about', icon: Info, public: true }
    ];

    const userNavigation = [
        ...(user ? [{ name: 'Profile', href: '/profile', icon: User }] : []),
        ...(isCustomer ? [
            { name: 'New Order', href: '/create-order', icon: ShoppingBag },
            { name: 'My Orders', href: '/my-orders', icon: List }
        ] : []),
        ...(isAdmin ? [
            { name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }
        ] : []),
        ...(isManager ? [
            { name: 'Manager Dashboard', href: '/manager/dashboard', icon: LayoutDashboard }
        ] : []),
        ...(isDelivery ? [
            { name: 'Delivery Dashboard', href: '/delivery/dashboard', icon: LayoutDashboard },

        ] : [])
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <nav className={`${isAuthPage ? 'bg-card/95 backdrop-blur-md border-b border-border/20' : 'bg-card/95 backdrop-blur-md border-b border-border'} sticky top-0 z-50 transition-colors`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-r from-primary to-secondary">
                                    <Package className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    OrderTrack
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => {
                                    if (!item.public && !user) return null;
                                    if (item.auth && !user) return null;

                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-text hover:bg-background hover:text-primary'
                                                }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}

                                {user && userNavigation.map((item) => {
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-text hover:bg-background hover:text-primary'
                                                }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6 space-x-4">
                                {/* ThemeToggle removed */}
                                {user ? (
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <User className="h-4 w-4" />
                                            <span className="font-medium text-text">{user.sub}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-1 rounded-lg bg-background px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-border/50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            to="/login"
                                            className="text-sm font-medium text-text hover:text-primary"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-primary/90 hover:to-secondary/90 transition-all"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <div className="flex items-center space-x-2">
                                {/* ThemeToggle removed */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="inline-flex items-center justify-center rounded-lg p-2 text-text hover:bg-background hover:text-primary"
                                >
                                    {mobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-card border-t border-border">
                            {navigation.map((item) => {
                                if (!item.public && !user) return null;
                                if (item.auth && !user) return null;

                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text hover:bg-background hover:text-primary'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}

                            {user && userNavigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block rounded-lg px-3 py-2 text-base font-medium ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text hover:bg-background hover:text-primary'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}

                            {/* Mobile user section */}
                            <div className="border-t border-gray-200 pt-4">
                                {user ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 px-3 py-2 text-sm text-text">
                                            <User className="h-4 w-4" />
                                            <span>{user.sub}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-base font-medium text-text hover:bg-background hover:text-primary"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block rounded-lg px-3 py-2 text-base font-medium text-text hover:bg-background hover:text-primary"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 text-base font-medium text-white"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default MainLayout;
