const inputDiaElement = document.getElementById("dia");
const inputNombreElement = document.getElementById("nombre");
const inputPrecioElement = document.getElementById("precio");
const inputClasesElement = document.getElementById("clases");
const inputAumentoElement = document.getElementById("aumento");

const btnGenerar = document.getElementById("btn-generar");
const btnAumento = document.getElementById("btn-aumento");
const btnBorrar = document.getElementById("btn-borrar");

const total = document.getElementById("total");
const output = document.getElementById("output");

// ID
let idCounter = 1;

// Store message data for easy deletion
const messagesData = {};

// PRECIO MAYOR o IGUAL A 0
inputPrecioElement.addEventListener("input", function () {
    if (inputPrecioElement.value < 0) {
        inputPrecioElement.value = 0;
    }
});

// FECHA
const date = new Date()
const dias = {
    'lunes': 1,
    'martes': 2,
    'miércoles': 3,
    'jueves': 4,
    'viernes': 5
}
const meses = {
    0: 'enero',
    1: 'febrero',
    2: 'marzo',
    3: 'abril',
    4: 'mayo',
    5: 'junio',
    6: 'julio',
    7: 'agosto',
    8: 'septiembre',
    9: 'octubre',
    10: 'noviembre',
    11: 'diciembre',
    12: 'enero',
}

// BOTÓN GENERAR
btnGenerar.addEventListener("click", (e) => {
    e.preventDefault();

    // VALUES
    const inputDia = inputDiaElement.value;
    const inputNombre = inputNombreElement.value;
    const inputPrecio = parseFloat(inputPrecioElement.value) * 1000; // Convert to number
    const inputClases = parseInt(inputClasesElement.value); // Convert to number

    if (inputDia && inputNombre && inputPrecio && inputClases) {
        const messageTotal = inputPrecio * inputClases;

        // Store message data for deletion
        messagesData[`msg-${idCounter}`] = {
            id: idCounter,
            precio: inputPrecio,
            clases: inputClases,
            total: messageTotal,
            nombre: inputNombre
        };

        // Update total
        const currentTotal = parseInt(total.textContent) || 0;
        total.textContent = currentTotal + messageTotal;

        // Generate and display message
        generateMessage(
            inputDia,
            inputPrecio,
            inputNombre,
            inputClases,
            idCounter,
        );

        inputNombreElement.value = "";
    }
});

// FUNCIÓN MENSAJE
function generateMessage(dia, precio, nombre, clases, id) {
    const messageId = `msg-${id}`;
    const messageTotal = precio * clases;

    // DIA
    const saludo = date.getHours() < 12 ? "Buen día" : "Buenas tardes";
    const hoy = date.getDay()
    let despedida;
    if (hoy == dias[dia]) {
        despedida = "más tarde"
    } else if (hoy + 1 == dias[dia]) {
        despedida = "mañana"
    } else {
        despedida = `el ${dia}`
    }

    const message = `
        <div class="output-container" id="${messageId}">
          <div class="message-header">
            <h3>${nombre.toUpperCase()}</h3>
            <div class="message-controls">
              <span class="message-total">$${messageTotal.toLocaleString()}</span>
              <button class="delete-btn" data-message-id="${messageId}" title="Eliminar mensaje">✕</button>
            </div>
          </div>
          <p class="texto" id="p-${id}">${saludo} ${nombre.charAt(0).toUpperCase()}${nombre.slice(1).toLowerCase()}, ¿cómo estás?
          <br><br>
          Te paso el plan de las clases de ${meses[date.getMonth()]}:<br>
          Son *${clases} ${dia}*, serían *$ ${messageTotal.toLocaleString()}* ($ ${precio.toLocaleString()} x ${clases}).
          <br><br>
          Cualquier cosa avisame, ¡nos vemos ${despedida}!</p>
          <div class="div-copiar">
              <svg class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="54"><path class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
          </div>
        </div>
    `;
    output.insertAdjacentHTML('beforeend', message);
    idCounter++;
    return;
}

// BOTÓN AUMENTO
btnAumento.addEventListener("click", (e) => {
    e.preventDefault();

    // VALUES
    const inputDia = inputDiaElement.value;
    const inputNombre = inputNombreElement.value;
    const inputPrecio = parseFloat(inputPrecioElement.value) * 1000; // Convert to number
    const inputClases = parseInt(inputClasesElement.value); // Convert to number
    const inputAumento = parseFloat(inputAumentoElement.value) * 1000; // Convert to number

    if (inputDia && inputNombre && inputPrecio && inputClases && inputAumento) {
        const messageTotal = inputPrecio * inputClases;

        // Store message data for deletion
        messagesData[`msg-${idCounter}`] = {
            id: idCounter,
            precio: inputPrecio,
            clases: inputClases,
            total: messageTotal,
            nombre: inputNombre
        };

        // Update total
        const currentTotal = parseInt(total.textContent) || 0;
        total.textContent = currentTotal + messageTotal;

        // Generate and display message
        generateAumento(
            inputDia,
            inputPrecio,
            inputNombre,
            inputClases,
            inputAumento,
            idCounter,
        );

        inputNombreElement.value = "";
        inputAumentoElement.value = "";
    }
});

