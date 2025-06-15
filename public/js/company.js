// Company management functionality

class CompanyManager {
    constructor() {
        this.modal = document.getElementById('companyModal');
        this.form = document.getElementById('companyForm');
        this.closeBtn = document.getElementById('closeCompanyModal');
        this.cancelBtn = document.getElementById('cancelCompanyForm');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupFormValidation();
    }
    
    bindEvents() {
        // Open modal buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'newCompanyBtn' || e.target.id === 'mobileNewCompanyBtn') {
                this.openModal();
            }
        });
        
        // Close modal buttons
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close modal on backdrop click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    setupFormValidation() {
        // CNPJ formatting
        const cnpjInput = document.getElementById('cnpj');
        if (cnpjInput) {
            cnpjInput.addEventListener('input', (e) => {
                e.target.value = formatCNPJ(e.target.value);
                this.clearFieldError('cnpj');
            });
        }
        
        // Phone formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = formatPhone(e.target.value);
                this.clearFieldError('phone');
            });
        }
        
        // Clear errors on input
        const fields = ['companyName', 'companySize', 'companyType', 'state', 'city', 'address', 'cnae', 'companyEmail'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.addEventListener('input', () => this.clearFieldError(field));
                input.addEventListener('change', () => this.clearFieldError(field));
            }
        });
    }
    
    openModal() {
        showElement(this.modal);
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = this.form.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
    
    closeModal() {
        hideElement(this.modal);
        document.body.style.overflow = '';
        this.resetForm();
    }
    
    resetForm() {
        if (this.form) {
            this.form.reset();
        }
        
        // Clear all errors
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        // Remove error classes
        const inputElements = this.form.querySelectorAll('input, select');
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
    
    validateForm() {
        let isValid = true;
        const requiredFields = [
            { id: 'cnpj', name: 'CNPJ' },
            { id: 'companyName', name: 'Nome da empresa' },
            { id: 'companySize', name: 'Porte' },
            { id: 'companyType', name: 'Tipo' },
            { id: 'state', name: 'Estado' },
            { id: 'city', name: 'Cidade' },
            { id: 'address', name: 'Endereço' },
            { id: 'cnae', name: 'CNAE' },
            { id: 'phone', name: 'Telefone' },
            { id: 'companyEmail', name: 'Email' }
        ];
        
        // Clear previous errors
        requiredFields.forEach(field => {
            this.clearFieldError(field.id);
        });
        
        // Validate required fields
        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            if (input && !input.value.trim()) {
                this.showFieldError(field.id, `${field.name} é obrigatório`);
                isValid = false;
            }
        });
        
        // Validate email format
        const emailInput = document.getElementById('companyEmail');
        if (emailInput && emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
            this.showFieldError('companyEmail', 'Email inválido');
            isValid = false;
        }
        
        return isValid;
    }
    
    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    clearFieldError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        const formData = new FormData(this.form);
        const companyData = {
            id: generateId(),
            cnpj: formData.get('cnpj') || document.getElementById('cnpj').value,
            name: formData.get('companyName') || document.getElementById('companyName').value,
            size: formData.get('companySize') || document.getElementById('companySize').value,
            type: formData.get('companyType') || document.getElementById('companyType').value,
            state: formData.get('state') || document.getElementById('state').value,
            city: formData.get('city') || document.getElementById('city').value,
            address: formData.get('address') || document.getElementById('address').value,
            cnae: formData.get('cnae') || document.getElementById('cnae').value,
            phone: formData.get('phone') || document.getElementById('phone').value,
            email: formData.get('companyEmail') || document.getElementById('companyEmail').value,
            status: 'todo',
            lastUpdate: new Date().toISOString().split('T')[0]
        };
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Add to app state
            appState.companies.push(companyData);
            
            // Save to storage
            saveToStorage('companies', appState.companies);
            
            // Update UI
            if (window.mainApp) {
                window.mainApp.updateStats();
                window.mainApp.updateTaskColumns();
            }
            
            // Close modal
            this.closeModal();
            
            // Show success message (you could implement a toast notification here)
            console.log('Company saved successfully:', companyData);
            
        } catch (error) {
            console.error('Error saving company:', error);
            // Show error message to user
        }
    }
}

// Initialize company manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.companyManager = new CompanyManager();
});