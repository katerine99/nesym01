<?php
header('Access-Control-Allow-origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$user = $_GET['user'];
$cla = $_GET['clave'];


require("../conexion.php");

$con = "SELECT * from usuarios WHERE usuario = '$user' AND clave = SHA1('$cla')";
$res= mysqli_query($conexion,$con) or die("no_consulto el usuario");

$vec = [];
while ($reg=mysqli_fetch_array($res))

{
  $vec[]=$reg;

}

if($vec == []){
 $vec[0] = array("validar"=>"no valida");
}else{
 $vec[0] ['validar']="valida";
}

$cad=json_encode($vec);
echo $cad;
header("content-type: application/json");
?>
