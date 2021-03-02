'use strict';

(function() {
    //Articulos que hay a la venta:
    let articulos = document.querySelectorAll('#item_container > div');

    //Articulos que hay en el carrito;
    let carrito = document.getElementById("cart_items");

    //rectangulo inicial del carrito:
    let rectanguloInicial = carrito.getBoundingClientRect();
    let desplazamiento = 50;
    let anchoArticulo = 120;

    window.addEventListener('load', function() {

        //creo la funcion comprar asociada al evento doble click
        let comprar = function(){
            //primero compruebo el stock
            let stock = this.querySelector(".stock")
            let cantidadRestante = Number(stock.innerHTML.substr(6));
            
            
            if(cantidadRestante > 0) {
                let articuloComprado = this.cloneNode(true);
                //a esa copia le cambio el id
                articuloComprado.id = "c" + articuloComprado.id;
                //cambio el cursor 
                articuloComprado.style.cursor = 'default';
                //creadorDeAspas(articuloComprado);
                //Le creo el aspa
                let aspa = document.createElement("a");
                //y le doy atributos
                aspa.href ="";
                aspa.className = 'delete';
                //pongo el aspa la primera
                let imagen = articuloComprado.querySelector("img");
                articuloComprado.insertBefore(aspa, imagen);

                //Inserto el nuevo articulo en el carrito
                carrito.appendChild(articuloComprado);

                borraStock();
                actualizaTotales();
                disminuyeStock(this);
                borrarArticulo(articuloComprado, aspa);
                vaciarCarrito();
                actualizarAncho();
            }
        }

        let borraStock = function() {
            let labelStock = document.querySelectorAll("#cart_items > div > .stock");
            labelStock.forEach(labelStock => labelStock.style.display = 'none');
        }

        let actualizaTotales = function (){
            let numeroArticulosComprados = document.querySelectorAll("#cart_items > div").length;
            document.querySelector("#citem").value = numeroArticulosComprados;
            
            let labelPreciosComprados = document.querySelectorAll("#cart_items > div > .price");
            let sumaPrecios = 0;
            for(let i = 0; i < labelPreciosComprados.length; i++){
                sumaPrecios += Number(labelPreciosComprados[i].innerHTML.replace(/ €/,""));
            }
            console.log(sumaPrecios);
            let marcadorTotal = document.querySelector("#cprice");
            marcadorTotal.value = sumaPrecios + " €";
        }

        let disminuyeStock = function(estaCosa) {
            let stockRestante = estaCosa.querySelector('.stock');
            let stock = Number(stockRestante.innerHTML.substr(6));
            if (stock > 0) {
                stock--;
                stockRestante.innerHTML = "Stock " + stock;
            }
            if (stock == 0) {
                stockRestante.style.textDecoration = 'line-through';
            }
        }

        let borrarArticulo = function(estaCosa, aspa) {
            aspa.addEventListener('click', function() {
                //primero evito que el aspa sea un enlace
                event.preventDefault();
                //luego accedo a la clase padre para trastear con el stock
                let idClasePadre = estaCosa.id.substr(1);
                let labelStock = document.querySelector("#" + idClasePadre + "> .stock");
                let stock = labelStock.innerHTML.substr(6);
                stock++;
                labelStock.innerHTML = "Stock " + stock;
                console.log(stock);
                //hay que eliminar el tachado si hay stock!
                if(stock > 0) {
                    labelStock.style.textDecoration = "none";
                }
                //elimino el articulo del carrito
                aspa.parentNode.remove();
                //hay que actualizar otra vez los totales
                actualizaTotales();

                //si borro un articulo hay que reducir el ancho del carrito
                let numeroArticulosEnCarrito = document.querySelectorAll("#cart_items > .item").length;
                
                if (numeroArticulosEnCarrito > 4) {
                    //esto va a ir a ojo porque no me sale el punto anterior
                    let style = window.getComputedStyle(carrito, '');
                    let anchoCarrito = parseInt(style.width);
                    console.log(anchoCarrito);
                    carrito.style.width = anchoCarrito - anchoArticulo + 'px';
                }
            })
        }
        
        let vaciarCarrito = function() {
            let botonClear = document.querySelector("#btn_clear");
            botonClear.addEventListener('click', function() {
                let todasLasAspas = document.querySelectorAll("#cart_items > div > a");
                todasLasAspas.forEach(todasLasAspas => todasLasAspas.click());
            })
        }

        articulos.forEach(articulos => 
            articulos.addEventListener('dblclick', comprar));

        //fiesta loca de colores en carrito
        let glob = 1;
        setInterval(function() {
            let numeroItemsEnCarro = 
                document.querySelectorAll("#cart_items > .item").length;

            if (numeroItemsEnCarro == 0) {
                if (glob % 2 == 0)
                    carrito.style.backgroundColor = "yellow";
                else
                    carrito.style.backgroundColor = "red";
            }
            glob++;
        }, 1000);

        //ahora al lio del desplazamiento del carrito

        let actualizarAncho = function() {
            let numeroArticulosEnCarrito = document.querySelectorAll("#cart_items > .item").length;
            
            if (numeroArticulosEnCarrito > 4) {
                let anchura = window.getComputedStyle(carrito, '');
                let ancho = parseInt(anchura.width);
                carrito.style.width = ancho + 120 + "px";
            }
        }

        //boton de desplazamiento izquierda:
        let botonIzquierda = document.querySelector("#btn_prev");

        botonIzquierda.addEventListener('click', function() {
            let style = window.getComputedStyle(carrito, '');
            let posicionIzquierda = parseInt(style.left);
            
            if (posicionIzquierda + desplazamiento <= 0)
                carrito.style.left = posicionIzquierda + desplazamiento + 'px';
            else 
                carrito.style.left = '0px';
        });

        //boton de desplazamiento derecha:
        let botonDerecha = document.querySelector("#btn_next");

        botonDerecha.addEventListener('click', function() {

            let style = window.getComputedStyle(carrito, '');
            let posicionIzquierda = parseInt(style.left);
            let posicionDerechaStyle = parseInt(style.right);
            let rectanguloCarrito = parseInt(style.width);
            
            if (posicionDerechaStyle < rectanguloInicial.right)
                carrito.style.left = 
                -(rectanguloCarrito - rectanguloInicial.width) + 'px';
            else
                carrito.style.left = posicionIzquierda - desplazamiento + 'px';
        });
    });
})();