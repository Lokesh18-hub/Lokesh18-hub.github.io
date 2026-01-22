// Mobile Menu Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// Close menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        if (menuIcon) {
            menuIcon.classList.remove('bx-x');
        }
        navbar.classList.remove('active');
    };
});

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');

            // Get all inputs by their order
            const inputs = contactForm.querySelectorAll('input');
            const textarea = contactForm.querySelector('textarea');
            
            const fullName = inputs[0].value.trim();
            const email = inputs[1].value.trim();
            const phone = inputs[2].value.trim();
            const subject = inputs[3].value.trim();
            const message = textarea.value.trim();

            console.log('Form data:', { fullName, email, phone, subject, message });

            // Basic validation
            if (!fullName || !email || !message) {
                alert('Please fill in all required fields (Name, Email, Message)');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Get submit button
            const submitBtn = contactForm.querySelector('input[type="submit"]');
            const originalText = submitBtn.value;
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;

            // Create FormData
            const formData = new FormData();
            formData.append('access_key', '709462fa-0e92-4969-9216-e4628bfdb1ff');
            formData.append('name', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('subject', subject);
            formData.append('message', message);

            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('SUCCESS! Message sent');
                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.value = originalText;
                    submitBtn.disabled = false;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again or contact me directly.');
                submitBtn.value = originalText;
                submitBtn.disabled = false;
            });
        });
    } else {
        console.error('Contact form not found');
    }
});