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





// Elementos HTML para crear una nota

const nuevaNotaForm = document.getElementById("nueva-nota-form");
const nuevaNotaTitulo = document.getElementById("nueva-nota-titulo");
const nuevaNotaDescripcion = document.getElementById("nueva-nota-descripcion");
const nuevaNotaGuardarBtn = document.getElementById("guardar-nota");
const resetearFormNotaBtn = document.getElementById("resetear-form-btn")





// Asociar evento clic al boton guardar nota

nuevaNotaGuardarBtn.addEventListener("click", function(e){

    e.preventDefault();
    if(notasGuardadas.length === 0){
        elementId = 1;
    } else {
        elementId  = notasGuardadas[notasGuardadas.length - 1].id + 1;
    }
  

    let nuevaNota = {
        id: elementId,
        titulo: nuevaNotaTitulo.value,
        descripcion: nuevaNotaDescripcion.value,
        realizada: false
    }

    notasGuardadas.push(nuevaNota);

    nuevaNotaTitulo.value = "";
    nuevaNotaDescripcion.value = "";
    // Guardar nota en local storage

    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));
    notasGuardadas = JSON.parse(localStorage.getItem("notas-guardadas"));
    
    imprimir(notasGuardadas);


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

inputBuscar.addEventListener("keyup", function(e){
    e.preventDefault();
  
    filtrarNotas();
})

btnBuscar.addEventListener("click", function(e){
    e.preventDefault();
   
    filtrarNotas();
})

checkRealizadas.addEventListener("change", function(e){
    e.preventDefault();
   
    filtrarNotas();
});

filtrarNotas();


function filtrarNotas(){
    let arregloAImprimir;

   
    // buscar sin valor y check sin marcar
    if(inputBuscar.value === "" && !checkRealizadas.checked){
        arregloAImprimir = notasGuardadas;
   
        imprimir(arregloAImprimir);
       
    } 
    
    else if(inputBuscar.value !== "" && !checkRealizadas.checked){

        arregloAImprimir = notasGuardadas.filter(notas => 
            notas.titulo.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
            notas.descripcion.toLowerCase().includes(inputBuscar.value.toLowerCase()));
           
            imprimir(arregloAImprimir);

          
        }
    
    //buscar sin valor y check marcado
    else if(inputBuscar.value == "" && checkRealizadas.checked){
        arregloAImprimir = notasGuardadas.filter(notas => notas.realizada === true);
     
        imprimir(arregloAImprimir);
    }
      // buscar con valor y check marcado
    else {
        arregloAImprimir = notasGuardadas.filter(notas => notas.realizada === true && (notas.titulo.toLowerCase().includes(inputBuscar.value.toLowerCase()) || notas.descripcion.toLowerCase().includes(inputBuscar.value.toLowerCase())));
  
        imprimir(arregloAImprimir);
    }
}







// Imprimir notas guardadas

function imprimir(arregloAImprimir){
    notasGuardadasHtml.replaceChildren();

    arregloAImprimir.forEach(element => {

        let notaGuardadaDiv = document.createElement("div");
        notaGuardadaDiv.classList.add("nota-guardada");
        notaGuardadaDiv.setAttribute("id", element.id);
  
        
        let tituloNota = document.createElement("h3");

        tituloNota.innerText = element.titulo;
        
        let label = document.createElement("label");
        label.classList.add("nota-guardada-label")


       
        let inputCheck = document.createElement("input");
        inputCheck.type = "checkbox";
        inputCheck.classList.add(element.id);
    
        label.appendChild(inputCheck);
    
        if(element.realizada){
            label.innerText = "Hecha";
            inputCheck.checked = true;
            notaGuardadaDiv.classList.add("completa");
        } else {
            label.innerText = "Pendiente";
            inputCheck.checked = false;
            notaGuardadaDiv.classList.add("sinCompletar");
        }
    
        inputCheck.addEventListener("change", cambiarEstadoDeNota)
        label.appendChild(inputCheck);
    
        let descripcionNota = document.createElement("p");
        descripcionNota.classList.add("nota-guardada-descripcion");
    
        descripcionNota.innerText = element.descripcion;
    
    
        let borrarNotaBtn = document.createElement("button");
        borrarNotaBtn.innerText = "Borrar nota";
        borrarNotaBtn.classList.add(element.id);
        borrarNotaBtn.classList.add("btn");
        borrarNotaBtn.classList.add("btn-rojo");
        borrarNotaBtn.addEventListener("click", borrarNota)
    
        notaGuardadaDiv.appendChild(tituloNota);
        notaGuardadaDiv.appendChild(label);
        notaGuardadaDiv.appendChild(descripcionNota);
        notaGuardadaDiv.appendChild(borrarNotaBtn);
    
     
        notasGuardadasHtml.appendChild(notaGuardadaDiv);
    
        
    });
}




function cambiarEstadoDeNota(event){

    let buscarNota = notasGuardadas.find(e => e.id == event.target.className);
    

    if(buscarNota.realizada === true){
        buscarNota.realizada = false;
    } else {
        buscarNota.realizada = true;
    }

    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));
    notasGuardadas = JSON.parse(localStorage.getItem("notas-guardadas"));
    
    imprimir(notasGuardadas);
    
}


function borrarNota(event){
    
    notasGuardadas = notasGuardadas.filter(notas => notas.id != event.target.classList[0]);
    localStorage.setItem("notas-guardadas", JSON.stringify(notasGuardadas));
    notasGuardadas = JSON.parse(localStorage.getItem("notas-guardadas"));
    
    imprimir(notasGuardadas);
}