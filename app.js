(function () {
    // Handle side navigation: active state + smooth scroll to section.
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            // Keep only one nav item highlighted at a time.
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            
            // Match button data-id to target section id.
            const sectionId = button.dataset.id;
            const section = document.getElementById(sectionId);
            
            // Scroll without page reload.
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        })
    });

    // Toggle between dark and light palettes.
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })

    // Contact form submission via EmailJS.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize once before sending messages.
        emailjs.init("qLhpH9o9XT01A-CPd");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Read current form values.
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Require all fields.
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Basic email format validation.
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Give immediate UI feedback while sending.
            showNotification('Sending message...', 'info');
            
            // Keys must match your EmailJS template variable names.
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                time: new Date().toLocaleString()
            };
            
            // service_id, template_id, params
            emailjs.send('service_rhhprwq', 'template_yx7afdh', templateParams)
                .then(function(response) {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                    console.error('EmailJS error:', error);
                });
        });
    }
    
    // Small in-page toast system for success/error/info states.
    function showNotification(message, type = 'info') {
        // Allow only one visible toast at a time.
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Render toast container and close button.
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Apply runtime styles based on notification type.
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Manual dismissal.
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-dismiss after 5 seconds.
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Mount toast.
        document.body.appendChild(notification);
        
        // Inject keyframes once.
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: 15px;
                }
                
                .notification-close:hover {
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(style);
        }
    }
})();
