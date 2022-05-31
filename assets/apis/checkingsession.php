<?php
	session_start();
	if(isset($_SESSION['user_id']))
		$result = true;
	else
		$result = false;
    header('Content-type: application/json');
    echo json_encode($result);
?>