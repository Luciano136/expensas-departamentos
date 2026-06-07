// Array para almacenar los datos de los departamentos
const departments = [];

// Array para crear los pisos
const pisos = [];

// Tabla donde se agregarán los departamentos
const tableBody = document.querySelector("#data-table tbody");

// Categoria de expensas
const prices = {
  Bajo: 100,
  Medio: 200,
  Alto: 300
};

// Función para agregar una fila a la tabla
function addRow() {
  const metrosInput = document.getElementById("metros");
  const metrosCuadrados = parseInt(metrosInput.value);
  const piso = parseInt(document.getElementById("piso").value);  // lo agregue para guardar el piso
  const letra = document.getElementById("letra").value.toUpperCase(); // lo agregue para guardar la letra


  // Validación de entrada
  if (isNaN(metrosCuadrados) || metrosCuadrados <= 0) {
    alert("Por favor, ingrese un valor válido para los metros cuadrados.");
    return;
  }

  // Validación de piso
  if (isNaN(piso) || piso <= 0) {  // lo agregue
    alert("Por favor, ingrese un piso válido.");  // lo agregue
    return;  // lo agregue
}

  // Validacion de letra y no numero
if (!/^[A-Z]$/.test(letra)) {
  alert("Ingrese una letra válida para el departamento.");
  return;
}

// Validar que no exista el departamento -- NUEVO
const id = `${piso}${letra}`;

const existe = departments.some(
  dept => dept.id === id
);

if (existe) {
  alert(`El departamento ${id} ya existe.`);
  return;
}

  // Categoría de expensas según los metros cuadrados
  let category;
  if (metrosCuadrados <= 50) {
    category = "Bajo";
  } else if (metrosCuadrados <= 100) {
    category = "Medio";
  } else {
    category = "Alto";
  }

  // Guardar los datos en el array
  const departamento = ({
    numero: Date.now(),
    id, // lo agregue
    piso, // lo agregue
    letra, // lo agregue
    metrosCuadrados,
    category,
});

departments.push(departamento);

agregarDepartamentoAPiso(departamento);

  // Crear una nueva fila en la tabla
  const row = document.createElement("tr");

  // Piso + Letra
  const cellId = document.createElement("td"); // lo agregue
  cellId.textContent = `${piso}${letra}`; // lo agregue

  // Celda para el piso
  const cellPiso = document.createElement("td"); // lo agregue
  cellPiso.textContent = piso; // lo agregue

  // Celda para la letra del departamento
  const cellDepto = document.createElement("td"); // lo agregue
  cellDepto.textContent = letra; // lo agregue

  // Celda para los metros cuadrados
  const cellMetros = document.createElement("td");
  cellMetros.textContent = metrosCuadrados;

  // Celda para la categoría de expensas
  const cellCategory = document.createElement("td");
  cellCategory.textContent = `${category} (${prices[category]} USD)`;
  cellCategory.classList.add("category");

  // Agregar celdas a la fila
  row.appendChild(cellId);  // lo agregue
  row.appendChild(cellPiso);  // lo agregue
  row.appendChild(cellDepto);  // lo agregue
  row.appendChild(cellMetros);
  row.appendChild(cellCategory);

  // Agregar la fila a la tabla
  tableBody.appendChild(row);

  // Limpiar el campo de entrada
document.getElementById("metros").value = "";
document.getElementById("piso").value = "";
document.getElementById("letra").value = "";
}

// Función para mostrar el resumen de las categorías
function showSummary() {
  // Obtener los contenedores para cada categoría
  const lowCategoryList = document.getElementById("low-category");
  const mediumCategoryList = document.getElementById("medium-category");
  const highCategoryList = document.getElementById("high-category");

  // Limpiar las listas previas
  lowCategoryList.innerHTML = "";
  mediumCategoryList.innerHTML = "";
  highCategoryList.innerHTML = "";

  // Clasificar y mostrar departamentos según la categoría
  departments.forEach((dept) => {
    const listItem = document.createElement("li");
  //  listItem.textContent = `Departamento ${dept.numero}: ${dept.metrosCuadrados} m²`; lo saque
    listItem.textContent = `Departamento ${dept.id}: ${dept.metrosCuadrados} m²`; // lo agregue

    if (dept.category === "Bajo") {
      lowCategoryList.appendChild(listItem);
    } else if (dept.category === "Medio") {
      mediumCategoryList.appendChild(listItem);
    } else if (dept.category === "Alto") {
      highCategoryList.appendChild(listItem);
    }
  });

  // Mostrar el resumen
  document.getElementById("result").style.display = "block";
}

// ACA AGREGUE PARA CREAR LOS PISOS

function agregarDepartamentoAPiso(departamento) {

  let pisoExistente = pisos.find(
    piso => piso.numero === departamento.piso
  );

  if (!pisoExistente) {

    pisoExistente = {
      numero: departamento.piso,
      departamentos: []
    };

    pisos.push(pisoExistente);
  }

  pisoExistente.departamentos.push(departamento);
}

function mostrarPisos() {

  const container = document.getElementById("pisos-container");

  container.style.display = "block";

  container.innerHTML = `
    <h2>Pisos del Edificio</h2>
    <table>
      <thead>
        <tr>
          <th>Piso</th>
          <th>Departamentos</th>
        </tr>
      </thead>
      <tbody id="pisos-body">
      </tbody>
    </table>
  `;

  const tbody = document.getElementById("pisos-body");

  const pisosOrdenados = [...pisos].sort(
    (a, b) => b.numero - a.numero
  );

  pisosOrdenados.forEach(piso => {

    const row = document.createElement("tr");

    const cellPiso = document.createElement("td");
    cellPiso.textContent = piso.numero;

    const cellDeptos = document.createElement("td");

    cellDeptos.textContent = piso.departamentos
      .map(depto => depto.id)
      .join(", ");

    row.appendChild(cellPiso);
    row.appendChild(cellDeptos);

    tbody.appendChild(row);
  });
}
