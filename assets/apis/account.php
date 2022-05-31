<?php
	session_start();
    $user_id = $_SESSION['user_id'];
    require_once("./connection.php");
    $mode = $_POST['mode'];

    //Load Mode
    if($mode=="load"){
        $sql ="select * from user where user_id=$user_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) == 1)
        {
            $row = mysqli_fetch_array($res);
            $data[0] = $row['first_name'];
            $data[1] = $row['last_name'];
            $data[2] = $row['email'];
            $data[3] = $row['password'];
            $data[4] = $row['phone'];
            $data[5] = $row['address'];
        }
        header('Content-type: application/json');
        echo json_encode($data);
    }
    
    //Modify Mode
    if($mode=="modify"){
        $sql = "update user set first_name='{$_POST['fname']}',last_name='{$_POST['lname']}',email='{$_POST['email']}',password='{$_POST['password']}',phone='{$_POST['phone']}',address='{$_POST['address']}' where user_id=$user_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_affected_rows($link) > 0)
            $msg = "done";
        else
            $msg = "error";
        header('Content-type: application/json');
        echo json_encode($msg);
    }   
?>    