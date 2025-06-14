import React, { useState } from 'react';
import { Building2, Save, X, ArrowLeft } from 'lucide-react';

interface CompanyFormData {
  cnpj: string;
  porte: string;
  tipo: string;
  nome: string;
  estado: string;
  cidade: string;
  endereco: string;
  cnae: string;
  telefone: string;
  email: string;
}

interface CompanyFormProps {
  onClose: () => void;
  onSave: (data: CompanyFormData) => void;
}

export function CompanyForm({ onClose, onSave }: CompanyFormProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    cnpj: '',
    porte: '',
    tipo: '',
    nome: '',
    estado: '',
    cidade: '',
    endereco: '',
    cnae: '',
    telefone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<CompanyFormData>>({});

  const porteOptions = [
    { value: 'MEI', label: 'Microempreendedor Individual (MEI)' },
    { value: 'ME', label: 'Microempresa (ME)' },
    { value: 'EPP', label: 'Empresa de Pequeno Porte (EPP)' },
    { value: 'MEDIO', label: 'Médio Porte' },
    { value: 'GRANDE', label: 'Grande Porte' }
  ];

  const tipoOptions = [
    { value: 'LTDA', label: 'Sociedade Limitada (LTDA)' },
    { value: 'SA', label: 'Sociedade Anônima (S/A)' },
    { value: 'EIRELI', label: 'Empresa Individual (EIRELI)' },
    { value: 'EI', label: 'Empresário Individual (EI)' },
    { value: 'SLU', label: 'Sociedade Limitada Unipessoal (SLU)' }
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const validateForm = () => {
    const newErrors: Partial<CompanyFormData> = {};

    if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.porte) newErrors.porte = 'Porte é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!formData.estado) newErrors.estado = 'Estado é obrigatório';
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.endereco) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.cnae) newErrors.cnae = 'CNAE é obrigatório';
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Nova Empresa</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CNPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNPJ *
              </label>
              <input
                type="text"
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', formatCNPJ(e.target.value))}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.cnpj ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cnpj && <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>}
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Empresa *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Digite o nome da empresa"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
            </div>

            {/* Porte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porte *
              </label>
              <select
                value={formData.porte}
                onChange={(e) => handleInputChange('porte', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.porte ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o porte</option>
                {porteOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.porte && <p className="mt-1 text-sm text-red-600">{errors.porte}</p>}
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.tipo ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o tipo</option>
                {tipoOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.tipo && <p className="mt-1 text-sm text-red-600">{errors.tipo}</p>}
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                value={formData.estado}
                onChange={(e) => handleInputChange('estado', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.estado ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o estado</option>
                {estados.map(estado => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {errors.estado && <p className="mt-1 text-sm text-red-600">{errors.estado}</p>}
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade *
              </label>
              <input
                type="text"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                placeholder="Digite a cidade"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.cidade ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cidade && <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>}
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço *
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                placeholder="Digite o endereço completo"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.endereco ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endereco && <p className="mt-1 text-sm text-red-600">{errors.endereco}</p>}
            </div>

            {/* CNAE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNAE *
              </label>
              <input
                type="text"
                value={formData.cnae}
                onChange={(e) => handleInputChange('cnae', e.target.value)}
                placeholder="0000-0/00"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.cnae ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cnae && <p className="mt-1 text-sm text-red-600">{errors.cnae}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.telefone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="empresa@exemplo.com"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Empresa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}