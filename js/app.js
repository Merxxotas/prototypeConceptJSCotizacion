function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}
// Realiza la cotizacion con los datos ingresados
Seguro.prototype.cotizarSeguro = function () {
  /*
        1. americano = 1.15
        2. asiatico = 1.05
        3. europeo = 1.35
    */
  let cantidad;
  const base = 5000;
  console.log(this.marca);
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  //Leer el año
  const diferencia = new Date().getFullYear() - this.year;
  // Cada año que sea menor, el costo de la cotizacion se reducirá un 3%
  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  return cantidad;
  //   console.log(cantidad);
};
function UI() {}

//llenado de las opciones de los años

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");
  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

//Alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  // Insertando en el HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));
  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  const { marca, year, tipo } = seguro;
  let textoMarca;
  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;

    default:
      break;
  }
  const div = document.createElement("div");
  div.classList.add("mt-10");
  div.innerHTML = `
        <p class = "header">Tu Resumen es:</p>
        <p class = "font-bold">Marca: <span class ="font-normal">  ${textoMarca}</span></p>
        <p class = "font-bold">Año: <span class ="font-normal">  ${year}</span></p>
        <p class = "font-bold">Tipo: <span class ="font-normal capitalize">  ${tipo}</span></p>
        <p class = "font-bold">Total: <span class ="font-normal"> $ ${total}</span></p>
    `;
  const resultadoDiv = document.querySelector("#resultado");

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};

const ui = new UI();
// console.log(ui);

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); // Llena el select con los años (desde el año actual)...
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  //Leer la marca  seleccionada
  const marca = document.querySelector("#marca").value;
  //Leer el año seleccionado
  const year = document.querySelector("#year").value;
  //Leer el tipo de cobertura seleccionado
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  if (marca === "" || year === "" || tipo === "") {
    //  console.log("no paso...");
    ui.mostrarMensaje(
      "Todos los campos son necesarios, revisa de nuevo",
      "error"
    );
    return;
  }
  ui.mostrarMensaje("Cotizando...", "correcto");

  //ocultar las cotizaciones que ya se hicieron
  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }
  //   console.log("cotizando...");

  //instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();
  //   console.log(seguro);
  //Utilizar el prototype que se va a utilizar
  ui.mostrarResultado(total, seguro);
}
