lista = [];
cantEtiquetas = 0;

function iniciar() {
//Guardarmos elementos para usarlos mas facilmente
inputDescripcion = document.getElementById('descripcion')
inputPrecio = document.getElementById('precio')
tablaProductos = document.getElementById('tabla')
botonAgregar = document.getElementById('botonAgregar')
botonImprimir = document.getElementById('botonImprimir')
}

function agregaProducto() {
  //creamos y agregamos productos como objetos a la lista
  producto = {};
  producto.descripcion = inputDescripcion.value;
  producto.precio= inputPrecio.value;
  lista.push(producto);
  escribirLista()
  //reiniciamos los inputs
  inputDescripcion.value = '';
  inputPrecio.value = '';
  inputDescripcion.focus(); //hacemos foco en el nombre 
  contarItems();
  getListLength();
}
function escribirLista(){
  //generamos un string con la tabla y la insertamos
  tabla = ''
  for(var i=0; i<lista.length; i++){
    tabla += "<tr><td>"+lista[i].descripcion+"</td><td>"+lista[i].precio+"</td></tr>"
  }
  tablaProductos.innerHTML = tabla;
}

function imprimir() {
  console.log("la lista es" + lista[0].descripcion)
}

function contarItems(){
  if (lista.length >= cantEtiquetas || cantEtiquetas == 0) {
    botonAgregar.disabled = true;
    inputDescripcion.disabled = true;
    inputPrecio.disabled = true;
  }
  else{
    botonAgregar.disabled = false;
    inputDescripcion.disabled = false;
    inputPrecio.disabled = false;

  }
}

function setEtiquetas(cant){
  getListLength()
  cantEtiquetas = cant;
  contarItems();
}

function reestablecer() {
  lista = []
  cantEtiquetas = 0
  elementos = document.getElementsByClassName('desactivable')
  for (i = 0; i < elementos.length; i++) {
    elementos[i].disabled = true;
    if (elementos[i].name === 'selector'){
      elementos[i].disabled =false
      elementos[i].value = 0
    }
  }
  tabla = ''
  tablaProductos.innerHTML = '';
  contarItems();
}

function getListLength() {
  if (lista.length > 0){
    botonImprimir.disabled = false;
  }
}
