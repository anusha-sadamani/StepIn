import React, { useState } from 'react';
import { Home, Users, BookOpen, UserCircle, LogOut, Menu, PlusCircle } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  const menuItems = [
    { path: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/about', icon: <Users size={20} />, label: 'About' },
    { path: '/create-program', icon: <PlusCircle size={20} />, label: 'Create Program' },
    { path: '/programs', icon: <BookOpen size={20} />, label: 'Programs' },
    { path: '/profile', icon: <UserCircle size={20} />, label: 'Profile' },
  ];

  return (
    <div className={`flex flex-col fixed left-0 top-0 bottom-0 ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white border-r border-red-100 shadow-lg`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-red-100">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-red-900">Council Portal</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-red-900 hover:bg-red-50 transition-colors duration-200"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => console.log(`Navigating to ${item.path}`)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
                  ${item.path === '/dashboard'
                    ? 'bg-red-50 text-red-900 font-semibold'
                    : 'text-red-800 hover:bg-red-50 hover:text-red-900'
                  } group`}
              >
                <span className="transform transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-red-100">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 
            transition-all duration-200 hover:text-red-900 group
            ${isCollapsed ? 'justify-center' : ''}`}
        >
          <span className="transform transition-transform duration-200 group-hover:scale-110">
            <LogOut size={20} />
          </span>
          {!isCollapsed && (
            <span className="ml-3 font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
