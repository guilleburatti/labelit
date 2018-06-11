var contTabla =0;
var cantEt = 0;
function iniciar(etiquetas,contTa) {
//Guardarmos elementos para usarlos mas facilmente
inputDescripcion = document.getElementById('descripcion')
inputPrecio = document.getElementById('precio')
tablaProductos = document.getElementById('tabla')
botonAgregar = document.getElementById('botonAgregar')
botonImprimir = document.getElementById('botonImprimir')
selector = document.getElementById('selector')
if (etiquetas > 0){
    selector.selectedIndex = etiquetas;
    selector.disabled = true;
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
    url: "/items",
    timeout: 2000,
    data: { etiquetas: etiquetas },
    success: function () {
      console.log('setted Etiquetas')
  },
    error: function(jqXHR, textStatus, errorThrown) {
        alert(JSON.stringify(jqXHR));
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

  $(function() {
    // body...
    $.ajax({
        type: "POST",
        url: "/items",
        timeout: 2000,
        data: { descripcion,precio,accion },
        success: function (result) {
          if (accion == 'add'){
            contTabla += 1;
          }
          else if (accion == 'del'){
            contTabla -= 1;
          }
          $('tbody').empty();
          for (data in result) {
            $('tbody').append('<tr><td>'+result[data].descripcion +'</td><td>'+ result[data].precio + '</td><td><span onclick="agregaProducto(\''+"del"+'\',\''+contTabla+'\')" class="icon has-text-danger button"><i class="fas fa-times fa-2"></i></span></td></tr>');
            }
            contarItems()

      },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(JSON.stringify(jqXHR));
            alert("AJAX error: " + textStatus + ' : ' + errorThrown);
        }
    });
})
}

function imprimir() {
  window.location.href='/labels'
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

function reestablecer() {
  //reestablece todo
  $.ajax({
    type: "POST",
    url: "/items",
    timeout: 2000,
    data: { accion:'delAll' },
    success: function (result) {
      $('tbody').empty();
      $('botonImprimir').disabled = true
      contarItems()

  },
    error: function(jqXHR, textStatus, errorThrown) {
        alert(JSON.stringify(jqXHR));
        alert("AJAX error: " + textStatus + ' : ' + errorThrown);
    }
})
  selector.selectedIndex = 0;
  selector.disabled = false
  setCantEt(0);
  contTabla =0;
  contarItems();
}