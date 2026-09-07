javascript
const expresion = document.getElementById("expresion");
const arbol = document.getElementById("arbol");


const dibujar_arbol = (expresionInput) => {
    let numeros = expresionInput.split(/[\+\-\*\/]/);
    let operadores = expresionInput.replace(/[0-9]+/g, "").split("");

    if (numeros.length < 2) return;

    let contenido = `
        <div class="row justify-content-center">

            <div class="col-12 text-center">
                <p id="raiz1" class="bg-warning rounded-circle py-4">
                    ${operadores[0]}
                </p>
            </div>
    `;


    numeros.map((numero, indice) => {
        contenido += `
            <div class="col-2 text-center">
                <p id="nodo${indice + 1}"
                   class="bg-success rounded-circle py-4">
                    ${numero}
                </p>
            </div>
        `;

    });

    contenido += `</div>`;
    arbol.innerHTML = contenido;

    numeros.map((numero, indice) => {

        new LeaderLine(
            document.getElementById("raiz1"),
            document.getElementById(`nodo${indice + 1}`),
            {
                startPlug: "disc",
                endPlug: "disc",
                color: "#8b772c",
                size: 5
            }
        );

    });
};


expresion.addEventListener("input", (event) => {

    dibujar_arbol(event.currentTarget.value);

});

