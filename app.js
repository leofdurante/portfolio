(function () {
    // Side navigation with smooth scrolling
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            document.querySelector(".active-btn").classList.remove("active-btn");
            // Add active class to clicked button
            this.classList.add("active-btn");
            
            // Get the section ID to scroll to
            const sectionId = button.dataset.id;
            const section = document.getElementById(sectionId);
            
            // Smooth scroll to the section
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        })
    });

    // Theme toggle functionality
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS with Leonardo's actual User ID
        emailjs.init("qLhpH9o9XT01A-CPd");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show sending notification
            showNotification('Sending message...', 'info');
            
            // Prepare email template parameters to match the EmailJS template
            const templateParams = {
                name: name,  // Changed from from_name to match template
                email: email,  // Changed from from_email to match template
                subject: subject,
                message: message,
                time: new Date().toLocaleString()  // Add current time for the template
            };
            
            // Send email using EmailJS with Leonardo's actual Template ID
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
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
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
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Add CSS animation
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
