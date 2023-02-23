const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#typeNameX').value.trim();
    const email = document.querySelector('#typeEmailX').value.trim();
    const password = document.querySelector('#typePasswordX').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
document
    .querySelector('.signUp')
    .addEventListener('submit', signupFormHandler);
  