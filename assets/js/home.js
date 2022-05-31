$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "./assets/apis/checkingsession.php",
        success: function (response) {
            if(response == true){
                $.ajax({
                    type: "GET",
                    url: "./assets/apis/home.php",
                    success: function (fullname) {
                        $("#fullName").text(fullname);
                        $("#fullName").css("font-style","italic");
                    }
                });
            }
            else
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
});