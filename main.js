// Constants
const PROTECTED_PAGES = ['profile.html', 'settings.html', 'favorites.html', 'order-history.html', 'notifications.html', 'address-book.html'];

// User state management
let isLoggedIn = false;
let currentUser = null;

// Add animation class to elements with data-animate attribute
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((element, index) => {
        element.classList.add('animate-up');
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Check if user is logged in on page load
function checkLoginStatus() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}
function updateUIForLoggedInUser() {
    const sidebarHeader = document.querySelector('.sidebar-header');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    
    document.body.classList.add('logged-in');
    
    if (sidebarHeader) {
        sidebarHeader.innerHTML = `
            <img src="${currentUser.profileImage || 'download.jpg'}" alt="User Profile" class="profile-image">
            <h3>Welcome</h3>
            <p>${currentUser.name || 'User'}</p>
        `;
    }
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';

    // Show protected navigation items
    document.querySelectorAll('.protected-nav').forEach(item => {
        item.style.display = 'block';
    });
}

function updateUIForLoggedOutUser() {
    document.body.classList.remove('logged-in');
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';

    const protectedPages = ['favorites.html', 'order-history.html', 'settings.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return;
    }

    // Hide protected navigation items
    document.querySelectorAll('.protected-nav').forEach(item => {
        item.style.display = 'none';
    });
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[type="checkbox"]').checked;

    // Simulating login - In real app, this would be an API call
    const user = {
        email: email,
        name: email.split('@')[0],
        profileImage: 'download.jpg'
    };

    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    isLoggedIn = true;

    // Redirect to home page after login
    window.location.href = 'index.html';
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulating signup - In real app, this would be an API call
    const user = {
        name: fullName,
        email: email,
        profileImage: 'download.jpg'
    };

    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    isLoggedIn = true;

    // Redirect to home page after signup
    window.location.href = 'index.html';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    isLoggedIn = false;
    currentUser = null;
    window.location.href = 'index.html';
}

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    }
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (sidebar && sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        document.querySelector('.main-content').classList.remove('sidebar-active');
    }
});

// Function to handle notifications
function handleNotifications() {
    const notificationButtons = document.querySelectorAll('.mark-read');
    if (notificationButtons) {
        notificationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const notificationItem = this.closest('.notification-item');
                notificationItem.classList.remove('unread');
                this.style.display = 'none';
            });
        });
    }
}

// Function to handle favorite items
function handleFavorites() {
    const removeBtns = document.querySelectorAll('.remove-btn');
    if (removeBtns) {
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const favoriteItem = this.closest('.favorite-item');
                favoriteItem.style.animation = 'slideOut 0.3s forwards';
                setTimeout(() => {
                    favoriteItem.remove();
                }, 300);
            });
        });
    }
}

// Function to handle profile image upload
function handleProfileUpload() {
    const uploadBtn = document.querySelector('.avatar-upload');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            // Simulate file upload
            alert('File upload functionality would go here');
        });
    }
}

// Handle menu item interactions
function handleMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (!isLoggedIn) {
                    alert('Please login to interact with menu items');
                    window.location.href = 'login.html';
                    return;
                }
            });
        });
    }
}

// Address Book Functions
function showAddAddressForm() {
    const modal = document.getElementById('addressFormModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hideAddressForm() {
    const modal = document.getElementById('addressFormModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleAddressSubmit(event) {
    event.preventDefault();
    // In a real app, this would save to a database
    const formData = {
        type: document.getElementById('addressType').value,
        name: document.getElementById('fullName').value,
        street: document.getElementById('streetAddress').value,
        apartment: document.getElementById('apartment').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zipCode').value,
        phone: document.getElementById('phone').value
    };

    // Save to localStorage for demonstration
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    addresses.push(formData);
    localStorage.setItem('addresses', JSON.stringify(addresses));

    // Hide form and refresh page
    hideAddressForm();
    location.reload();
}

function loadAddresses() {
    const addressList = document.querySelector('.address-list');
    if (!addressList) return;

    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    if (addresses.length === 0) {
        addressList.innerHTML = '<p class="no-addresses">No addresses saved yet.</p>';
        return;
    }

    addressList.innerHTML = addresses.map((address, index) => `
        <div class="address-card">
            <div class="address-type">${address.type}</div>
            <div class="address-content">
                <h3>${address.name}</h3>
                <p>${address.street}</p>
                ${address.apartment ? `<p>${address.apartment}</p>` : ''}
                <p>${address.city}, ${address.state} ${address.zip}</p>
                <p>Phone: ${address.phone}</p>
            </div>
            <div class="address-actions">
                <button class="edit-btn" onclick="editAddress(${index})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteAddress(${index})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function deleteAddress(index) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    addresses.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    location.reload();
}

// Initialize all page functionality
function initializePage() {
    checkLoginStatus();
    initializeAnimations();
    handleNotifications();
    handleFavorites();
    handleProfileUpload();
    handleMenuInteractions();

    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize address book functionality
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', handleAddressSubmit);
        loadAddresses();

        // Add modal close functionality
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('addressFormModal');
            if (e.target === modal) {
                hideAddressForm();
            }
        });

        const editAddress = (index) => {
            const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
            const address = addresses[index];
            if (!address) return;

            // Fill form with address data
            document.getElementById('addressType').value = address.type;
            document.getElementById('fullName').value = address.name;
            document.getElementById('streetAddress').value = address.street;
            document.getElementById('apartment').value = address.apartment || '';
            document.getElementById('city').value = address.city;
            document.getElementById('state').value = address.state;
            document.getElementById('zipCode').value = address.zip;
            document.getElementById('phone').value = address.phone;

            // Show modal
            showAddAddressForm();
        };
    }
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
