document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const data = { name, email, password };
      axios.post('http://localhost:7000', data)
        .then(response => {
          console.log('Sign up successful!');
        })
        .catch(error => {
          console.error('Error signing up:', error);
        });
    });
  });
  