$(document).ready(function(){
    
    //Checking session
    $.ajax({
        type: "GET",
        url: "./assets/apis/checkingsession.php",
        success: function (response) {
            if(response == true){
                mode = "load";
                //Loading data
                $.ajax({
                    type: "POST",
                    url: "./assets/apis/account.php",
                    data: {mode:mode},
                    success: function (data) {
                        $("#txtFname").val(data[0]);
                        $("#txtLname").val(data[1]);
                        $("#txtEmail").val(data[2]);
                        $("#txtPassword").val(data[3]);
                        $("#txtPhone").val(data[4]);
                        $("#txtAddress").val(data[5]);
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
    
    // Button click
    $("#btnModify").click(function () { 
        mode = "modify";
        fname = $("#txtFname").val();
        lname = $("#txtLname").val();
        email = $("#txtEmail").val();
        password = $("#txtPassword").val();
        phone = $("#txtPhone").val();
        address = $("#txtAddress").val();
        if(fname=="" || lname=="" || email=="" || password=="" || phone=="" || address=="")
            alert("You should fill in all the informations!");
        else{
            $.ajax({
                type: "POST",
                url: "./assets/apis/account.php",
                data: {mode:mode, fname:fname, lname:lname, email:email, password:password, phone:phone, address:address},
                success: function (msg) {
                    if(msg == "done")
                        alert("Your account is modified successfully!");
                    else
                        alert("Your account is not modified! Please try again later..");
                }
            });
        }
    });
});