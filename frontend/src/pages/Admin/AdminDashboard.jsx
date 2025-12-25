import React from 'react';
import { FiShield, FiUsers, FiShoppingBag } from 'react-icons/fi';

const AdminDashboard = () => {
  const loginData = localStorage.getItem('loginData');
  const user = loginData ? JSON.parse(loginData) : {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-amber-50">
      <div className="flex items-center gap-3 mb-6">
        <FiShield className="text-3xl text-amber-500" />
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-amber-200">Centralized admin access without a separate app.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#3b281c] rounded-xl p-4 border border-amber-700/30">
          <FiUsers className="text-2xl text-amber-400 mb-2" />
          <p className="font-semibold">Role</p>
          <p className="text-sm text-amber-200">{user.role || 'admin'}</p>
        </div>
        <div className="bg-[#3b281c] rounded-xl p-4 border border-amber-700/30">
          <FiShoppingBag className="text-2xl text-amber-400 mb-2" />
          <p className="font-semibold">Orders</p>
          <p className="text-sm text-amber-200">Use this space to plug in order management UI.</p>
        </div>
        <div className="bg-[#3b281c] rounded-xl p-4 border border-amber-700/30">
          <FiShield className="text-2xl text-amber-400 mb-2" />
          <p className="font-semibold">Security</p>
          <p className="text-sm text-amber-200">Protected via JWT role-based guard.</p>
        </div>
      </div>

      <div className="bg-[#3b281c] rounded-xl p-6 border border-amber-700/30">
        <h2 className="text-2xl font-semibold mb-3">Next steps</h2>
        <ul className="list-disc list-inside space-y-2 text-amber-200">
          <li>Connect product and order APIs to admin-only screens.</li>
          <li>Add forms for creating or updating menu items.</li>
          <li>Review orders with the new protected routes.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
