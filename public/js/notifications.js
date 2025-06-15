// Notifications functionality

class NotificationManager {
    constructor() {
        this.modal = document.getElementById('notificationsModal');
        this.closeBtn = document.getElementById('closeNotificationsModal');
        this.notificationBtn = document.getElementById('notificationBtn');
        this.notificationsList = document.getElementById('notificationsList');
        this.searchInput = document.getElementById('notificationSearch');
        this.filterSelect = document.getElementById('notificationFilter');
        this.markAllReadBtn = document.getElementById('markAllRead');
        this.unreadCountElement = document.getElementById('unreadCount');
        
        this.currentFilter = 'all';
        this.currentSearch = '';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadNotifications();
        this.updateUnreadCount();
    }
    
    bindEvents() {
        // Open modal
        if (this.notificationBtn) {
            this.notificationBtn.addEventListener('click', () => this.openModal());
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
        
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', debounce((e) => {
                this.currentSearch = e.target.value.toLowerCase();
                this.renderNotifications();
            }, 300));
        }
        
        // Filter functionality
        if (this.filterSelect) {
            this.filterSelect.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.renderNotifications();
            });
        }
        
        // Mark all as read
        if (this.markAllReadBtn) {
            this.markAllReadBtn.addEventListener('click', () => this.markAllAsRead());
        }
        
        // Notification actions (event delegation)
        if (this.notificationsList) {
            this.notificationsList.addEventListener('click', (e) => {
                const notificationId = e.target.closest('.notification-item')?.dataset.id;
                
                if (e.target.closest('.notification-action.mark-read')) {
                    this.markAsRead(notificationId);
                } else if (e.target.closest('.notification-action.delete')) {
                    this.deleteNotification(notificationId);
                }
            });
        }
    }
    
    loadNotifications() {
        // Load from storage or use sample data
        const savedNotifications = loadFromStorage('notifications');
        if (savedNotifications) {
            appState.notifications = savedNotifications;
        }
    }
    
    openModal() {
        showElement(this.modal);
        document.body.style.overflow = 'hidden';
        this.renderNotifications();
    }
    
    closeModal() {
        hideElement(this.modal);
        document.body.style.overflow = '';
    }
    
    getFilteredNotifications() {
        let filtered = appState.notifications;
        
        // Apply filter
        if (this.currentFilter !== 'all') {
            if (this.currentFilter === 'unread') {
                filtered = filtered.filter(n => !n.read);
            } else {
                filtered = filtered.filter(n => n.type === this.currentFilter);
            }
        }
        
        // Apply search
        if (this.currentSearch) {
            filtered = filtered.filter(n => 
                n.title.toLowerCase().includes(this.currentSearch) ||
                n.message.toLowerCase().includes(this.currentSearch) ||
                (n.company && n.company.toLowerCase().includes(this.currentSearch))
            );
        }
        
        return filtered;
    }
    
    renderNotifications() {
        if (!this.notificationsList) return;
        
        const notifications = this.getFilteredNotifications();
        
        if (notifications.length === 0) {
            this.notificationsList.innerHTML = `
                <div class="empty-notifications">
                    <i data-lucide="bell"></i>
                    <p>Nenhuma notificação encontrada</p>
                </div>
            `;
        } else {
            this.notificationsList.innerHTML = notifications.map(notification => 
                this.renderNotificationItem(notification)
            ).join('');
        }
        
        // Reinitialize icons
        initializeLucideIcons();
    }
    
    renderNotificationItem(notification) {
        const iconMap = {
            success: 'check-circle',
            warning: 'alert-triangle',
            error: 'x',
            info: 'bell'
        };
        
        return `
            <div class="notification-item ${!notification.read ? 'unread' : ''}" data-id="${notification.id}">
                <div class="notification-content">
                    <div class="notification-icon ${notification.type}">
                        <i data-lucide="${iconMap[notification.type] || 'bell'}"></i>
                    </div>
                    
                    <div class="notification-body">
                        <div class="notification-header">
                            <h3 class="notification-title">${notification.title}</h3>
                        </div>
                        <p class="notification-message">${notification.message}</p>
                        <div class="notification-meta">
                            <span class="notification-time">${formatTimestamp(notification.timestamp)}</span>
                            ${notification.company ? `<span class="notification-company">${notification.company}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="notification-actions">
                        ${!notification.read ? `
                            <button class="notification-action mark-read" title="Marcar como lida">
                                <i data-lucide="check"></i>
                            </button>
                        ` : ''}
                        <button class="notification-action delete" title="Excluir notificação">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    markAsRead(notificationId) {
        const notification = appState.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.renderNotifications();
            this.updateUnreadCount();
        }
    }
    
    markAllAsRead() {
        appState.notifications.forEach(notification => {
            notification.read = true;
        });
        
        this.saveNotifications();
        this.renderNotifications();
        this.updateUnreadCount();
    }
    
    deleteNotification(notificationId) {
        appState.notifications = appState.notifications.filter(n => n.id !== notificationId);
        this.saveNotifications();
        this.renderNotifications();
        this.updateUnreadCount();
    }
    
    updateUnreadCount() {
        const unreadCount = appState.notifications.filter(n => !n.read).length;
        
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        // Update modal subtitle
        if (this.unreadCountElement) {
            if (unreadCount > 0) {
                this.unreadCountElement.textContent = `${unreadCount} não lidas`;
                this.unreadCountElement.style.display = 'block';
            } else {
                this.unreadCountElement.style.display = 'none';
            }
        }
        
        // Show/hide mark all read button
        if (this.markAllReadBtn) {
            if (unreadCount > 0) {
                this.markAllReadBtn.style.display = 'block';
            } else {
                this.markAllReadBtn.style.display = 'none';
            }
        }
    }
    
    saveNotifications() {
        saveToStorage('notifications', appState.notifications);
    }
    
    addNotification(notification) {
        const newNotification = {
            id: generateId(),
            ...notification,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        appState.notifications.unshift(newNotification);
        this.saveNotifications();
        this.updateUnreadCount();
        
        if (this.modal && !this.modal.classList.contains('hidden')) {
            this.renderNotifications();
        }
    }
}

// Initialize notification manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.notificationManager = new NotificationManager();
});