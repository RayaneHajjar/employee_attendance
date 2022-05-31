<?php
    require_once("./connection.php");
    $mode = $_POST['mode'];

    //Loading Employees
    if($mode=="load"){
        $sql ="select employee_id,name,first_name,last_name,email,password,phone,salary_per_hour from employee,branch where branch.branch_id=employee.branch_id";
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

    //Select Branches
    if($mode=="select branches"){
        $sql ="select branch_id,name from branch";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) > 0)
        {
            $branches = array();
            while ($row = mysqli_fetch_assoc($res)){
                $branches[] = $row;
            }             
        }
        header('Content-type: application/json');
        echo json_encode($branches);
    }

    //Apply Adding Employee
    if($mode=="add"){
        $branch_id = $_POST['branch_id'];
        $first_name = $_POST['fname'];
        $last_name = $_POST['lname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $phone = $_POST['phone'];
        $salary = $_POST['salary'];

        $sql = "select * from employee where first_name='$first_name' and last_name='$last_name'";
		$res = mysqli_query($link, $sql);
		if(mysqli_num_rows($res) ==1)
			$msg = "already exist";
		else
		{
            $sql = "insert into employee(branch_id, first_name, last_name, email, password, phone, salary_per_hour)
                values($branch_id,'$first_name','$last_name','$email','$password','$phone',$salary)";
            $res = mysqli_query($link, $sql);
            if(mysqli_affected_rows($link) > 0)
                $msg = "done";
		}
        header('Content-type: application/json');
        echo json_encode($msg);
    }
    
    //Edit Employee Dashboard
    if($mode=="edit"){
        $employee_id = $_POST['employee_id'];
        $sql = "select name, first_name, last_name, email, password, phone, salary_per_hour from employee,branch where branch.branch_id=employee.branch_id and employee_id=$employee_id";
		$res = mysqli_query($link, $sql);
		if(mysqli_num_rows($res) == 1){
            $data = array();
            $row = mysqli_fetch_row($res);
        }    
        header('Content-type: application/json');
        echo json_encode($row);
    }

    //Apply Editing Employee
    if($mode=="modify"){
        $employee_id =$_POST['employee_id'];
        $branch_id = $_POST['branch_id'];
        $first_name = $_POST['first_name'];
		$last_name = $_POST['last_name'];
		$email = $_POST['email'];
        $password = $_POST['password'];
        $phone = $_POST['phone'];
        $salary_per_hour = $_POST['salary_per_hour'];
		$sql = "update employee set branch_id=$branch_id,first_name='$first_name', last_name='$last_name',email='$email',
			password='$password',phone=$phone,salary_per_hour=$salary_per_hour where employee_id=$employee_id";
		$res = mysqli_query($link, $sql);
		if(mysqli_affected_rows($link) > 0)
			$msg = "done";
        header('Content-type: application/json');
        echo json_encode($msg);    
    }

    //Delete Employee
    if($mode=="delete"){
        $employee_id =$_POST['employee_id'];
        $sql = "delete from attendance where employee_id = $employee_id";
        $res = mysqli_query($link, $sql);
        $sql = "delete from employee where employee_id = $employee_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_affected_rows($link) > 0)
            $msg = "done";
        header('Content-type: application/json');
        echo json_encode($msg);  
    }
?>