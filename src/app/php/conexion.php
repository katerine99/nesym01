<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "nesym01";

$conexion = mysqli_connect($servidor, $usuario, $clave) or die("no se conecto a mysql");
mysqli_select_db($conexion, $bd) or die("no encotro la base de datos")
or die(mysqli_error($conexion));
