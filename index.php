<?php

$articulos = [
	
	[
		'identificador' => 'i1',
		'nombre' => 'Camiseta 1',
		'urlImagen' => 'img/camiseta1.jpg',
		'descripcion' => 'descripción_i1',
		'precio' => 20,
		'stock' => 10,
		'activo' => true
	],
	
	[
		'identificador' => 'i2',
		'nombre' => 'Reloj 1',
		'urlImagen' => 'img/reloj2.jpg',
		'descripcion' => 'descripcion_i2',
		'precio' => 24,
		'stock' => 10,
		'activo' => true
	],
	
	[
		'identificador' => 'i3',
		'nombre' => 'Camiseta 3',
		'urlImagen' => 'img/camiseta3.jpg',
		'descripcion' => 'descripcion_i3',
		'precio' => 18,
		'stock' => 10,
		'activo' => true
	],	

	[
		'identificador' => 'i4',
		'nombre' => 'Reloj 4',
		'urlImagen' => 'img/reloj4.jpg',
		'descripcion' => 'descripcion_i4',
		'precio' => 30,
		'stock' => 10,
		'activo' => true
	
	],
	[
		'identificador' => 'i5',
		'nombre' => 'Reloj 5',
		'urlImagen' => 'img/reloj5.jpg',
		'descripcion' => 'descripcion_i5',
		'precio' => 28,
		'stock' => 10,
		'activo' => true
	],	
	[
		'identificador' => 'i6',
		'nombre' => 'Reloj 6',
		'urlImagen' => 'img/reloj5.jpg',
		'descripcion' => 'descripcion_i5',
		'precio' => 100,
		'stock' => 10,
		'activo' => false
	]
];



$class = "item";

?>

<!DOCTYPE html>
<html lang="es">
<head>
	<title>Carro de la compra con Javascript</title>
	<meta charset="utf-8">
	<link rel="stylesheet" title="normal" href="css/carro.css" type="text/css" media="screen" >
</head>
<body>
	<div id="item_container">

		<?php
		if($_SERVER['REQUEST_METHOD'] === 'POST') {
			$textoBuscar = $_POST['textoBuscar'] ?? '';
			$minPrecio = $_POST['minPrecio'] ?? '0';
			$maxPrecio = $_POST['maxPrecio'] ?? '10000';

			foreach ($articulos as $articulo) {
				if($articulo['activo']) {
					$precio = $articulo['precio'];
					$nombre = $articulo['nombre'];
	
					if (stripos($nombre, $textoBuscar) !== false &&
					$precio <= $maxPrecio && $precio >= $minPrecio) {
	
					echo("<div class =".$class." id=".$articulo['identificador'].">");
					echo("<img src=".$articulo['urlImagen']." alt=".
						$articulo['descripcion'].">");
					echo("<label class=\"title\">".$articulo['nombre']."</label>");
					echo("<label class=\"price\">".$articulo['precio']." €"."</label>");
					echo("<label class=\"stock\"> Stock ".$articulo['stock']."</label>");
					echo("</div>");
					
					}
				}
			}
		}

		else {
			$minPrecio = 0;
			$maxPrecio = 1000;

			foreach ($articulos as $articulo) {
				if($articulo['activo']) {				
					echo("<div class =".$class." id=".$articulo['identificador'].">");
					echo("<img src=".$articulo['urlImagen']." alt=".
						$articulo['descripcion'].">");
					echo("<label class=\"title\">".$articulo['nombre']."</label>");
					echo("<label class=\"price\">".$articulo['precio']." €"."</label>");
					echo("<label class=\"stock\"> Stock ".$articulo['stock']."</label>");
					echo("</div>");		
				}
			}
		}
		?>
		
	</div>
	<div id="cart_container">
		<div id="cart_title">
			<span>Carrito</span>
			<div class="clear"></div>
		</div>
		<div id="cart_toolbar">
			<div id="cart_items" class="back"></div>
		</div>
		<div id="navigate">
			<div id="nav_left">
				<button id="btn_comprar" title="Confirma la compra de los artículos">Comprar</button>
				<button id="btn_prev" title="Desplaza el carrito hacia la izquierda">&lt;</button>
				<button id="btn_next" title="Desplaza el carrito hacia la derecha">&gt;</button>
				<button id="btn_clear" title="Vacia el carrito">Vaciar</button>
			</div>
			<div id="nav_right">
				<span class="sptext">
					<label>Compras </label><input id="citem" value="0" readonly title="Número de productos comprados">
				</span>
				<span class="sptext">
					<label>Precio </label><input id="cprice" value="0 €" readonly  title="Precio total de los productos comprados">
				</span>
			</div>
			<div class="clear"></div>
		</div>
	</div>
	
	<br>
	<form action="index.php" method="post">
	<label>Texto a buscar:</label>
	<?php
		$defecto = $_POST['textoBuscar'] ?? '';
		echo '<input type="text" name="textoBuscar" value="' . $defecto .'">';
	?>
	<br><br>
	<label>Precio mínimo</label>

	<?php
		$defecto = $_POST['minPrecio'] ?? '';
		echo '<input type="text" name="minPrecio" value="' . $defecto .'">';
	?>
	
	<br><br>	
	<label>Precio máximo</label>

	<?php
		$defecto = $_POST['maxPrecio'] ?? '';
		echo '<input type="text" name="minPrecio" value="' . $defecto .'">';
	?>
	
	<input type="submit" value="Buscar" name="enviar">
	</form>


	<script src="scripts/carro7.js"></script>

</body>
</html>
