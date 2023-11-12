let alumnos = []; 

function containsOnlyLetters(palabra) {
  let lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(palabra);
}

function calcularInasistenciasTotales(inasF, inasM) {
  return inasF + inasM;
}

function calcularTotalAlumnos(cantAlF, cantAlM) {
  return cantAlF + cantAlM;
}

function calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF) {
  return diasHabiles * cantAlF - inasF;
}

function calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM) {
  return diasHabiles * cantAlM - inasM;
}

function calcularAsistenciaTotal(asisF, asisM) {
  return asisF + asisM;
}

function calcularAsistenciaFMedia(asisF, diasHabiles) {
  return asisF / diasHabiles;
}

function calcularAsistenciaMMedia(asisM, diasHabiles) {
  return asisM / diasHabiles;
}

function calcularAsistenciaMediaTotal(asisF, asisM, diasHabiles) {
  return (asisF + asisM) / (2 * diasHabiles);
}

function calcularAsistenciaPerfecta(totalAlumnos, diasHabiles) {
  return totalAlumnos * diasHabiles;
}

function calcularPorcentajeAsistencia(asisTotal, asistenciaPerfecta) {
  return (asisTotal / asistenciaPerfecta) * 100;
}

function alumno(nombre, edad, genero) {
  this.nombre = nombre;
  this.edad = edad;
  this.genero = genero;
  this.asistencia = [0];
}

function agregarAlumno() {
  let nombre = prompt("Ingrese el nombre del alumno:");
  // LLamo a funcion para validar que solo haya letras en el nombre
  let esPalabra= containsOnlyLetters(nombre);
  if (esPalabra==false) {
    console.log("Error: No puede haber numeros en el nombre");
    return;
  }

  // Validar que el genero sea 'femenino' o 'masculino' (mayúsculas y camelCase)
  let genero = prompt("Ingrese el género del alumno:");
  if (!/^(femenino|masculino|[Ff]emenino|[Mm]asculino)$/.test(genero)) {
    console.log("Error: El género debe ser 'femenino' o 'masculino'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  // Validar que la edad sea un número
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  } 

  // Verificar si el nombre del alumno ya existe
  const alumnoExistente = alumnos.find(alumno => alumno.nombre === nombre);
  if (!alumnoExistente) {
    alumnos.push({ 
      nombre: nombre, 
      edad: edad, 
      genero: genero, 
      asistencia: [0] 
    });
    console.log("¡Alumno agregado exitosamente!");
  } else {
    console.log("¡El alumno ya existe!");
  }
}

function eliminarAlumno() {
  // Mostrar confirmación antes de eliminar
  let nombre= prompt("¿Que alumno desea eliminar?");
  const confirmar = confirm(`¿Estás seguro de eliminar al alumno ${nombre}?`);
  if (confirmar) {
    alumnos = alumnos.filter(alumno => alumno.nombre !== nombre);
    console.log(`Alumno ${nombre} eliminado con éxito.`);
  }
}

function actualizarAlumno() {
  let nombre = prompt("Ingrese el nombre del alumno:");
  let esPalabra= containsOnlyLetters(nombre);
  if (esPalabra==false) {
    console.log("Error: No puede haber numeros en el nombre");
    return;
  }

  let genero = prompt("Ingrese el género del alumno:");
  if (!/^(femenino|masculino|[Ff]emenino|[Mm]asculino)$/.test(genero)) {
    console.log("Error: El género debe ser 'femenino' o 'masculino'.");
    return;
  }

  let edad = parseInt(prompt("Ingrese la edad del alumno:"));
  if (typeof edad !== 'number' || isNaN(edad)) {
    console.log("Error: La edad debe ser un número.");
    return;
  } 

  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    // Actualizar los datos del alumno
    alumnos[index].edad = edad;
    alumnos[index].genero = genero;
    console.log(`Alumno ${nombre} actualizado con éxito.`);
  } else {
    console.log(`Error: No se encontró al alumno ${nombre}.`);
  }
}


function cargarAsistencia(nombre, fecha, presente) {
  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    alumnos[index].asistencia.push({ fecha: fecha, presente: presente });
    console.log(`Asistencia registrada para el alumno ${nombre}.`);
  }
}

function calcularAsistenciaAlumno(nombre) {
  const index = alumnos.findIndex(alumno => alumno.nombre === nombre);
  if (index !== -1) {
    const asistencia = alumnos[index].asistencia;
    const totalDias = asistencia.length;
    const diasPresente = asistencia.filter(dia => dia.presente).length;
    const porcentajeAsistencia = (diasPresente / totalDias) * 100;
    return porcentajeAsistencia.toFixed(2) + "%";
  } else {
    return "El alumno no existe.";
  }
}

