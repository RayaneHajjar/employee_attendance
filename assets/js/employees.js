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

    manageEmployeesDashboard();

    $("#btnNew").click(function (e) { 
        e.preventDefault();
        $("#btnManage").removeClass("btnactive").addClass("btn");
        $("#btnNew").removeClass("btn").addClass("btnactive");
        $("#data").empty();
        newEmployeeDashboard();
    });

    $("#btnManage").click(function (e) {
        e.preventDefault();
        $("#btnNew").removeClass("btnactive").addClass("btn");
        $("#btnManage").removeClass("btn").addClass("btnactive");
        $("#data").empty();
        manageEmployeesDashboard();
    });

    //Manage Employees Dashboard
    function manageEmployeesDashboard(){
        $(".title").text("Manage Employees");
        $("#data").removeClass("wrapper2");
        html = `<table><tr><th>Branch</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Password</th><th>Phone</th><th>Salary/hour</th><th colspan="2">Actions</th></tr>`;
        mode = "load";
        $.ajax({
            type: "POST",
            url: "./assets/apis/employees.php",
            data: {mode:mode},
            success: function (data) {
                for(var i=0; i<data.length; i++){
                    html+=`<tr>
                                <td>${data[i]['name']}</td>
                                <td>${data[i]['first_name']}</td>
                                <td>${data[i]['last_name']}</td>
                                <td>${data[i]['email']}</td>
                                <td>${data[i]['password']}</td>
                                <td>${data[i]['phone']}</td>
                                <td>${data[i]['salary_per_hour']}\$</td>
                                <td><span class="click" id="iconEdit" rel="${data[i]['employee_id']}"><i class='fa-solid fa-pen-to-square'></i></span> <span class="click" id="iconDelete" rel="${data[i]['employee_id']}"><i class='fa-solid fa-trash'></a></td>
                            </tr>`; 
                }
                html+=`</table>`;
                $("#data").append(html);
            }
        });   
    } 

    //Form Function for Edit and Add
    function form(first_name, last_name, email, password, phone, salary_per_hour){
        html = `<form class="form">
                    <div class="inputfield">
                        <label>Branch</label>
                        <div class="custom_select">
                            <select id="cmbBranch"></select>
                        </div>
                    </div>
                    <div class="inputfield">
                        <label>First Name</label>
                        <input type="text" id="txtFname" class="input" value="${first_name}">
                    </div>  
                    <div class="inputfield">
                        <label>Last Name</label>
                        <input type="text" id="txtLname" class="input" value="${last_name}">
                    </div>
                    <div class="inputfield">
                        <label>Email</label>
                        <input type="text" id="txtEmail" class="input" value="${email}">
                    </div>
                    <div class="inputfield">
                        <label>Password</label>
                        <input type="text" id="txtPassword" class="input" value="${password}">
                    </div>
                    <div class="inputfield">
                        <label>Phone</label>
                        <input type="text" id="txtPhone" class="input" value="${phone}">
                    </div>
                    <div class="inputfield">
                        <label>SalaryPerHour</label>
                        <input type="text" id="txtSalary" class="input" value="${salary_per_hour}">
                    </div>`; 
        return html;        
    }
    
    //Edit Employee Dashboard
    $("#data").on("click", "#iconEdit", function(e){
        e.preventDefault();
        $("#title").text("Edit Employee");
        $("#data").addClass("wrapper2");
        $("#data").empty();
        employee_id = $(this).attr('rel');
        mode = "edit";
        $.ajax({
            type: "POST",
            url: "./assets/apis/employees.php",
            data: {mode:mode, employee_id:employee_id},
            success: function (row) {
                branch = row[0];
                first_name = row[1];
                last_name = row[2];
                email = row[3];
                password = row[4];
                phone = row[5];
                salary_per_hour = row[6];
                html = form(first_name, last_name, email, password, phone, salary_per_hour);
                html += `<div class="inputfield">
                            <input type="submit" value="Modify" id="btnModify" class="button" rel="${employee_id}">
                        </div>
                        </form>`;
                $("#data").append(html); 
                mode = "select branches";
                $.ajax({
                    type: "POST",
                    url: "./assets/apis/employees.php",
                    data: {mode:mode},
                    success: function (branches) {
                        for(var i=0; i<branches.length; i++){
                            selected = "";
                            if(branches[i]["name"]==branch)
                                selected = "selected";
                            $("#cmbBranch").append(`<option value='${branches[i]["branch_id"]}' ${selected}>${branches[i]["name"]}</option>`);
                        }    
                    }
                });
            }
        });           
    });
    
    //Apply Editing Employee
    $("#data").on("click", "#btnModify", function(e){
        e.preventDefault();
        mode = "modify";
        employee_id = $(this).attr('rel');
        branch_id = $("#cmbBranch").children("option:selected").val();
        first_name = $("#txtFname").val();
        last_name = $("#txtLname").val();
        email = $("#txtEmail").val();
        password = $("#txtPassword").val();
        phone = $("#txtPhone").val();
        salary_per_hour = $("#txtSalary").val();
        $.ajax({
            type: "POST",
            url: "./assets/apis/employees.php",
            data: {mode:mode, employee_id:employee_id, branch_id:branch_id, first_name:first_name, last_name:last_name, email:email, password:password, phone:phone, salary_per_hour:salary_per_hour},
            success: function (msg) {
                if(msg == "done")
                    alert("The employee is edited successfully!");
                else
                    alert("The employee is not edited! Please try again later..");
            }
        });

    });
    
    //Add New Employee Dashboard
    function newEmployeeDashboard(){
        $(".title").text("Add New Employee");
        $("#data").addClass("wrapper2");
        html = form("","","","","","");
        html += `<div class="inputfield">
                    <input type="submit" value="Add" id="btnAdd" class="button">
                </div>
                </form>`;
        $("#data").append(html);        
        mode = "select branches";
        $.ajax({
            type: "POST",
            url: "./assets/apis/employees.php",
            data: {mode:mode},
            success: function (branches) {
                for(var i=0; i<branches.length; i++){
                    $("#cmbBranch").append(`<option value='${branches[i]["branch_id"]}'>${branches[i]["name"]}</option>`);
                }    
            }
        });
    }

    // Apply Adding New Employee
    $("#data").on("click","#btnAdd", function(e){ 
        e.preventDefault();
        mode = "add";
        fname = $("#txtFname").val();
        lname = $("#txtLname").val();
        email = $("#txtEmail").val();
        password = $("#txtPassword").val();
        phone = $("#txtPhone").val();
        salary = $("#txtSalary").val();
        branch_id = $("#cmbBranch").val();
        if(fname=="" || lname=="" || email=="" || password=="" || phone=="" || salary=="")
            alert("You should fill in all the informations!");
        else{
            $.ajax({
                type: "POST",
                url: "./assets/apis/employees.php",
                data: {mode:mode, fname:fname, lname:lname, email:email, password:password, phone:phone, salary:salary, branch_id:branch_id},
                success: function (msg) {
                    if(msg == "done")
                        alert("The employee is added successfully!");
                    else
                        alert("The employee already exist!");
                }
            });
        }
    });

    //Delete Employee
    $("#data").on("click", "#iconDelete", function(e){
        e.preventDefault();
        if (confirm("Are you sure you want to permanently delete this employee?") == true) {
            employee_id = $(this).attr('rel');
            mode = "delete";
            $.ajax({
                type: "POST",
                url: "./assets/apis/employees.php",
                data: {mode:mode, employee_id:employee_id},
                success: function (msg) {
                    if(msg == "done"){
                        alert("The employee is deleted successfully!");
                        location.reload();
                    }
                    else
                        alert("The employee is not deleted! Please try again later..");
                }
            });
        }
    });    
});