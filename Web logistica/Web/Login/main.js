// Credenciales predeterminadas
const validCredentials = {
    username: "Empresa",
    password: "empresa123"
};

// Obtener elementos del DOM
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Función de login
function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username === validCredentials.username && password === validCredentials.password) {
        // Ocultar mensaje de error si estaba visible
        errorMessage.style.display = 'none';
        
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        
        // Redirección a dashboard después de 2 segundos
        setTimeout(function() {
            window.location.href = "../dashboard/index.html";
        }, 100);

    } else {
        // Mostrar mensaje de error
        errorMessage.style.display = 'block';
        
        // Ocultar mensaje de éxito si estaba visible
        successMessage.style.display = 'none';
    }
}

// Asignar evento al botón de login
loginButton.addEventListener('click', login);

// Permitir login al presionar Enter en los campos de input
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});

usernameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});