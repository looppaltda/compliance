// User profile functionality

class ProfileManager {
    constructor() {
        this.modal = document.getElementById('profileModal');
        this.closeBtn = document.getElementById('closeProfileModal');
        this.profileBtn = document.getElementById('profileBtn');
        this.profileView = document.getElementById('profileView');
        this.profileEdit = document.getElementById('profileEdit');
        this.editBtn = document.getElementById('editProfileBtn');
        this.cancelBtn = document.getElementById('cancelProfileEdit');
        this.profileForm = document.getElementById('profileForm');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadUserData();
    }
    
    bindEvents() {
        // Open modal
        if (this.profileBtn) {
            this.profileBtn.addEventListener('click', () => this.openModal());
        }
        
        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close modal on backdrop click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Edit profile
        if (this.editBtn) {
            this.editBtn.addEventListener('click', () => this.showEditForm());
        }
        
        // Cancel edit
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.showProfileView());
        }
        
        // Save profile
        if (this.profileForm) {
            this.profileForm.addEventListener('submit', (e) => this.handleSave(e));
        }
    }
    
    loadUserData() {
        // Load user data from storage or use default
        const savedUser = loadFromStorage('userData');
        if (savedUser) {
            appState.user = { ...appState.user, ...savedUser };
        }
        
        this.updateProfileDisplay();
    }
    
    openModal() {
        showElement(this.modal);
        document.body.style.overflow = 'hidden';
        this.showProfileView();
    }
    
    closeModal() {
        hideElement(this.modal);
        document.body.style.overflow = '';
        this.showProfileView();
    }
    
    showProfileView() {
        showElement(this.profileView);
        hideElement(this.profileEdit);
        this.updateProfileDisplay();
    }
    
    showEditForm() {
        hideElement(this.profileView);
        showElement(this.profileEdit);
        this.populateEditForm();
    }
    
    updateProfileDisplay() {
        // Update profile card
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            const nameElement = profileCard.querySelector('h3');
            const emailElement = profileCard.querySelector('p');
            
            if (nameElement) nameElement.textContent = appState.user.name;
            if (emailElement) emailElement.textContent = appState.user.email;
        }
        
        // Update info grid
        const infoItems = document.querySelectorAll('.info-item p');
        if (infoItems.length >= 4) {
            infoItems[0].textContent = appState.user.name;
            infoItems[1].textContent = appState.user.email;
            infoItems[2].textContent = appState.user.role || 'Usuário';
            infoItems[3].textContent = appState.user.memberSince || '11/06/2025';
        }
        
        // Update header user info
        const headerUserName = document.querySelector('.user-name');
        const headerUserEmail = document.querySelector('.user-email');
        
        if (headerUserName) headerUserName.textContent = appState.user.name;
        if (headerUserEmail) headerUserEmail.textContent = appState.user.email;
    }
    
    populateEditForm() {
        const nameInput = document.getElementById('profileName');
        const emailInput = document.getElementById('profileEmail');
        const roleSelect = document.getElementById('profileRole');
        
        if (nameInput) nameInput.value = appState.user.name || '';
        if (emailInput) emailInput.value = appState.user.email || '';
        if (roleSelect) roleSelect.value = appState.user.role || 'Usuário';
    }
    
    async handleSave(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('profileName');
        const emailInput = document.getElementById('profileEmail');
        const roleSelect = document.getElementById('profileRole');
        
        // Validate inputs
        if (!nameInput.value.trim()) {
            alert('Nome é obrigatório');
            return;
        }
        
        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
            alert('Email válido é obrigatório');
            return;
        }
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update user data
            appState.user.name = nameInput.value.trim();
            appState.user.email = emailInput.value.trim();
            appState.user.role = roleSelect.value;
            
            // Save to storage
            saveToStorage('userData', appState.user);
            
            // Update auth state
            const authState = loadFromStorage('authState');
            if (authState) {
                authState.user = appState.user;
                saveToStorage('authState', authState);
            }
            
            // Update display
            this.updateProfileDisplay();
            
            // Show profile view
            this.showProfileView();
            
            console.log('Profile updated successfully');
            
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erro ao salvar perfil. Tente novamente.');
        }
    }
}

// Initialize profile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.profileManager = new ProfileManager();
});