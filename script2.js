const inputPrecioElement = document.getElementById('precio');
const inputNombreElement = document.getElementById('nombre');
const btnGenerar = document.getElementById('btn-generar');
const btnBorrar = document.getElementById('btn-borrar');
const total = document.getElementById('total');
const output = document.getElementById('output');

let idCounter = 1

// PRECIO MAYOR o IGUAL A 0
inputPrecioElement.addEventListener('input', function() {
    if (inputPrecioElement.value < 0) {
        inputPrecioElement.value = 0;
    }
});

// BOTÓN GENERAR
btnGenerar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputPrecio = inputPrecioElement.value;
    const inputNombre = inputNombreElement.value;

    if (inputPrecio && inputNombre) {
        const message = generateMessage(inputNombre, inputPrecio, idCounter);

        total.textContent = parseInt(total.textContent) + parseInt(inputPrecio);

        inputNombreElement.value = '';
    } else {
        alert('Hay datos sin completar, che papuda.');
    }
});

// FUNCIÓN MENSAJE
function generateMessage(nombre, precio, id) {
    const message = `
        <div class="output-container">
            <br>
            <h3>${nombre.toUpperCase()}</h3>
<p class="texto" id="p-${id}">Hola ${nombre.charAt(0).toUpperCase()}${nombre.slice(1).toLowerCase()}! Cómo estás?
<br><br>
Este mensaje es para recordarte que iniciamos un mes nuevo, y la cuota se debe abonar *entre el 1 y el 10*. El valor de este mes es de *$ ${precio}*.
<br><br>
Gracias! Cualquier consulta estoy a tu disposición 🤓</p>
            <div class="div-copiar">
                

                <svg class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="72"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>


            </div><br>
        </div>
    `;

    output.innerHTML += message;

    idCounter++

    return;
}

// MENSAJE ID
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-copiar')) {
        const messageId = event.target.getAttribute('data-message-id');
        copyMessageToClipboard(messageId);
    }
});

// FUNCIÓN COPIAR
function copyMessageToClipboard(elementId) {
    const messageElement = document.getElementById(elementId);
    const message = messageElement.textContent;

    navigator.clipboard.writeText(message)
        .then(() => {
            const copyButton = document.querySelector(`#${elementId.replace('p-', 'btn-')}`);
            copyButton.classList.remove('btn-copiar');
            copyButton.classList.add('btn-copiado');
            setTimeout(() => {
                copyButton.classList.remove('btn-copiado');
                copyButton.classList.add('btn-copiar');
            }, 500);
        })
        .catch(err => {
            console.error('Error copying message to clipboard:', err);
        });
}

// BOTÓN BORRAR
btnBorrar.addEventListener('click', (e) => {
    e.preventDefault();

    inputNombreElement.value = '';
    inputPrecioElement.value = '';
    total.textContent = '0';
    output.innerHTML = '';

    idCounter = 1;
});