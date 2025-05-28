// User state management
let isLoggedIn = false;
let currentUser = null;

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

// Update UI elements based on login status
function updateUIForLoggedInUser() {
    const sidebarHeader = document.querySelector('.sidebar-header');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (sidebarHeader) {
        sidebarHeader.innerHTML = `
            <img src="${currentUser.profileImage || 'download.jpg'}" alt="User Profile" class="profile-image">
            <h3>Welcome</h3>
            <p>${currentUser.name || 'User'}</p>
        `;
    }
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';

    // Show protected navigation items
    document.querySelectorAll('.protected-nav').forEach(item => {
        item.style.display = 'block';
    });
}

function updateUIForLoggedOutUser() {
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

// Sidebar toggle functionality
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('sidebar-active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // Add event listeners for forms if they exist
    const loginForm = document.querySelector('form.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.querySelector('form.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});