// FUNCIÓN AUMENTO
function generateAumento(dia, precio, nombre, clases, aumento, id) {
    const messageId = `msg-${id}`;
    const messageTotal = precio * clases;

    // DIA
    const saludo = date.getHours() < 12 ? "Buen día" : "Buenas tardes";
    const hoy = date.getDay()
    let despedida;
    if (hoy == dias[dia]) {
        despedida = "más tarde"
    } else if (hoy + 1 == dias[dia]) {
        despedida = "mañana"
    } else {
        despedida = `el ${dia}`
    }

    const message = `
        <div class="output-container" id="${messageId}">
          <div class="message-header">
            <h3>${nombre.toUpperCase()}</h3>
            <div class="message-controls">
              <span class="message-total">$${messageTotal.toLocaleString()}</span>
              <button class="delete-btn" data-message-id="${messageId}" title="Eliminar mensaje">✕</button>
            </div>
          </div>
          <p class="texto" id="p-${id}">${saludo} ${nombre.charAt(0).toUpperCase()}${nombre.slice(1).toLowerCase()}, ¿cómo estás?
          <br><br>
          Te paso el plan de las clases de ${meses[date.getMonth()]}:<br>
          Son *${clases} ${dia}*, serían *$ ${messageTotal.toLocaleString()}* ($ ${precio.toLocaleString()} x ${clases}).
          <br><br>
          :horn A partir del mes de ${meses[date.getMonth() + 1]} el valor de cada clase será de $ ${aumento.toLocaleString()}
          <br><br>
          Cualquier cosa avisame, ¡nos vemos ${despedida}!</p>
          <div class="div-copiar">
              <svg class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="54"><path class="btn-copiar" id="btn-${id}" data-message-id="p-${id}" d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
          </div>
        </div>
    `;
    output.insertAdjacentHTML('beforeend', message);
    idCounter++;
    return;
}

// Handle delete button clicks
document.addEventListener("click", function (event) {
    // Delete message functionality
    if (event.target.classList.contains("delete-btn")) {
        const messageId = event.target.getAttribute("data-message-id");
        deleteMessage(messageId);
        return; // Stop propagation
    }

    // Copy message functionality
    if (event.target.classList.contains("btn-copiar")) {
        const messageId = event.target.getAttribute("data-message-id");
        copyMessageToClipboard(messageId);
    }
});

// Delete individual message
function deleteMessage(messageId) {
    // Get the message container
    const messageElement = document.getElementById(messageId);

    if (messageElement && messagesData[messageId]) {
        // Subtract from total
        const messageTotal = messagesData[messageId].total;
        const currentTotal = parseInt(total.textContent) || 0;
        total.textContent = Math.max(0, currentTotal - messageTotal);

        // Remove from DOM
        messageElement.remove();

        // Remove from data storage
        delete messagesData[messageId];

        console.log(`Message ${messageId} deleted. Total updated.`);
    } else {
        console.log(`Message ${messageId} not found or already deleted.`);
    }
}

// FUNCIÓN COPIAR
function copyMessageToClipboard(elementId) {
    const messageElement = document.getElementById(elementId);
    const message = messageElement.textContent;

    navigator.clipboard
        .writeText(message)
        .then(() => {
            const copyButton = document.querySelector(
                `#${elementId.replace("p-", "btn-")}`,
            );
            copyButton.classList.remove("btn-copiar");
            copyButton.classList.add("btn-copiado");
            setTimeout(() => {
                copyButton.classList.remove("btn-copiado");
                copyButton.classList.add("btn-copiar");
            }, 500);
        })
        .catch((err) => {
            console.error("Error copying message to clipboard:", err);
        });
}

// BOTÓN BORRAR
btnBorrar.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("¿Estás seguro de que quieres borrar todos los mensajes?")) {
        inputDiaElement.value = "";
        inputNombreElement.value = "";
        inputPrecioElement.value = "";
        inputClasesElement.value = "";
        inputAumentoElement.value = "";

        total.textContent = "0";
        output.innerHTML = "";

        // Clear messages data
        for (const key in messagesData) {
            delete messagesData[key];
        }

        idCounter = 1;
    }
});

// Initialize with empty total if needed
if (!total.textContent || total.textContent === "0") {
    total.textContent = "0";
}
