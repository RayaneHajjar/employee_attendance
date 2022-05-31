<?php
    require_once("./connection.php");
    $mode = $_POST['mode'];

    //Loading Employees
    if($mode=="load"){
        $sql ="select * from branch";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) > 0)
        {
            $data = array();
            while ($row = mysqli_fetch_assoc($res)){               
                $data[] = $row;
            }
        }
        header('Content-type: application/json');
        echo json_encode($data);
    }    
    
    //Edit Branch Dashboard
    if($mode=="edit"){
        $branch_id = $_POST['branch_id'];
        $sql = "select * from branch where branch_id=$branch_id";
		$res = mysqli_query($link, $sql);
		if(mysqli_num_rows($res) == 1){
            $data = array();
            $row = mysqli_fetch_row($res);
        }    
        header('Content-type: application/json');
        echo json_encode($row);
    }

    //Apply Editing Branch
    if($mode=="modify"){
        $branch_id = $_POST['branch_id'];
        $branch_name = $_POST['branch_name'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];
        $accurency = $_POST['accurency'];
		$sql = "update branch set name='$branch_name', latitude=$latitude, longitude=$longitude, accurency=$accurency where branch_id=$branch_id";
		$res = mysqli_query($link, $sql);
		if(mysqli_affected_rows($link) > 0)
			$msg = "done";
        header('Content-type: application/json');
        echo json_encode($msg);    
    }

    //Delete Branch
    if($mode=="delete"){
        $branch_id = $_POST['branch_id'];
        $sql = "select employee_id from employee where branch_id = $branch_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) > 0)
        {
            while ($row = mysqli_fetch_array($res))
            {
            $sql = "delete from attendance where employee_id = $row[0]";
            $res = mysqli_query($link, $sql);
            $sql = "delete from employee where employee_id = $row[0]";
            $res = mysqli_query($link, $sql);
            }
        }    
        $sql ="delete from branch where branch_id = $branch_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_affected_rows($link) > 0)
            $msg = "done";
        header('Content-type: application/json');
        echo json_encode($msg);  
    }
   
    //Apply Adding Branch
    if($mode=="add"){
        $branch_name = $_POST['branch_name'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        $accurency = $_POST['accurency'];
        $sql = "select * from branch where name='$branch_name'";
		$res = mysqli_query($link, $sql);
		if(mysqli_num_rows($res) ==1)
			$msg = "already exist";
		else
		{
            $sql = "insert into branch(name, latitude, longitude, accurency)
                values('$branch_name',$latitude,$longitude,$accurency)";
            $res = mysqli_query($link, $sql);
            if(mysqli_affected_rows($link) > 0)
                $msg = "done";
		}
        header('Content-type: application/json');
        echo json_encode($msg);
    }
?>