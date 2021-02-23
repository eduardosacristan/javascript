'use strict';

(function() {
    window.addEventListener('load', function() {
        //comienza el baile
        let articulos = document.querySelectorAll('#item_container > div')
        let articulosComprados = document.querySelectorAll('#cart_items > div');
        let carrito = document.getElementById("cart_items");

        let compras = document.querySelector('input');
        compras.value = 0;

        let total = document.querySelector("#cprice");
        total.value = 0 + " €";

        let compraTotal = 0;
        
        let comprar = function(event) {
            // Crear un nuevo nodo con el elemento comprado
            let articuloComprado = this.cloneNode(true);

            //cambio cursor
            

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

            if (stock > 0) {
                stock--;
                labelStock2.innerHTML = "Stock " + stock;
            }

            //aumento el valor de compras

            if (stock > 0) {
                let compras = document.querySelector('input');
            compras.value++;

            //calculo el precio final
            //let total = document.querySelector("#cprice");
            let labelPrecio = this.querySelector('.price');
            let precio = Number(labelPrecio.innerHTML.slice(0, 
                labelPrecio.innerHTML.length - 2));

            compraTotal += precio;
            
            total.value = compraTotal + " €";
            }
            
        //---------------------------------------

        let aspas = document.querySelectorAll("#cart_items > div > a");
        
        let borrarArticulo = function(event) {
            //para evitar que sea un enlace
            event.preventDefault();
            //obtengo el id del articulo padre
            let idArticuDeLaLista = this.parentNode.id.slice(1) ;
            //y sumarle 1 al stock
            //busco el stock....
            let articuloOriginal = document.getElementById(idArticuDeLaLista);
            console.log(articuloOriginal);
            //let stockArticuloOriginal = 
            //let compras = document.querySelector('input');
            compras.value--;
            
            let labelPrecio2 = this.parentNode.querySelector('.price');
            
            let precio2 = Number(labelPrecio2.innerHTML.slice(0, 
            labelPrecio2.innerHTML.length - 2));
            console.log(precio2);

            compraTotal -= precio2;
            total.value = compraTotal + " €";
                
            //this.parentNode.style.display = 'none';
            carrito.removeChild(articuloComprado);

            }
            aspas.forEach(aspas =>
                aspas.addEventListener('click', borrarArticulo));

           
        }
        

        articulos.forEach(articulos => 
            articulos.addEventListener('dblclick', comprar));
    });
})();