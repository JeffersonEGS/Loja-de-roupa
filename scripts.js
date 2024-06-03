
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // Predefined username and password for validation
    const validUsername = 'Jefferson';
    const validPassword = '992574517';
  
    if (username === validUsername && password === validPassword) {
      alert('Login bem-sucedido');
      errorMessage.textContent = '';
    } else {
      errorMessage.textContent = 'Usuário ou senha incorretos';
    }
  });

  
  