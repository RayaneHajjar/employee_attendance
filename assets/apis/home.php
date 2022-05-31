<?php
	session_start();
    $fullname = $_SESSION['first_name']." ".$_SESSION['last_name'];
    header('Content-type: application/json');
    echo json_encode($fullname);
?>