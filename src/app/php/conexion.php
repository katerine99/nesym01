<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd= "nesym";

$conexion = mysqli_connect($servidor,$usuario,$clave) or die ("no_se_conecto_a_mysql");
mysqli_select_db($conexion, $bd)or die ("no_encotro_la_base_de_datos")

?>
