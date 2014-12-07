<?php 

class modelo {
/*	
	var $servidor = "localhost";
	var $usuario = "root";
	var $senha = "";
	var $bd = "exchange";
	var $conn;
*/
	var $servidor = "dbmy0055.whservidor.com";
	var $usuario = "hebertmelo";
	var $senha = "sichem93";
	var $bd = "hebertmelo";
	var $conn;	


	function __construct() {
		$this->conn = mysql_connect($this->servidor, $this->usuario, $this->senha) or die ("Error");		
		$this->db = mysql_select_db($this->bd, $this->conn);		
	}
	
	function getUsuario($email,$password){
		$result = mysql_query("select id,name,type,status from user where email like '".$email."' and password like '".$password."' ");
		return $result;
	}

	function setUser($name,$email,$password,$type){
		return mysql_query("INSERT INTO user VALUES (NULL,'$name', '$email', '$password', '$type', 1);");
	}

	function setDeslogar($id_usuario){
		mysql_query("UPDATE user SET  `status` =  '0' WHERE  `id` = ". $id_usuario);
	}
	
	function getPaginaAtual($id_usuario){
		$sql = mysql_query("select max(id_pergunta) from respostas where id_usuario =".$id_usuario);
		$result = mysql_result($sql,0,0);
		
		if($result){
			return $result;
		}
		else{
			return 0;
		}
	}
}

?>