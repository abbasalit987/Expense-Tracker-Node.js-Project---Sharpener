document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const data = { name, email, password };
      axios.post('http://localhost:7000/signup', data)
        .then(response => {
          console.log('Sign up successful!');
        })
        .catch(error => {
          console.log(error);
          // Display error message to user
          if (error.response.status === 409) {
            alert('User already exists!');
          } else {
            alert('Signup failed. Please try again.');
          }
        });
    });
  });
  