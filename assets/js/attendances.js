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
    $("#txtDate").val(today);

    $("#btnView").click(function (e) { 
        e.preventDefault();
        html = `<table><th>Name</th><th>Date</th><th>Type</th><th>Time</th>`;
        var date = $("#txtDate").val();
        $.ajax({
            type: "POST",
            url: "./assets/apis/attendances.php",
            data: {date:date},
            success: function (data) {
                for(var i=0; i<data.length; i++){
                    html+=`<tr>
                                <td>${data[i]['first_name']} ${data[i]['last_name']}</td>
                                <td>${data[i]['attendance_date']}</td>
                                <td style='color:#5fa2db;'>${data[i]['type']}</td>
                                <td>${data[i]['time']}</td>
                            </tr>`; 
                }
                html+=`</table>`;
                $("#data").empty();
                $("#data").append(html);
            }
        });
    });
});    