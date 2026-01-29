import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { toast } from 'react-toastify';
import { LogIn, Package, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back!");
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="p-3 bg-linear-to-br from-primary to-secondary rounded-xl shadow-lg">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                            OrderTrack
                        </span>
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-text">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>

            <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card/80 backdrop-blur-sm py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-border transition-colors">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-text">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Sign in
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Demo Accounts */}
                      
                    </form>
                </div>
            </div >
        </div >
    );
};

export default Login;
