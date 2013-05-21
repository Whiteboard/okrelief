<?php
	include_once("vetemail.php");

	try {  
	  # MS SQL Server and Sybase with PDO_DBLIB
	  // $DBH = new PDO("mssql:host=$host;dbname=$dbname, $user, $pass");  
	  // $DBH = new PDO("sybase:host=$host;dbname=$dbname, $user, $pass");  
	  
	  # MySQL with PDO_MYSQL  
	  // $DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);  
	  
	  # SQLite Database  
	  $DBH = new PDO("sqlite:/Users/jonathancutrell/Sites/okrelief/prayer/prayers.db");
	  $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	  $DBH->exec("CREATE TABLE IF NOT EXISTS prayers (
                    id INTEGER PRIMARY KEY,
                    email TEXT,
                    message TEXT, 
                    name TEXT);");
	}
	catch(PDOException $e) {  
	    echo $e->getMessage();  
	}

	if (isset($_POST) && count($_POST)){

		try {
			$email = stripslashes($_POST["email"]);
			if (!validEmail($email)){
				die(json_encode(array("result"=>"failure","exception"=>"Invalid email")));
			}
			$message = stripslashes($_POST["message"]);
			$name = stripslashes($_POST["uname"]);
	    	$stmt = $DBH->prepare("INSERT INTO prayers VALUES (?,?,?,?)");
	    	$data = array(null, $email, $message, $name);
	    	$stmt->execute($data);
	    	echo json_encode(array("result" => "success"));
		} catch(PDOException $e) {
			echo json_encode($e->getMessage());
		}
	} else {
		echo "Nothing to see here...";
	}
?>