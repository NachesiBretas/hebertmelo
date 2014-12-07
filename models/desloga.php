<?php
session_start();

include("modelo.php");
$modelo = new modelo();
$sort = $modelo->setDeslogar($_SESSION['usu']);

session_destroy();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=latin1" />
<title>CEMIG</title>
</head>
<?php

echo "<script> 
		alert('Obrigada por participar!');
		window.open(\"login.php\",\"_self\") 
	  </script>";

?>