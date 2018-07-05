var contTabla =0;
var cantEt = 0;
var userId = 0;
var myvar = 'variableeeee'
function iniciar(etiquetas,contTa,uId) {
//Guardarmos elementos para usarlos mas facilmente
if (!window.location.href.includes(uId)){
  window.location.href = '/'+uId;
}
inputDescripcion = document.getElementById('descripcion')
inputPrecio = document.getElementById('precio')
tablaProductos = document.getElementById('tabla')
botonAgregar = document.getElementById('botonAgregar')
botonImprimir = document.getElementById('botonImprimir')
selector = document.getElementById('selector')
userId = uId
if (etiquetas > 0){
    selector.value = etiquetas;
    //selector.disabled = true;
    setCantEt(etiquetas)
  }
if (contTa > 0){
  setContTa(contTa)
}
contarItems();
desactivarOpcionesSelector(selector,contTa)
}   

function setContTa(contTa){
  contTabla = contTa
}

function setCantCaracteres(opcion){
  maxCant = 0
  switch (opcion){
    case '1': maxCant = 30; break;
    case '2': maxCant = 30; break;
    default: maxCant = 30;
  }
  inputDescripcion.maxLength = maxCant;

}
function setCantEt(etiquetas,caracteres){
  cantEt = etiquetas
  $.ajax({
    type: "POST",
    url: "/items/"+userId,
    timeout: 5000,
    data: { etiquetas: etiquetas, userId },
    success: function () {
  },
    error: function(jqXHR, textStatus, errorThrown) {
      window.location.href = '/'+userId
      document.getElementById('notificationText').innerHTML = 'No pudimos establecer la cantidad de etiquetas, por favor vuelve a intentarlo'
      document.getElementById('dangerNotification').hidden = false        

      //alert("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
});
contarItems();
}

function desactivarOpcionesSelector(selector,cantProd) {
  var op = selector.getElementsByTagName("option");
for (var i = 0; i < op.length; i++) {
  // lowercase comparison for case-insensitivity
  (op[i].value < cantProd) 
    ? op[i].disabled = true 
    : op[i].disabled = false ;
}
}



function agregaProducto(accion,pos) {

  //creamos y agregamos productos como objetos a la lista
  descripcion = inputDescripcion.value,
  precio = inputPrecio.value
  //reiniciamos los inputs
  inputDescripcion.value = '';
  inputPrecio.value = ''; 
  inputDescripcion.focus(); //hacemos foco en el nombre

  $(function() {
    // body...
    $.ajax({
        type: "POST",
        url: "/items/"+userId,
        timeout: 5000,
        data: { descripcion,precio,accion,pos,userId },
        success: function (result) {
          document.getElementById('dangerNotification').hidden = true        
          contT =0
          if (accion == 'add'){
            contTabla += 1;
          }
          else if (accion == 'del'){
            contTabla -= 1;
          }
          $('tbody').empty();
          for (data in result) {

            $('tbody').append('<tr><td>'+result[data].descripcion +'</td><td>'+ result[data].precio + '</td><td><span onclick="agregaProducto(\''+"del"+'\',\''+contT+'\')" class="icon has-text-danger button"><i class="fas fa-times fa-2"></i></span></td></tr>');
            contT += 1
          }
            desactivarOpcionesSelector(selector,contT)
            contarItems()

      },
        error: function(jqXHR, textStatus, errorThrown) {
          window.location.href = '/'+userId
          document.getElementById('notificationText').innerHTML = 'No pudimos agregar o borrar el ultimo Producto \n por favor volver a intentarlo!'
          document.getElementById('dangerNotification').hidden = false        }
    });
})
}

function imprimir() {
  window.location.href='/labels/'+userId
}

function contarItems(){
  //Cuenta la catidad de items que se van agregando para bloquear la posibilidad de que se 
  //agreguen mas items de los que se deberia
  if (contTabla >= cantEt || cantEt == 0) {
    botonAgregar.disabled = true;
    inputDescripcion.disabled = true;
    inputPrecio.disabled = true;
  }
  else{
    botonAgregar.disabled = false;
    inputDescripcion.disabled = false;
    inputPrecio.disabled = false;

  }
  if (contTabla >= 1){
    botonImprimir.disabled = false;
  }
  else{
    botonImprimir.disabled = true;
  }
}

function reestablecer(userId) {
  //reestablece todo
  var accion = 'delAll';
  $.ajax({
    type: "POST",
    url: "/items/"+userId,
    timeout: 5000,
    data: { accion, userId },
    success: function (result) {
      $('tbody').empty();
      $('botonImprimir').disabled = true
      contarItems()
      contTa = 0

  },
    error: function(jqXHR, textStatus, errorThrown) {
      window.location.href = '/'+userId
      document.getElementById('notificationText').innerHTML = 'hubo un problema al intentar reestablecer los productos, por favor vuelve a intentarlo'
      document.getElementById('dangerNotification').hidden = false 
       // alert("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
})
  selector.selectedIndex = 0;
  selector.disabled = false
  contTabla =0;
  contarItems();
}