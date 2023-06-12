//FRONT
//El front no abre la conexion, recibe y envia.
const socket = io();

socket.on("msg_back_to_front", (data) => { //El front ataja el mensaje del back
  //console.log(JSON.stringify(data));
  // socket.emit("msg_front_to_back", { //El front emite un mensaje hacia el back
  //   msg: Date.now() + " hola desde el front al socket",
  });


  document.addEventListener('DOMContentLoaded', function() {
    var productForm = document.getElementById('product-form');
    var productTemplate = document.getElementById('product-template').innerHTML;
    var compiledTemplate = Handlebars.compile(productTemplate);

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var productData = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            code: document.getElementById('code').value,
            stock: document.getElementById('stock').value
        };

        var renderedTemplate = compiledTemplate(productData);
        document.body.insertAdjacentHTML('beforeend', renderedTemplate);

        productForm.reset();
    });
});