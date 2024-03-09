const inputMesElement = document.getElementById('mes');
const inputDiaElement = document.getElementById('dia');
const inputNombreElement = document.getElementById('nombre');
const inputPrecioElement = document.getElementById('precio');
const inputClasesElement = document.getElementById('clases');
const inputCasaElement = document.getElementById('casa');
const btnGenerar = document.getElementById('btn-generar');
const btnBorrar = document.getElementById('btn-borrar');
const total = document.getElementById('total');
const output = document.getElementById('output');

// ID
let idCounter = 1

const inputNombre = inputNombreElement.value;


// PRECIO MAYOR o IGUAL A 0
inputPrecioElement.addEventListener('input', function () {
    if (inputPrecioElement.value < 0) {
        inputPrecioElement.value = 0;
    }
});

// BOTÓN GENERAR
btnGenerar.addEventListener('click', (e) => {

    e.preventDefault();

    // VALUES
    const inputMes = inputMesElement.value;
    const inputDia = inputDiaElement.value;
    const inputNombre = inputNombreElement.value;
    const inputPrecio = inputPrecioElement.value;
    const inputClases = inputClasesElement.value;
    const inputCasa = inputCasaElement.value;

    if (inputMes && inputDia && inputNombre && inputPrecio && inputClases) {

        if (inputNombre !== "Maca") {

            const message = generateMessage(inputMes, inputDia, inputPrecio, inputNombre, inputClases, idCounter);
            total.textContent = parseInt(total.textContent) + (parseInt(inputPrecio) * parseInt(inputClases));

            inputNombreElement.value = '';

        } else {
            console.log('Hola maca');
        }
    }
});

// FUNCIÓN MENSAJE
function generateMessage(mes, dia, precio, nombre, clases, id) {
    const message = `
        <div class="output-container">
            <br>
            <h3>${nombre.toUpperCase()}</h3>
<p class="texto" id="p-${id}">Buen día ${nombre.charAt(0).toUpperCase()}${nombre.slice(1).toLowerCase()}, ¿cómo estás?
<br><br>
Te paso el plan de las clases de ${mes}:<br>
Son *${clases} ${dia}*, serían *$ ${parseInt(precio) * parseInt(clases)}* ($ ${precio} x ${clases}).
<br><br>
Cualquier cosa avisame, ¡nos vemos el ${dia}!</p>
            <div class="div-copiar">
                
                <svg class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="54"><path class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>

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


`
Buen día Javi, ¿cómo estás?

Te paso el plan de las clases de *marzo*:
Son *4 martes*, serían *$ 28000* ($ 7000 x 4).

Cualquier cosa avisame, ¡nos vemos el martes!

---------------------------------------------

Buen día Maca, ¿cómo estás?

Te paso el plan de las clases de *marzo*:
Son *4 jueves*, serían *$ 28000* 
- En tu casa: $ 16000 (8000 x 2)
- En mi casa: $ 12000 (6000 x 2)

Cualquier cosa avisame, ¡nos vemos el jueves!

`