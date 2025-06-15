// Sample data for the application
const sampleCompanies = [
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

const sampleNotifications = [
    {
        id: '1',
        type: 'warning',
        title: 'Prazo de Compliance Próximo',
        message: 'A empresa ABC Ltda tem prazo de compliance vencendo em 3 dias.',
        timestamp: '2025-01-15T10:30:00Z',
        read: false,
        company: 'ABC Ltda'
    },
    {
        id: '2',
        type: 'success',
        title: 'Compliance Concluído',
        message: 'O processo de compliance da empresa XYZ S/A foi concluído com sucesso.',
        timestamp: '2025-01-15T09:15:00Z',
        read: false,
        company: 'XYZ S/A'
    },
    {
        id: '3',
        type: 'error',
        title: 'Documento Rejeitado',
        message: 'O documento enviado para DEF Comércio foi rejeitado. Verifique os requisitos.',
        timestamp: '2025-01-14T16:45:00Z',
        read: true,
        company: 'DEF Comércio'
    },
    {
        id: '4',
        type: 'info',
        title: 'Nova Regulamentação',
        message: 'Nova regulamentação publicada que pode afetar empresas do setor de tecnologia.',
        timestamp: '2025-01-14T14:20:00Z',
        read: true
    },
    {
        id: '5',
        type: 'warning',
        title: 'Atualização Necessária',
        message: 'A empresa GHI Indústria precisa atualizar seus dados cadastrais.',
        timestamp: '2025-01-13T11:30:00Z',
        read: true,
        company: 'GHI Indústria'
    }
];

// Application state
let appState = {
    isLoggedIn: false,
    user: {
        name: 'Vagner Franco',
        email: 'vagner@ccjb.com.br'
    },
    companies: [...sampleCompanies],
    notifications: [...sampleNotifications]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sampleCompanies, sampleNotifications, appState };
}