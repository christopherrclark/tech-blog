const loginFormHandler = async (event) => {
  event.preventDefault();
  // console.log('loginFormHandler');

  // Collect values from the login form
  try {
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(response);

      if (response.ok) {
        alert('You are now logged in!');
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        // alert(response.statusText);
        alert('Login failed');
      }
    }
  } catch (err){
    console.log(err);
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (email && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
