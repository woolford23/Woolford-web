// Toggle navigation menu visibility
function toggleMenu() {
    const navMenu = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Add click event listener to hamburger icon
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Implement smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close the mobile menu if it's open
            const navMenu = document.querySelector('.nav-links.active');
            if (navMenu) {
                toggleMenu();
            }
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Filter projects based on category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    if (projects.length === 0) return;
    
    // Show all projects if category is 'all'
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
        return;
    }
    
    // Otherwise, filter projects based on category
    projects.forEach(project => {
        if (project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add click event listeners to filter buttons
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter projects
                const category = this.dataset.category;
                filterProjects(category);
            });
        });
    }
});
// Contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            // Reset error states
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.remove());
            
            // Validate fields
            let isValid = true;
            
            // Name validation
            if (!name.value.trim()) {
                displayError(name, 'Name is required');
                isValid = false;
            }
            
            // Email validation
            if (!email.value.trim()) {
                displayError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                displayError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                displayError(message, 'Message is required');
                isValid = false;
            }
            
            // Submit the form if valid
            if (isValid) {
                contactForm.submit();
            }
        });
    }
});

// Helper function to display error messages
function displayError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    inputElement.parentNode.appendChild(errorElement);
    inputElement.style.borderColor = 'red';
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Handle form submission and email sending
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        const originalSubmitHandler = contactForm.onsubmit;
        
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create a mailto link
            const mailtoLink = `mailto:wooleyford@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            // Open the email client
            window.location.href = mailtoLink;
            
            // Show confirmation message
            const confirmationMessage = document.createElement('div');
            confirmationMessage.className = 'confirmation-message';
            confirmationMessage.textContent = 'Message simulated as sent! If you would like to message me, your email client should open now.';
            confirmationMessage.style.color = 'green';
            confirmationMessage.style.marginTop = '10px';
            
            contactForm.appendChild(confirmationMessage);
            contactForm.reset();
        };
    }
});
