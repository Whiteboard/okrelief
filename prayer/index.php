<?php

	try {  
	  # MS SQL Server and Sybase with PDO_DBLIB
	  // $DBH = new PDO("mssql:host=$host;dbname=$dbname, $user, $pass");  
	  // $DBH = new PDO("sybase:host=$host;dbname=$dbname, $user, $pass");  
	  
	  # MySQL with PDO_MYSQL  
	  // $DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);  
	  
	  # SQLite Database  
	  $DBH = new PDO("sqlite:prayers.db");
	}  
	catch(PDOException $e) {  
	    echo $e->getMessage();  
	}
	
	$st = $DBH->prepare('SELECT * FROM prayers');
	$st->execute();

	$result = $st->fetchAll(PDO::FETCH_ASSOC);

    $a = array();

    foreach($result as $row){
    	$a[] = $row;
    }

    echo json_encode($a);
?>