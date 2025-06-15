// Authentication functionality

class AuthManager {
    constructor() {
        this.loginForm = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.togglePasswordBtn = document.getElementById('togglePassword');
        this.loginBtn = document.getElementById('loginBtn');
        this.loginPage = document.getElementById('loginPage');
        this.mainApp = document.getElementById('mainApp');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.checkAuthState();
    }
    
    bindEvents() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (this.togglePasswordBtn) {
            this.togglePasswordBtn.addEventListener('click', () => this.togglePassword());
        }
        
        if (this.emailInput) {
            this.emailInput.addEventListener('input', () => this.clearFieldError('email'));
        }
        
        if (this.passwordInput) {
            this.passwordInput.addEventListener('input', () => this.clearFieldError('password'));
        }
        
        // Logout buttons
        document.addEventListener('click', (e) => {
            if (e.target.id === 'logoutBtn' || 
                e.target.id === 'profileLogoutBtn' || 
                e.target.id === 'profileLogoutBtn2') {
                this.handleLogout();
            }
        });
    }
    
    togglePassword() {
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        
        const icon = this.togglePasswordBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
            initializeLucideIcons();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        // Clear previous errors
        this.clearFieldError('email');
        this.clearFieldError('password');
        
        // Validate email
        const email = this.emailInput.value.trim();
        if (!email) {
            this.showFieldError('email', 'Email é obrigatório');
            isValid = false;
        } else if (!validateEmail(email)) {
            this.showFieldError('email', 'Email inválido');
            isValid = false;
        }
        
        // Validate password
        const password = this.passwordInput.value;
        if (!password) {
            this.showFieldError('password', 'Senha é obrigatória');
            isValid = false;
        } else if (password.length < 6) {
            this.showFieldError('password', 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    clearFieldError(field) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Set loading state
        setButtonLoading(this.loginBtn, true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For demo purposes, accept any valid email/password
            if (email && password.length >= 6) {
                this.login(email);
            } else {
                throw new Error('Credenciais inválidas');
            }
        } catch (error) {
            this.showFieldError('password', 'Email ou senha incorretos');
        } finally {
            setButtonLoading(this.loginBtn, false);
        }
    }
    
    login(email) {
        appState.isLoggedIn = true;
        appState.user.email = email;
        
        // Save auth state
        saveToStorage('authState', {
            isLoggedIn: true,
            user: appState.user
        });
        
        // Show main app
        hideElement(this.loginPage);
        showElement(this.mainApp);
        
        // Initialize main app
        if (window.mainApp) {
            window.mainApp.init();
        }
    }
    
    handleLogout() {
        appState.isLoggedIn = false;
        
        // Clear auth state
        localStorage.removeItem('authState');
        
        // Reset form
        if (this.loginForm) {
            this.loginForm.reset();
        }
        
        // Clear errors
        this.clearFieldError('email');
        this.clearFieldError('password');
        
        // Show login page
        hideElement(this.mainApp);
        showElement(this.loginPage);
        
        // Close any open modals
        document.querySelectorAll('.modal').forEach(modal => {
            hideElement(modal);
        });
    }
    
    checkAuthState() {
        const savedAuth = loadFromStorage('authState');
        
        if (savedAuth && savedAuth.isLoggedIn) {
            appState.isLoggedIn = true;
            appState.user = savedAuth.user;
            
            hideElement(this.loginPage);
            showElement(this.mainApp);
            
            // Initialize main app
            if (window.mainApp) {
                window.mainApp.init();
            }
        } else {
            showElement(this.loginPage);
            hideElement(this.mainApp);
        }
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});