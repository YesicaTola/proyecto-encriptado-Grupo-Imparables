function AgregarDatos() {

  var websiteSelect = document.getElementById('websiteInput');
  var selectedOption = websiteSelect.options[websiteSelect.selectedIndex].value;
  var username = document.getElementById('usernameInput').value;
  var password = document.getElementById('passwordInput').value;
  var passwordCifrado = document.getElementById('password-convertido').textContent;

  // Para guardar los datos ingresados agregando un div en la ventana

  var passwordsContainer = document.getElementById('passwordsContainer');
  var passwordEntry = document.createElement('div');
  passwordEntry.classList.add('passwordEntry');
  passwordEntry.innerHTML = '<span>Red social:</span> ' + selectedOption +
    '<br><span>Usuario:</span> ' + username +
    '<br><span>Contraseña:</span> ' + password +
    '<br><span>Cifrado:</span> ' + passwordCifrado +
    '<br><button onclick="deletePasswordEntry(this)"><ion-icon name="trash"></ion-icon>Eliminar</button>';
  passwordsContainer.appendChild(passwordEntry);

  // Para limpiar las entradas
  document.getElementById('websiteInput').selectedIndex = 0;
  document.getElementById('usernameInput').value = '';
  document.getElementById('passwordInput').value = '';
  document.getElementById('password-convertido').textContent = '';
  document.getElementById('password-desencriptado').textContent = '';
}

function deletePasswordEntry(button) {
  var passwordEntry = button.parentNode;
  passwordEntry.parentNode.removeChild(passwordEntry);
}


document.getElementById('addPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que se envíe el formulario

  AgregarDatos();
});

//CIFRADO DE CONTRASEÑA
function cifrado() {
  // Obtener el mensaje y la clave desde los elementos del formulario
  var mensaje = document.getElementById("passwordInput").value.toUpperCase();
  var clave = document.getElementById("websiteInput").value.toUpperCase();

  // Variables para almacenar el mensaje cifrado
  var mensajeCifrado = "";
  var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  var claveAlineada = "";

  // Alinear la clave con el mensaje
  for (var i = 0; i < mensaje.length; i++) {
    claveAlineada += clave.charAt(i % clave.length);
  }

  // Cifrar el mensaje
  for (var i = 0; i < mensaje.length; i++) {
    var mensajeChar = mensaje.charAt(i);
    var claveChar = claveAlineada.charAt(i);

    if (mensajeChar == " ") {
      mensajeCifrado += " ";
    } else {
      // Obtener el índice del carácter del mensaje y de la clave en el alfabeto
      var mensajeCharCode = alfabeto.indexOf(mensajeChar);
      var claveCharCode = alfabeto.indexOf(claveChar);

      // Realizar el cifrado mediante la operación de suma módulo
      var cifradoCharCode = (mensajeCharCode + claveCharCode) % alfabeto.length;
      // Obtener el carácter cifrado correspondiente y agregarlo al mensaje cifrado
      mensajeCifrado += alfabeto.charAt(cifradoCharCode);
    }
  }

  // Mostrar el mensaje cifrado en el cuadro correspondiente del formulario
  document.getElementById("password-convertido").innerHTML = mensajeCifrado;
}

// DESENCRIPTAR CONTRASEÑA
function descifrado() {
  // Obtener el mensaje cifrado y la clave desde los elementos del formulario
  var mensajeCifrado = document.getElementById("password-convertido").textContent;
  var clave = document.getElementById("websiteInput").value.toUpperCase();

  // Variables para almacenar el mensaje desencriptado
  var mensajeDesencriptado = "";
  var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  var claveAlineada = "";

  // Alinear la clave con el mensaje cifrado
  for (var i = 0; i < mensajeCifrado.length; i++) {
    claveAlineada += clave.charAt(i % clave.length);
  }

  // Desencriptar el mensaje cifrado
  for (var i = 0; i < mensajeCifrado.length; i++) {
    var mensajeChar = mensajeCifrado.charAt(i);
    var claveChar = claveAlineada.charAt(i);

    if (mensajeChar == " ") {
      mensajeDesencriptado += " ";
    } else {
      // Obtener el índice del carácter del mensaje cifrado y de la clave en el alfabeto
      var mensajeCharCode = alfabeto.indexOf(mensajeChar);
      var claveCharCode = alfabeto.indexOf(claveChar);

      // Realizar el desencriptado mediante la operación de resta módulo
      var desencriptadoCharCode = (mensajeCharCode - claveCharCode + alfabeto.length) % alfabeto.length;

      // Obtener el carácter desencriptado correspondiente y agregarlo al mensaje desencriptado
      mensajeDesencriptado += alfabeto.charAt(desencriptadoCharCode);
    }
  }

  // Mostrar el mensaje desencriptado en el cuadro correspondiente del formulario
  document.getElementById("password-desencriptado").innerHTML = mensajeDesencriptado;
}
