<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require("../conexion.php");

$con = "SELECT * FROM usuarios ORDER BY nombre";

$res = mysqli_query($conexion, $con) or die('no consulto el usuario');

$vec = [];
while ($reg = mysqli_fetch_array($res)) {
  $vec[] = $reg;
}

$cad = json_encode($vec);
echo $cad;