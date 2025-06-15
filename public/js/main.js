// Main application functionality

class MainApp {
    constructor() {
        this.userDropdown = document.getElementById('userDropdown');
        this.userBtn = document.getElementById('userBtn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadData();
        this.updateStats();
        this.updateTaskColumns();
        this.initializeLucideIcons();
    }
    
    bindEvents() {
        // User dropdown toggle
        if (this.userBtn) {
            this.userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleUserDropdown();
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                this.closeUserDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeUserDropdown();
            }
        });
    }
    
    loadData() {
        // Load companies from storage
        const savedCompanies = loadFromStorage('companies');
        if (savedCompanies) {
            appState.companies = savedCompanies;
        }
        
        // Load notifications from storage
        const savedNotifications = loadFromStorage('notifications');
        if (savedNotifications) {
            appState.notifications = savedNotifications;
        }
    }
    
    toggleUserDropdown() {
        if (this.userDropdown) {
            this.userDropdown.classList.toggle('show');
        }
    }
    
    closeUserDropdown() {
        if (this.userDropdown) {
            this.userDropdown.classList.remove('show');
        }
    }
    
    updateStats() {
        const totalCompanies = appState.companies.length;
        const inProgress = appState.companies.filter(c => c.status === 'progress').length;
        const completed = appState.companies.filter(c => c.status === 'completed').length;
        
        // Update stats display
        const totalElement = document.getElementById('totalCompanies');
        const progressElement = document.getElementById('inProgress');
        const completedElement = document.getElementById('completed');
        
        if (totalElement) totalElement.textContent = totalCompanies;
        if (progressElement) progressElement.textContent = inProgress;
        if (completedElement) completedElement.textContent = completed;
    }
    
    updateTaskColumns() {
        this.updateTaskColumn('todo', 'todoTasks', 'todoCount');
        this.updateTaskColumn('progress', 'progressTasks', 'progressCount');
        this.updateTaskColumn('completed', 'completedTasks', 'completedCount');
    }
    
    updateTaskColumn(status, containerId, countId) {
        const companies = appState.companies.filter(c => c.status === status);
        const container = document.getElementById(containerId);
        const countElement = document.getElementById(countId);
        
        if (countElement) {
            countElement.textContent = `(${companies.length})`;
        }
        
        if (!container) return;
        
        if (companies.length === 0) {
            container.innerHTML = `
                <div class="empty-tasks">
                    <p>Nenhuma tarefa no momento</p>
                </div>
            `;
        } else {
            const taskName = this.getTaskNameByStatus(status);
            container.innerHTML = companies.map(company => `
                <div class="task-item" data-company-id="${company.id}">
                    <h4 class="task-name">${taskName}</h4>
                    <p class="task-company">${company.name}</p>
                </div>
            `).join('');
        }
    }
    
    getTaskNameByStatus(status) {
        const taskNames = {
            todo: 'Análise de Compliance',
            progress: 'Documentação em Andamento',
            completed: 'Compliance Aprovado'
        };
        
        return taskNames[status] || 'Tarefa';
    }
    
    initializeLucideIcons() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize main app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Create main app instance
    window.mainApp = new MainApp();
});

// Handle page visibility change to update timestamps
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.notificationManager) {
        window.notificationManager.renderNotifications();
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Handle any responsive adjustments here
    console.log('Window resized');
}, 250));