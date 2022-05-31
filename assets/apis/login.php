<?php
  require_once("./connection.php");
  $email = $_POST['email'];
  $password = $_POST['password'];
  session_start();
  $sql ="select * from user where email ='$email' and password='$password'";
  $res = mysqli_query($link, $sql);
  if(mysqli_num_rows($res) == 1)
  {
    $row = mysqli_fetch_array($res);
    $_SESSION['user_id'] = $row['user_id'];
    $_SESSION['first_name'] = $row['first_name'];
    $_SESSION['last_name'] = $row['last_name'];
    $response = true;
  }
  else
    $response = false;
  header('Content-type: application/json');
  echo json_encode($response);
?>