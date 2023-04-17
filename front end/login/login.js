const link = 'http://localhost:7000';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const signupOption = document.querySelector('#signup-option');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // get form data
      const email = form.elements.email.value;
      const password = form.elements.password.value;
    
      // make axios post request to backend API with user data
      axios.post(`${link}/login`, { email, password })
        .then(response => {
          // handle successful login, e.g. redirect to dashboard page
          window.location.href = '../dailyexpense/dailyexpense.html';
          console.log(response);
        })
        .catch(error => {
          // handle login error, e.g. show error message
          console.error(error);
          alert('Invalid email or password. Please try again.');
        });
    });
    
    document.getElementById('signup-btn').addEventListener('click', function() {
        window.location.href = '../signup/signup.html';
      });
});
