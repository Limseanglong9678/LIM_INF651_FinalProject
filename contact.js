// Function to create the Contact Form modal
function createContactModal() {
    const modal = document.createElement('div');
    modal.id = 'contactModal';
    modal.classList.add('contact-modal');

    modal.innerHTML = `
        <div class="contact-modal-content">
            <p id="contactModalMessage" class="contact-modal-message"></p>
            <button id="closeContactModal" class="contact-modal-close">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    document.getElementById('closeContactModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    return modal;
}

// Function to show the Contact Form modal with a specific message
function showContactModal(message) {
    const modal = document.getElementById('contactModal') || createContactModal();
    const modalMessage = document.getElementById('contactModalMessage');

    if (modalMessage) {
        modalMessage.innerHTML = message; // Set the message text
    }

    modal.style.display = 'block'; // Display the modal
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const movie = document.getElementById('movie').value.trim();
    const year = document.getElementById('year').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && movie && year && message) {
        // Show success modal
        showContactModal(`<p><strong>${movie} (${year})</strong></p>
            <p>Suggested successfully!</p>
            <p>We will review your suggestion in 2-3 business days.</p>`);
        document.getElementById('contactForm').reset();
    } else {
        // Show error modal
        showContactModal('Please fill all fields!');
    }
});
