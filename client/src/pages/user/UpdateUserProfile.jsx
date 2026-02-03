import { useState, useEffect } from 'react';
import { apiPrivate } from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Building2, Landmark, ArrowLeft } from 'lucide-react';

const UpdateUserProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await apiPrivate.get('/account/get-me');
      setUser(res.data);
      // Some profile fields are not returned by get-me; initialise if present
      setForm((f) => ({
        ...f,
        phoneNumber: res.data.phoneNumber || '',
        address: res.data.address || '',
        city: res.data.city || '',
        state: res.data.state || '',
        zipCode: res.data.zipCode || ''
      }));
    } catch (err) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiPrivate.put('/account/update-userinfo', form);
      toast.success('Profile updated');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-text/70 font-medium">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text">Edit Profile</h1>
            <p className="mt-1 text-sm text-text/70">Update contact & address details</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card text-text hover:bg-background border border-border"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>

        <div className="px-6 py-8 bg-card rounded-xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">First Name</label>
                <input
                  disabled
                  value={user?.firstName || ''}
                  className="block w-full pr-3 pl-2 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 bg-background text-text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Last Name</label>
                <input
                  disabled
                  value={user?.lastName || ''}
                  className="block w-full pr-3 py-3 pl-2 border border-border rounded-xl shadow-sm placeholder-gray-400 bg-background text-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Email</label>
              <input
                disabled
                value={user?.email || ''}
                className="block w-full pr-3 pl-2 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 bg-background text-text"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-text mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                  placeholder="+91 98xxxxxx"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text mb-2">Address</label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text resize-none"
                  placeholder="Street, area, house no..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-text mb-2">City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                    placeholder="Kathmandu"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-text mb-2">State</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Landmark className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={form.state}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                    placeholder="Bagmati"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-text mb-2">Zip Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value={form.zipCode}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-card text-text"
                  placeholder="44600"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-4 py-3 rounded-xl bg-card text-text hover:bg-background border border-border"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-sm hover:from-primary/90 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;