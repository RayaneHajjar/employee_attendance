$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "./assets/apis/checkingsession.php",
        success: function (response) {
            if(response == false)
                window.location.replace("login.html");
        }
    });

    //Check if the menu icon is clicked
    $("#menuIcon").click( function() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else 
          x.className = "topnav";
    });

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var today =  d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
    var first_day_of_month = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + '01';
    $("#dateFrom").val(first_day_of_month);
    $("#dateTo").val(today);

    $("#btnView").click(function (e) { 
        e.preventDefault();
        var first_name = $("#txtFname").val().toLowerCase();
        var last_name = $("#txtLname").val().toLowerCase();
        var date_from = $("#dateFrom").val().toLowerCase();
        var date_to = $("#dateTo").val().toLowerCase();
        $.ajax({
            type: "POST",
            url: "./assets/apis/reports.php",
            data: {mode:"verify employee", first_name:first_name, last_name:last_name},
            success: function (employee_id) {
                if(employee_id){
                    $.ajax({
                        type: "POST",
                        url: "./assets/apis/reports.php",
                        data: {mode:"load", employee_id:employee_id, date_from:date_from, date_to:date_to}, 
                        success: function (data) {
                            console.log(data['salary_per_hour']);
                            html = `<div class='result'>
                                        <b>Salary/hour: </b><i>${data['salary_per_hour']} \$ </i><br>
                                        <b>Minutes of work: </b><i>${data['minutes_of_work']} min </i><br>
                                        <b>Total: </b><i>${data['total_salary']} \$ </i><br></div>
                                        <table><th>Date</th><th>Type</th><th>Time</th>`;
                            for(var i=0; i<data['in_out'].length; i++){
                                html += `<tr><td>${data['in_out'][i]['attendance_date']}</td><td style='color:#5fa2db;'>${data['in_out'][i]['type']}</td><td>${data['in_out'][i]['time']}</td></tr>`;
                            }
                            html += `</table>`;
                            $("#data").empty();
                            $("#data").append(html);
                        }
                    });
                }
                else
                    alert("No such employee!");
            }
        });
    });
});    