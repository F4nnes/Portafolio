const form = document.getElementById("form");
const inputs = document.querySelectorAll("input[data-formulario]");
const enviarButton = document.getElementById("enviar");

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

form.addEventListener("submit", e => {
  e.preventDefault();
  validateForm();
});

enviarButton.addEventListener("click", () => {
  if (validateForm()) {
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    storeData(data);
    alert("Contacto enviado correctamente!");
  }
});

function validateForm() {
  const errors = {};
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const asunto = document.getElementById("asunto");
  const mensaje = document.getElementById("mensaje");

  if (!validateNombre(nombre.value)) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  }

  if (!validateEmail(email.value)) {
    errors.email = "El email no es válido";
  }

  if (!validateAsunto(asunto.value)) {
    errors.asunto = "El asunto debe tener al menos 4 caracteres";
  }

  if (!validateMensaje(mensaje.value)) {
    errors.mensaje = "El mensaje debe tener al menos 5 caracteres";
  }

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    return false;
  }

  return true;
}

function validateNombre(value) {
  return value.length >= 3;
}

function validateEmail(value) {
  return regexEmail.test(value);
}

function validateAsunto(value) {
  return value.length >= 4;
}

function validateMensaje(value) {
  return value.length >= 5;
}

function displayErrors(errors) {
  const errorMessages = Object.values(errors).join("\n");
  alert(errorMessages);
}

function storeData(data) {
  sessionStorage.setItem("data", JSON.stringify(data));
}