function calcularAsistenciaPromedioTotal() {
  if (alumnos.length === 0) {
    return "No hay alumnos registrados.";
  }

  let totalPorcentaje = 0;
  for (let i = 0; i < alumnos.length; i++) {
    const porcentaje = parseFloat(calcularAsistenciaAlumno(alumnos[i].nombre));
    totalPorcentaje += porcentaje;
  }

  const promedio = totalPorcentaje / alumnos.length;
  return promedio.toFixed(2) + "%";
}

let continuar = true;

// Menú de opciones
while (continuar) {
  console.log("----------------------");
  console.log("Seleccione una opción:");
  console.log("1. Calcular asistencia para su Curso");
  console.log("2. Saludo");
  console.log("3. Gestion de Alumnos");
  console.log("4. Ingresar Asistencia de Alumno");
  console.log("5. Mostrar Lista de Alumnos");
  console.log("6. Asistencia Promedio del curso")
  console.log("7. Salir");
  console.log("----------------------");

let opcion = parseInt(prompt("Ingrese el número de la opción deseada:"));
  
    switch (opcion) {
      case 1:
        let diasHabiles = parseInt(prompt("Ingrese el número de días hábiles:"));
        let cantAlF = parseInt(prompt("Ingrese la cantidad de alumnos femeninos:"));
        let cantAlM = parseInt(prompt("Ingrese la cantidad de alumnos masculinos:"));
        let inasF = parseInt(prompt("Ingrese la cantidad de inasistencias femeninas:"));
        let inasM = parseInt(prompt("Ingrese la cantidad de inasistencias masculinas:"));
  
        let asisF = calcularAsistenciaFemenina(diasHabiles, cantAlF, inasF);
        let asisM = calcularAsistenciaMasculina(diasHabiles, cantAlM, inasM);
        let asisTotal = calcularAsistenciaTotal(asisF, asisM);
        let porcentajeAsistencia = calcularPorcentajeAsistencia(asisTotal, calcularAsistenciaPerfecta(calcularTotalAlumnos(cantAlF, cantAlM), diasHabiles));
  
        console.log("Asistencia para el Curso:");
        console.log("- Asistencia Femenina: " + asisF);
        console.log("- Asistencia Masculina: " + asisM);
        console.log("- Asistencia Total: " + asisTotal);
        console.log("- Porcentaje de Asistencia: " + porcentajeAsistencia.toFixed(2) + "%");
        break;
  
      case 2:
        let nombreProfesor = prompt("Hola profesor/a. Por favor digame su nombre:");
        alert("Hola " + nombreProfesor);
        break;
  
      case 3:
        let accion;
        while (true) {
            console.log("Gestion de Alumnos");
            console.log("1- Agregar Alumno");
            console.log("2- Modificar alumno");
            console.log("3- Eliminar alumno");
            console.log("Presione cualquier letra para salir");
        
            accion = prompt("Ingrese opción (1/2/3)");
        
            if (accion === "1") {
                agregarAlumno();
            } else if (accion === "2") {
                actualizarAlumno();
            } else if (accion === "3") {
                eliminarAlumno();
            } else {
                // Si la opción no es 1, 2 o 3 se sale del bucle
                break;
            }
        }
        break;
  
      case 4:
        let nombreAlumno = prompt("Ingrese el nombre del alumno:");
        let fechaAsistencia = prompt("Ingrese la fecha de la asistencia (YYYY-MM-DD):");
        let presente = confirm("¿El alumno estuvo presente?");
        cargarAsistencia(nombreAlumno, fechaAsistencia, presente);
        console.log("Asistencia registrada con éxito.");
        break;
  
      case 5:
        console.log("Lista de Alumnos:");
        alumnos.forEach(alumno => {
          console.log("Nombre: " + alumno.nombre);
          console.log("Edad: " + alumno.edad);
          console.log("Género: " + alumno.genero);
          console.log("Porcentaje de Asistencia: " + calcularAsistenciaAlumno(alumno.nombre));
          console.log("--------------");
        });
        break;
  
      case 6:
        console.log("Asistencia Promedio del curso")
        const promedioTotal = calcularAsistenciaPromedioTotal();
        console.log("Asistencia Promedio de Todos los Alumnos: " + promedioTotal);
        break;
    
      case 7:
        // Salir del programa
        console.log("¡Hasta luego!");
        continuar = false;
        break;
          
      default:
        console.log("Opción no válida. Por favor, ingrese una opción válida.");
    }
  }
  