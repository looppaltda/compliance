import React, { useState } from 'react';
import { Plus, Archive, CheckSquare, Bell, LogOut, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    email: string;
  };
  onNewCompany?: () => void;
  onShowNotifications?: () => void;
  onShowUserProfile?: () => void;
  onLogout?: () => void;
}

export function Header({ user, onNewCompany, onShowNotifications, onShowUserProfile, onLogout }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">CCJB Compliance</h1>
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={onNewCompany}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Empresa</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Archive className="h-4 w-4" />
            <span>Arquivadas</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <CheckSquare className="h-4 w-4" />
            <span>Tarefas</span>
          </button>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onShowNotifications}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="bg-blue-600 p-2 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button 
                  onClick={() => {
                    onShowUserProfile?.();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 flex flex-wrap gap-2">
        <button 
          onClick={onNewCompany}
          className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Empresa</span>
        </button>
        <button className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-1">
          <Archive className="h-4 w-4" />
          <span>Arquivadas</span>
        </button>
        <button className="bg-green-600 text-white px-3 py-2 rounded-md text-sm flex items-center space-x-1">
          <CheckSquare className="h-4 w-4" />
          <span>Tarefas</span>
        </button>
      </div>
    </header>
  );
}