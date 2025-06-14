import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { TaskColumn } from './components/TaskColumn';
import { Footer } from './components/Footer';
import { CompanyForm } from './components/CompanyForm';
import { LoginPage } from './components/LoginPage';
import { NotificationsPage } from './components/NotificationsPage';
import { UserProfile } from './components/UserProfile';
import { Building2, Clock, CheckCircle, Archive } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to show login
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const user = {
    name: 'Vagner Franco',
    email: 'vagner@ccjb.com.br'
  };

  // Example companies data
  const exampleCompanies = [
    {
      id: '1',
      name: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
      status: 'todo',
      lastUpdate: '2025-01-15'
    },
    {
      id: '2',
      name: 'Inovação Digital S/A',
      cnpj: '98.765.432/0001-10',
      status: 'todo',
      lastUpdate: '2025-01-14'
    },
    {
      id: '3',
      name: 'Consultoria Empresarial ME',
      cnpj: '11.222.333/0001-44',
      status: 'progress',
      lastUpdate: '2025-01-13'
    },
    {
      id: '4',
      name: 'Serviços Integrados EPP',
      cnpj: '55.666.777/0001-88',
      status: 'progress',
      lastUpdate: '2025-01-12'
    },
    {
      id: '5',
      name: 'Desenvolvimento Web Ltda',
      cnpj: '33.444.555/0001-22',
      status: 'completed',
      lastUpdate: '2025-01-11'
    },
    {
      id: '6',
      name: 'Marketing Digital S/A',
      cnpj: '77.888.999/0001-66',
      status: 'completed',
      lastUpdate: '2025-01-10'
    }
  ];

  const todoTasks = exampleCompanies
    .filter(company => company.status === 'todo')
    .map(company => ({
      id: company.id,
      name: 'Análise de Compliance',
      company: company.name
    }));

  const progressTasks = exampleCompanies
    .filter(company => company.status === 'progress')
    .map(company => ({
      id: company.id,
      name: 'Documentação em Andamento',
      company: company.name
    }));

  const completedTasks = exampleCompanies
    .filter(company => company.status === 'completed')
    .map(company => ({
      id: company.id,
      name: 'Compliance Aprovado',
      company: company.name
    }));

  const stats = [
    {
      title: 'Total de Empresas',
      value: exampleCompanies.length,
      icon: Building2,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Em Andamento',
      value: progressTasks.length,
      icon: Clock,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Concluídas',
      value: completedTasks.length,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Arquivadas',
      value: 2,
      icon: Archive,
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  const taskColumns = [
    {
      title: 'A Fazer',
      count: todoTasks.length,
      tasks: todoTasks
    },
    {
      title: 'Em Andamento',
      count: progressTasks.length,
      tasks: progressTasks
    },
    {
      title: 'Concluídas',
      count: completedTasks.length,
      tasks: completedTasks
    }
  ];

  const handleLogin = (email: string, password: string) => {
    // Here you would typically validate credentials with your backend
    console.log('Login attempt:', { email, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserProfile(false);
  };

  const handleSaveCompany = (companyData: any) => {
    console.log('Saving company:', companyData);
    setShowCompanyForm(false);
    // Here you would typically save to your backend
  };

  const handleShowNotifications = () => {
    setShowNotifications(true);
  };

  const handleShowUserProfile = () => {
    setShowUserProfile(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onNewCompany={() => setShowCompanyForm(true)}
        onShowNotifications={handleShowNotifications}
        onShowUserProfile={handleShowUserProfile}
        onLogout={handleLogout}
      />
      
      <main className="px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              bgColor={stat.bgColor}
            />
          ))}
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {taskColumns.map((column, index) => (
            <TaskColumn
              key={index}
              title={column.title}
              count={column.count}
              tasks={column.tasks}
            />
          ))}
        </div>

        <Footer />
      </main>

      {/* Modals */}
      {showCompanyForm && (
        <CompanyForm
          onClose={() => setShowCompanyForm(false)}
          onSave={handleSaveCompany}
        />
      )}

      {showNotifications && (
        <NotificationsPage
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showUserProfile && (
        <UserProfile
          user={user}
          onClose={() => setShowUserProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;