const inputPrecioElement = document.getElementById('precio');
const inputNombreElement = document.getElementById('nombre');
const btnGenerar = document.getElementById('btn-generar');
const btnBorrar = document.getElementById('btn-borrar');
const total = document.getElementById('total');
const output = document.getElementById('output');

// Idea para evitar id duplicados, usar un número que
// aumente cada vez que se clickea el botón GENERAR
// y se reinicie a 1 cuando se clickee el botón BORRAR-TODO
const idCounter = 1

// BOTÓN GENERAR
btnGenerar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputPrecio = inputPrecioElement.value;
    const inputNombre = inputNombreElement.value;

    if (inputPrecio && inputNombre) {
        const message = generateMessage(inputNombre, inputPrecio);

        total.textContent = parseInt(total.textContent) + parseInt(inputPrecio);

        inputNombreElement.value = '';
    } else {
        alert('Hay datos sin completar, che papuda.');
    }
});


// FUNCIÓN MENSAJE
function generateMessage(nombre, precio) {
    const message = `
        <div class="output-container">
            <br>
            <h3>${nombre.toUpperCase()}</h3>
<p class="texto" id="p-${nombre}">Hola ${nombre.charAt(0).toUpperCase()}${nombre.slice(1).toLowerCase()}! Cómo estás?
<br><br>
Este mensaje es para recordarte que iniciamos un mes nuevo, y la cuota se debe abonar *entre el 1 y el 10*. El valor de este mes es de *$ ${precio}*.
<br><br>
Gracias! Cualquier consulta estoy a tu disposición 🤓</p>
            <div class="div-copiar tooltip">
                <button class="btn-copiar" id="btn-${nombre}" data-message-id="p-${nombre}">
                    <span class="tooltiptext" id="myTooltip">Copiado!</span>
                    COPIAR MENSAJE
                </button>
            </div><br>
        </div>
    `;

    output.innerHTML += message;

    return;
}


//
//
// MENSAJE ID ?
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-copiar')) {
        const messageId = event.target.getAttribute('data-message-id');
        console.log(messageId)
        copyMessageToClipboard(messageId);
    }
});
// 
// 
// 


// FUNCIÓN COPIAR
function copyMessageToClipboard(elementId) {
    const messageElement = document.getElementById(elementId);
    const message = messageElement.textContent;

    navigator.clipboard.writeText(message)
        .then(() => {
            const copyButton = document.querySelector(`#${elementId.replace('p-', 'btn-')}`);
            copyButton.querySelector('.tooltiptext').textContent = 'Copiado!';
            setTimeout(() => {
                copyButton.querySelector('.tooltiptext').textContent = 'COPIAR MENSAJE';
            }, 1500);
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
});