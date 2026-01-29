import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { toast } from 'react-toastify';
import { User, Mail, Shield } from 'lucide-react';
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
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-text/70 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-10 text-text/70 font-medium">
          Failed to load profile
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text">User Profile</h1>
          <p className="mt-1 text-sm text-text/70">
            Your account information and settings
          </p>
        </div>

        <div className="px-6 py-8 bg-card rounded-xl border border-border">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-border">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <User className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-secondary rounded-full border-3 border-card shadow-sm"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-text/70 text-sm mt-1 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                {user.email}
              </p>
              <div className="flex items-center mt-3 space-x-2">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-background text-text/80 border border-border"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-background rounded-xl border border-border">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wide mb-2">
                User ID
              </label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-text/70" />
                <span className="text-sm text-text font-mono font-medium">
                  {user.id}
                </span>
              </div>
            </div>

            <div className="p-4 bg-background rounded-xl border border-border">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-text/70" />
                <span className="text-sm text-text font-medium">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="p-4 bg-background rounded-xl border border-border">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wide mb-2">
                First Name
              </label>
              <span className="text-sm text-text font-medium">
                {user.firstName}
              </span>
            </div>

            <div className="p-4 bg-background rounded-xl border border-border">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wide mb-2">
                Last Name
              </label>
              <span className="text-sm text-text font-medium">
                {user.lastName}
              </span>
            </div>
          </div>

          {/* Roles Section */}
          <div className="mb-8 pb-8 border-b border-border">
            <h3 className="text-lg font-semibold text-text mb-4">
              Account Roles
            </h3>
            <div className="space-y-3">
              {user.roles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-text/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-sm">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-text block">
                        {role}
                      </span>
                      <span className="text-xs text-text/60">
                        Active permission
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-secondary rounded-full"></div>
                    <span className="text-sm font-medium text-secondary">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">
              Account Actions
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => toast.info('Profile editing not implemented yet')}
                className="flex-1 sm:flex-none px-6 py-3 bg-text text-background rounded-xl hover:bg-black font-semibold shadow-sm hover:shadow-md transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => toast.info('Password change not implemented yet')}
                className="flex-1 sm:flex-none px-6 py-3 bg-card text-text rounded-xl hover:bg-background font-semibold border border-border hover:border-text/20 transition-all"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
