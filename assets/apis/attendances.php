<?php
    require_once("./connection.php");
    $date = $_POST['date'];
    $sql ="select first_name,last_name,attendance_date,type,time from attendance,employee where attendance.employee_id=employee.employee_id and attendance_date='{$date}'";
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
?>