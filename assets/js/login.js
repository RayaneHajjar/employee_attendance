$(document).ready(function () {
    $("#btnLogin").click(function () { 
        email = $("#txtEmail").val().toLowerCase();
        password = $("#txtPassword").val();
        if(email=="" || password=="")
            alert("You should fill in all the informations!");
        else{
            $.ajax({
                type: "POST",
                url: "./assets/apis/login.php",
                data: {email:email, password:password},
                success: function (response) {
                    if(response == true)
                        window.location.replace("home.html");
                    else
                        alert("Incorrect email or password!");
                }
            });
        }      
    });
});