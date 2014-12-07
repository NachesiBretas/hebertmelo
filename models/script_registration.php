<?php
session_start();
include ("modelo.php");

$email = $_POST["email"];
$password = $_POST["password"];
$name = $_POST["name"];
$type = $_POST["type"];

$modelo = new modelo();
$usu = $modelo->setUser($name,$email,$password,$type);

if($usu){
	echo "true";
}
else{
	echo"false";
}
?>