// Local Storage para traer datos del usuario



let notasGuardadas;


checkLocal();


function checkLocal(){
    if(localStorage.getItem("notas-guardadas")){
        notasGuardadas= JSON.parse(localStorage.getItem("notas-guardadas"));
    } else {
        notasGuardadas = []
    }
    
}


console.log(notasGuardadas);


// Elementos HTML para crear una nota

const nuevaNotaForm = document.getElementById("nueva-nota-form");
const nuevaNotaTitulo = document.getElementById("nueva-nota-titulo");
const nuevaNotaDescripcion = document.getElementById("nueva-nota-descripcion");
const nuevaNotaGuardarBtn = document.getElementById("guardar-nota");
const resetearFormNotaBtn = document.getElementById("resetear-form-btn")

console.log(nuevaNotaTitulo.value);



// Asociar evento clic al boton guardar nota

nuevaNotaGuardarBtn.addEventListener("click", function(e){

    

    let nuevaNota = {
        id: notasGuardadas.length +1,
        titulo: nuevaNotaTitulo.value,
        descripcion: nuevaNotaDescripcion.value,
        realizada: false
    }

    notasGuardadas.push(nuevaNota);


    // Guardar nota en local storage

    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));

    console.log(notasGuardadas);

})


// Resetear form de nueva nota

resetearFormNotaBtn.addEventListener("click", function(e){
    e.preventDefault();
    nuevaNotaForm.reset();
})

// Eventos al input de buscar y checkbox realizadas
let btnBuscar = document.getElementById("btn-buscar");
let inputBuscar = document.getElementById("inputBuscar");
let checkRealizadas = document.getElementById("checkRealizadas");


// Elementos HTML para imprimir notas guardadas

const notasGuardadasHtml = document.getElementById("notas-guardadas-contenedor");

// Agregar evento al boton buscar

btnBuscar.addEventListener("click", function(e){
    e.preventDefault();
    notasGuardadasHtml.replaceChildren();
    filtrarNotas();
})

checkRealizadas.addEventListener("change", function(e){
    e.preventDefault();
    notasGuardadasHtml.replaceChildren();
    filtrarNotas();
});

filtrarNotas();


function filtrarNotas(){
    let arregloAImprimir;

    // buscar sin valor y check sin marcar
    if(inputBuscar.value === "" && !checkRealizadas.checked){
        arregloAImprimir = notasGuardadas;
        console.log("ingreso");
        imprimir(arregloAImprimir);
       
    } 
    
    else if(inputBuscar.value !== "" && !checkRealizadas.checked){
        console.log("ingreso");
        console.log(notasGuardadas);
        arregloAImprimir = notasGuardadas.filter(notas => 
            notas.titulo.toLowerCase().includes(inputBuscar.value.toLowerCase()));
           
            imprimir(arregloAImprimir);

          
        }
    
    //buscar sin valor y check marcado
    else if(inputBuscar.value == "" && checkRealizadas.checked){
        arregloAImprimir = notasGuardadas.filter(notas => notas.realizada === true);
        console.log("ingreso");
        imprimir(arregloAImprimir);
    }
      // buscar con valor y check marcado
    else {
        arregloAImprimir = notasGuardadas.filter(notas => notas.realizada === true && notas.titulo.toLowerCase().includes(inputBuscar.value.toLowerCase()));
        console.log("ingreso");
        imprimir(arregloAImprimir);
    }
}







// Imprimir notas guardadas

function imprimir(arregloAImprimir){
    console.log(arregloAImprimir);
    arregloAImprimir.forEach(element => {

        let notaGuardadaDiv = document.createElement("div");
        notaGuardadaDiv.classList.add("nota-guardada");
        notaGuardadaDiv.setAttribute("id", element.id);
        console.log(element);
        
    
        let label = document.createElement("label");
        label.innerText = element.titulo;
        let inputCheck = document.createElement("input");
        inputCheck.type = "checkbox";
        inputCheck.classList.add(element.id);
    
        label.appendChild(inputCheck);
    
        if(element.realizada){
            inputCheck.checked = true;
        } else {
            inputCheck.checked = false;
        }
    
        inputCheck.addEventListener("change", cambiarEstadoDeNota)
        label.appendChild(inputCheck);
    
        let descripcionNota = document.createElement("p");
        descripcionNota.classList.add("nota-guardada-descripcion");
    
        descripcionNota.innerText = element.descripcion;
    
    
        let borrarNotaBtn = document.createElement("button");
        borrarNotaBtn.innerText = "Borrar nota";
        borrarNotaBtn.classList.add(element.id);
        borrarNotaBtn.addEventListener("click", borrarNota)
    
    
        notaGuardadaDiv.appendChild(label);
        notaGuardadaDiv.appendChild(descripcionNota);
        notaGuardadaDiv.appendChild(borrarNotaBtn);
    
     
        notasGuardadasHtml.appendChild(notaGuardadaDiv);
    
        
    });
}




function cambiarEstadoDeNota(event){
    console.log(event.target.className)
    console.log(notasGuardadas);
    let buscarNota = notasGuardadas.find(e => e.id == event.target.className);
    

    if(buscarNota.realizada === true){
        buscarNota.realizada = false;
    } else {
        buscarNota.realizada = true;
    }

    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));
    location.reload()
}


function borrarNota(event){
    notasGuardadas = notasGuardadas.filter(notas => notas.id != event.target.className);
    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));
    location.reload();
}