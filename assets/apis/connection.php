<?php
  $servername = "localhost";
  $username = "rayane";
  $password = "rayanepass";
  $database = "attendance_project";
  $port = "3306";

  $link = @mysqli_connect($servername, $username, $password, $database, $port);
  if($link == false)
    die("Connection failed: ".mysqli_connect_error());
?>
