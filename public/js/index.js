// necesita que sea para n cantidad de operaciones en el arbol
const expresion = document.getElementById("expresion");
const arbol = document.getElementById("arbol");

let lineas = [];

const separarOperacion = (operacion) => {
    operacion = operacion.replace(/\s/g, "");

    let nivel = 0;
    let posicion = -1;

    for (let i = operacion.length - 1; i >= 0; i--) {

        if (operacion[i] === ")") nivel++;
        if (operacion[i] === "(") nivel--;

        if (
            nivel === 0 &&
            /[+-]/.test(operacion[i])
        ) {
            posicion = i;
            break;
        }
    }

    if (posicion === -1) {

        nivel = 0;

        for (let i = operacion.length - 1; i >= 0; i--) {

            if (operacion[i] === ")") nivel++;
            if (operacion[i] === "(") nivel--;

            if (
                nivel === 0 &&
                /[*/]/.test(operacion[i])
            ) {
                posicion = i;
                break;
            }
        }
    }



    if (posicion === -1) {


        if (
            operacion.startsWith("(") &&
            operacion.endsWith(")")
        ) {

            let nivelParentesis = 0;
            let correcto = true;

            for (let i = 0; i < operacion.length; i++) {

                if (operacion[i] === "(") nivelParentesis++;
                if (operacion[i] === ")") nivelParentesis--;

                if (
                    nivelParentesis === 0 &&
                    i < operacion.length - 1
                ) {
                    correcto = false;
                    break;
                }
            }

            if (correcto) {
                return separarOperacion(
                    operacion.slice(1, -1)
                );
            }
        }

        return operacion;
    }


    const [nodo1, raiz, nodo2] = [
        operacion.slice(0, posicion),
        operacion[posicion],
        operacion.slice(posicion + 1)
    ];


    return [
        separarOperacion(nodo1),
        raiz,
        separarOperacion(nodo2)
    ];
};



const dibujarNodo = (nodo, id) => {


    if (!Array.isArray(nodo)) {

        return `
            <div class="col text-center">

                <p
                    id="nodo-${id}"
                    class="bg-success text-white
                    d-flex align-items-center
                    justify-content-center"
                    style="
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin: 10px auto;
                    "
                >
                    ${nodo}
                </p>

            </div>
        `;
    }



    const [nodo1, raiz, nodo2] = nodo;


    return `
        <div class="text-center">
            <p
                id="nodo-${id}"
                class="bg-warning
                d-flex align-items-center
                justify-content-center"
                style="
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 10px auto;
                "
            >
                ${raiz}
            </p>


            <!-- HIJOS -->
            <div class="row justify-content-around">

                <div class="col-5">
                    ${dibujarNodo(nodo1, id + "i")}
                </div>

                <div class="col-5">
                    ${dibujarNodo(nodo2, id + "d")}
                </div>

            </div>

        </div>
    `;
};



const conectarNodos = (nodo, id) => {

    if (!Array.isArray(nodo)) {
        return;
    }


    const [nodo1, raiz, nodo2] = nodo;

    lineas.push(
        new LeaderLine(
            document.getElementById(`nodo-${id}`),
            document.getElementById(`nodo-${id}i`),
            {
                startPlug: "disc",
                endPlug: "disc",
                color: "#8b772c",
                size: 5
            }
        )
    );

    conectarNodos(nodo1, id + "i");


    lineas.push(
        new LeaderLine(
            document.getElementById(`nodo-${id}`),
            document.getElementById(`nodo-${id}d`),
            {
                startPlug: "disc",
                endPlug: "disc",
                color: "#8b772c",
                size: 5
            }
        )
    );

    conectarNodos(nodo2, id + "d");
};



const dibujar_arbol = (expresionInput) => {

    expresionInput = expresionInput.replace(
        /[^0-9+\-*/()]/g,
        ""
    );

    expresion.value = expresionInput;


    lineas.map((linea) => {
        linea.remove();
    });

    lineas = [];


    arbol.innerHTML = "";


    if (expresionInput === "") {
        return;
    }

    if (!/[0-9]+[+\-*/]+[0-9]+/.test(expresionInput)) {
        return;
    }
    let expresionTamanio =
        separarOperacion(expresionInput);


    console.log(expresionTamanio);

    arbol.innerHTML = `
        <div
            class="container-fluid text-center"
            style="padding-top: 30px;"
        >
            ${dibujarNodo(expresionTamanio, "0")}
        </div>
    `;

    conectarNodos(expresionTamanio, "0");
};

expresion.addEventListener("input", (event) => {

    dibujar_arbol(event.currentTarget.value);

});