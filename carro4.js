'use strict';

(function() {
    window.addEventListener('load', function() {
        //comienza el baile
        let articulos = document.querySelectorAll('#item_container > div')
        let articulosComprados = document.querySelectorAll('#cart_items > div');
        let carrito = document.getElementById("cart_items");

        let cantidadRestante = 10;
        
        let comprar = function(event) {
            // Crear un nuevo nodo con el elemento comprado
            let articuloComprado = this.cloneNode(true);
            articuloComprado.id = "c" + articuloComprado.id;
            // Añadir el nuevo nodo al carrito si hay stock
            let cantidad = articuloComprado.querySelector('.stock')
            let stock = cantidad.innerHTML.slice(6, cantidad.innerHTML.length);

            if (stock > 0){
                carrito.appendChild(articuloComprado);
            }

            // Eliminar la label stock
            let labelStock = document.querySelectorAll('#cart_items > div > .stock');
            labelStock.forEach(labelStock => labelStock.style.display = 'none');

            //Añadir el delete
            let aspaBorrar = document.createElement('a');
            aspaBorrar.href ="";
            aspaBorrar.className = 'delete';
            
            articuloComprado.appendChild(aspaBorrar);
            //Y ponerlo arriba
            let imagen = articuloComprado.querySelector("img")
            articuloComprado.insertBefore(aspaBorrar, imagen)

            //Disminuyo el stock
            let labelStock2 = this.querySelector('#item_container > div > .stock');
            cantidadRestante--;
            labelStock2.innerHTML = "Stock " + cantidadRestante;
        //---------------------------------------

        let aspas = document.querySelectorAll("#cart_items > div > a");
        console.log(aspas);
        
        let borrarArticulo = function(event) {
            event.preventDefault();
            let articulosComprados = document.querySelectorAll('#cart_items > div');
            console.log(articulosComprados);
            let elementoPadre = this.id;
            console.log(elementoPadre.innerHTML);
            }
            aspas.forEach(aspas =>
                aspas.addEventListener('click', borrarArticulo));
        }
        
        articulos.forEach(articulos => 
            articulos.addEventListener('dblclick', comprar));
    });
})();