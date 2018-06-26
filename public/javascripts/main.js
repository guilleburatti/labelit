var contTabla =0;
var cantEt = 0;
var userId = 0;
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
    console.log(selector.selectedIndex)
    //selector.disabled = true;
    setCantEt(etiquetas)
  }
if (contTa > 0){
  setContTa(contTa)
}
console.log('cont Ta> '+contTa)
contarItems();

}   

function setContTa(contTa){
  contTabla = contTa
}
function setCantEt(etiquetas){
  cantEt = etiquetas
  $.ajax({
    type: "POST",
    url: "/items/"+userId,
    timeout: 5000,
    data: { etiquetas: etiquetas, userId },
    success: function () {
      console.log('setted Etiquetas')
  },
    error: function(jqXHR, textStatus, errorThrown) {
      window.location.href = 'error/'
      alert("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
});
contarItems()
}

function agregaProducto(accion,pos) {

  //creamos y agregamos productos como objetos a la lista
  descripcion = inputDescripcion.value,
  precio = inputPrecio.value
  //reiniciamos los inputs
  inputDescripcion.value = '';
  inputPrecio.value = ''; 
  inputDescripcion.focus(); //hacemos foco en el nombre
  console.log('la posicion es' + pos)

  $(function() {
    // body...
    $.ajax({
        type: "POST",
        url: "/items/"+userId,
        timeout: 2000,
        data: { descripcion,precio,accion,pos,userId },
        success: function (result) {
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
            console.log('set label')
            contarItems()

      },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = 'error/'
            alert("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
})
}

function imprimir() {
  window.location.href='/labels/'+userId
}

function contarItems(){
  //Cuenta la catidad de items que se van agregando para bloquear la posibilidad de que se 
  //agreguen mas items de los que se deberia
  console.log('contTa: '+ contTabla)
  console.log('cantEt: '+ cantEt)
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
    timeout: 2000,
    data: { accion, userId },
    success: function (result) {
      $('tbody').empty();
      $('botonImprimir').disabled = true
      contarItems()

  },
    error: function(jqXHR, textStatus, errorThrown) {
      window.location.href = 'error/';
      alert("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
})
  selector.selectedIndex = 0;
  selector.disabled = false
  contTabla =0;
  contarItems();
}