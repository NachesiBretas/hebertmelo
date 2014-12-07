<?php
session_start();
include ("modelo.php");

$email = $_POST["email"];
$password = $_POST["password"];

$modelo = new modelo();
$usu = $modelo->getUsuario($email,$password);

$row = mysql_fetch_array($usu);
$usu = $row['id'] ;
$ativo = $row['status'];
$tipo = $row['type'];

if($usu && $ativo == 1){
echo "true";

}
else{
	echo "false";
}

?>