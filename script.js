// const inputPrecio = document.getElementById('precio');
// const inputNombre = document.getElementById('nombre');
const btnGenerar = document.getElementById('btn-generar');
const btnBorrar = document.getElementById('btn-borrar');
const total = document.getElementById('total');


btnGenerar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputPrecio = document.getElementById('precio').value;
    const inputNombre = document.getElementById('nombre').value;

    if (inputPrecio && inputNombre) {

        const output = document.getElementById('output');

        // TEXTO
        output.innerHTML += `
        <div class="output-container">
            <br>
            <h3>${inputNombre.slice(0).toUpperCase()}</h3>
<p class="texto" id="p-${inputNombre}">Hola ${inputNombre.charAt(0).toUpperCase()}${inputNombre.slice(1).toLowerCase()}! Cómo estás?<br>
Este mensaje es para recordarte que iniciamos un mes nuevo, y la cuota se debe abonar *entre el 1 y el 10*.<br>
El valor de este mes es de *$ ${inputPrecio}*.<br>
Gracias! Cualquier consulta estoy a tu disposición 🤓</p>
            <div class="div-copiar tooltip">
                <button class="btn-copiar" id="btn-${inputNombre}">
                    <span class="tooltiptext" id="myTooltip">
                        Copiado!
                    </span>
                    COPIAR MENSAJE
                </button>
            </div><br>
        </div>
        `;

        document.body.append(output);

        // TOTAL
        total.innerHTML = parseInt(total.innerHTML) + parseInt(inputPrecio);

        // COPIAR
        const textBox = "p-" + inputNombre;
        const nombreValue = "btn-" + inputNombre;
        const btnCopiar = document.getElementById(nombreValue);


        btnCopiar.addEventListener('click', () => {

            const copyText = document.getElementById(textBox);
            const copiedText = copyText.textContent;
            const btnTooltip = document.getElementById(nombreValue);

            btnTooltip.addEventListener('mouseout', () => {

                const tooltip = document.getElementById('myTooltip');
                tooltip.classList.remove('tooltipTextClick');

            })

            navigator.clipboard.writeText(copiedText)

                .then(() => {

                    const tooltip = document.getElementById('myTooltip');
                    tooltip.classList.add('tooltipTextClick');

                })
                .catch(err => {

                    console.log(err, ", che papuda.");

                });
                        
        });;

        

    } else {
        alert('Hay datos sin completar, che papuda.');
    }


    // BORRAR NOMBRE
    const nombre = document.getElementById('nombre');
    nombre.value = '';
});


btnBorrar.addEventListener('click', (e) => {

    e.preventDefault();
    inputNombre.value = '';
    inputPrecio.value = ''
    total.innerHTML = '0';
    output.innerHTML = '';

});