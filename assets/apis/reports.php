<?php
    require_once("./connection.php");
    $mode = $_POST['mode']; 

    // Verify Employee
    if($mode == "verify employee"){
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $sql = "select employee_id from employee where first_name='$first_name' and last_name='$last_name'";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) == 1){
            $row = mysqli_fetch_array($res);
            $employee_id = $row[0];
        }
        else
            $employee_id = NULL;
        header('Content-type: application/json');
        echo json_encode($employee_id);
    }

    if($mode == "load"){       
        $employee_id = $_POST['employee_id'];
        $date_from = $_POST['date_from'];
        $date_to = $_POST['date_to'];
        $sql ="select attendance_date,type,time from attendance where employee_id=$employee_id and type='in' and attendance_date between '{$date_from}' and '{$date_to}'";
        $res = mysqli_query($link, $sql);
        $in = array();
        while ($row = mysqli_fetch_assoc($res))
            $in[] = $row;
        $sql ="select attendance_date,type,time from attendance where employee_id=$employee_id and type='out' and attendance_date between '{$date_from}' and '{$date_to}'";
        $res = mysqli_query($link, $sql);
        $out = array();
        while ($row = mysqli_fetch_assoc($res))
            $out[] = $row;
        $minutes_of_work = 0;
        for($i=0; $i<count($in); $i++){
            $to_time = strtotime($out[$i]['time']);
            $from_time = strtotime($in[$i]['time']);
            $minutes_of_work += ($to_time - $from_time) / 60;
        } 
        $sql = "select salary_per_hour from employee where employee_id=$employee_id";
        $res = mysqli_query($link, $sql);
        if(mysqli_num_rows($res) == 1)
        {  
            $row = mysqli_fetch_array($res);
            $salary_per_hour = $row[0];
            $total_salary = $salary_per_hour/60 * $minutes_of_work;
        }
        $sql ="select attendance_date,type,time from attendance where employee_id=$employee_id and attendance_date between '{$date_from}' and '{$date_to}'";
        $res = mysqli_query($link, $sql);
        $in_out = array();
        while ($row = mysqli_fetch_assoc($res))
            $in_out[] = $row;
        $data = array(
            "salary_per_hour" => $salary_per_hour,
            "minutes_of_work" => $minutes_of_work,
            "total_salary" => $total_salary,
            "in_out" => $in_out     
        );
        header('Content-type: application/json');
        echo json_encode($data);
    }
?>