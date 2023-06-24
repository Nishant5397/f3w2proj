// Function to handle signup
function handleSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('cnf_password').value;
  
    // Validate if all fields are filled
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      document.getElementById('error_message').style.display = 'block';
      document.getElementById('success').style.display = 'none';
      return;
    }
  
    // Validate if passwords match
    if (password !== confirmPassword) {
      document.getElementById('error_message').innerHTML = 'Error: Passwords do not match.';
      document.getElementById('error_message').style.display = 'block';
      document.getElementById('success').style.display = 'none';
      return;
    }
  
    // Generate access token
    const accessToken = generateAccessToken();
  
    // Create user object
    const user = {
      name: name,
      email: email,
      password: password
    };
  
    // Create user state object with access token
    const userState = {
      user: user,
      accessToken: accessToken
    };
  
    // Save user state in local storage
    localStorage.setItem('userState', JSON.stringify(userState));
  
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('cnf_password').value = '';
  
    // Show success message
    document.getElementById('success').style.display = 'block';
    document.getElementById('error_message').style.display = 'none';
  
    // Redirect to profile page
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 2000);
  }
  
  // Function to generate a random access token
  function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  // Check if access token exists in local storage on page load
  window.onload = function () {
    const path = window.location.pathname;
    const userState = JSON.parse(localStorage.getItem('userState'));
  
    if (path === 'profile.html') {
      // Redirect to signup page if no access token found
      if (!userState || !userState.accessToken) {
        window.location.href = 'index.html';
      } else {
        // Display user details on profile page
        document.getElementById('nameDisplay').innerText += userState.user.name;
        document.getElementById('emailDisplay').innerText += userState.user.email;
      }
    } else if (path === 'index.html') {
      // Redirect to profile page if access token found
      if (userState && userState.accessToken) {
        window.location.href = 'profile.html';
      }
    }
  };
  
  // Function to handle logout
  function logout() {
    // Clear user state and access token from local storage
    localStorage.removeItem('userState');
  
    // Redirect to signup page
    window.location.href = 'index.html';
  }
  