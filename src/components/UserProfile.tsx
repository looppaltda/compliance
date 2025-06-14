import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Calendar, Edit, LogOut, Save, X } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
  onClose: () => void;
  onLogout: () => void;
}

export function UserProfile({ user, onClose, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    role: 'Usuário'
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      role: 'Usuário'
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">Perfil do Usuário</h2>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  Usuário
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Informações do Perfil</h3>
                  <p className="text-sm text-gray-600">Detalhes da sua conta no sistema</p>
                </div>

                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <User className="h-4 w-4" />
                          <span className="text-sm font-medium">Nome Completo</span>
                        </div>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <User className="h-4 w-4" />
                          <span className="text-sm font-medium">Função</span>
                        </div>
                        <p className="text-gray-900 font-medium">Usuário</p>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Membro desde</span>
                        </div>
                        <p className="text-gray-900 font-medium">11/06/2025</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Ações da Conta</h4>
                      <div className="space-y-3">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Editar Perfil</span>
                        </button>
                        <button
                          onClick={onLogout}
                          className="w-full flex items-center space-x-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sair da Conta</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Função
                        </label>
                        <select
                          value={editData.role}
                          onChange={(e) => setEditData(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Usuário">Usuário</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Analista">Analista</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancelar</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Salvar Alterações</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}