import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { toast } from 'react-toastify';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import Card from '../../components/Card';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiPrivate.get('/account/get-me');
            setUser(response.data);
        } catch (error) {
            toast.error('Failed to load user profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading profile...</div>;
    }

    if (!user) {
        return <div className="text-center py-10">Failed to load profile</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                    <p className="mt-2 text-gray-600">Your account information and settings</p>
                </div>

                <Card>
                    <div className="px-6 py-8">
                        {/* Profile Header */}
                        <div className="flex items-center space-x-6 mb-8">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                                <User className="h-10 w-10 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h2>
                                <p className="text-gray-600">{user.email}</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    {user.roles.map((role, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                        >
                                            <Shield className="h-3 w-3 mr-1" />
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        User ID
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-900 font-mono">{user.id}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-900">{user.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <span className="text-sm text-gray-900">{user.firstName}</span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <span className="text-sm text-gray-900">{user.lastName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Roles Section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Roles</h3>
                            <div className="space-y-3">
                                {user.roles.map((role, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Shield className="h-5 w-5 text-indigo-600" />
                                            <span className="font-medium text-gray-900">{role}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">Active</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => toast.info('Profile editing not implemented yet')}
                                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => toast.info('Password change not implemented yet')}
                                    className="w-full sm:w-auto ml-0 sm:ml-3 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;