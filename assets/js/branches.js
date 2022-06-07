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

    manageBranchesDashboard();

    $("#btnNew").click(function (e) { 
        e.preventDefault();
        $("#btnManage").removeClass("btnactive").addClass("btn");
        $("#btnNew").removeClass("btn").addClass("btnactive");
        $("#data").empty();
        newBranchDashboard();
    });

    $("#btnManage").click(function (e) {
        e.preventDefault();
        $("#btnNew").removeClass("btnactive").addClass("btn");
        $("#btnManage").removeClass("btn").addClass("btnactive");
        $("#data").empty();
        manageBranchesDashboard();
    });

    //Manage Branches Dashboard
    function manageBranchesDashboard(){
        $(".title").text("Manage Branches");
        $("#data").removeClass("wrapper2");
        html = `<table><tr><th>Name</th><th>Latitude</th><th>Longitude</th><th>Accuracy</th><th colspan="2">Actions</th></tr>`;
        mode = "load";
        $.ajax({
            type: "POST",
            url: "./assets/apis/branches.php",
            data: {mode:mode},
            success: function (data) {
                for(var i=0; i<data.length; i++){
                    html+=`<tr>
                                <td>${data[i]['name']}</td>
                                <td>${data[i]['latitude']}</td>
                                <td>${data[i]['longitude']}</td>
                                <td>${data[i]['accuracy']}</td>
                                <td><span class="click" id="iconEdit" rel="${data[i]['branch_id']}"><i class='fa-solid fa-pen-to-square'></i></span> <span class="click" id="iconDelete" rel="${data[i]['branch_id']}"><i class='fa-solid fa-trash'></a></td>
                            </tr>`; 
                }
                html+=`</table>`;
                $("#data").append(html);
            }
        });   
    } 
    
    //Form Function for Edit and Add
    function form(branch_name, latitude, longitude, accuracy){
        html = `<form class="form">
                    <div class="inputfield">
                        <label>Name</label>
                        <input type="text" id="txtName" class="input" value="${branch_name}">
                    </div>  
                    <div class="inputfield">
                        <label>Latitude</label>
                        <input type="text" id="txtLatitude" class="input" value="${latitude}">
                    </div>
                    <div class="inputfield">
                        <label>Longitude</label>
                        <input type="text" id="txtLongitude" class="input" value="${longitude}">
                    </div>
                    <div class="inputfield">
                        <label>Accuracy</label>
                        <input type="text" id="txtAccuracy" class="input" value="${accuracy}">
                    </div>`;
        return html;        
    }

    //Edit Branch Dashboard
    $("#data").on("click", "#iconEdit", function(e){
        e.preventDefault();
        $(".title").text("Edit Branch");
        $("#data").addClass("wrapper2");
        $("#data").empty();
        branch_id = $(this).attr('rel');
        mode = "edit";
        $.ajax({
            type: "POST",
            url: "./assets/apis/branches.php",
            data: {mode:mode, branch_id:branch_id},
            success: function (row) {
                branch_name = row[1];
                latitude = row[2];
                longitude = row[3];
                accuracy = row[4];
                html = form(branch_name, latitude, longitude, accuracy);
                html += `<div class="inputfield">
                            <input type="submit" value="Modify" id="btnModify" class="button" rel="${branch_id}">
                        </div>
                        </form>`;
                $("#data").append(html); 
            }
        });           
    });
    
    //Apply Editing Branch
    $("#data").on("click", "#btnModify", function(e){
        e.preventDefault();
        mode = "modify";
        branch_id = $(this).attr('rel');
        branch_name = $("#txtName").val();
        latitude = $("#txtLatitude").val();
        longitude = $("#txtLongitude").val();
        accuracy = $("#txtAccuracy").val();
        $.ajax({
            type: "POST",
            url: "./assets/apis/branches.php",
            data: {mode:mode, branch_id:branch_id, branch_name:branch_name, latitude:latitude, longitude:longitude, accuracy:accuracy},
            success: function (msg) {
                if(msg == "done")
                    alert("The branch is edited successfully!");
                else
                    alert("The branch is not edited! Please try again later..");
            }
        });
    });

    //Delete Branch
    $("#data").on("click", "#iconDelete", function(e){
        e.preventDefault();
        if (confirm("Are you sure you want to permanently delete this branch?") == true) {
            branch_id = $(this).attr('rel');
            mode = "delete";
            $.ajax({
                type: "POST",
                url: "./assets/apis/branches.php",
                data: {mode:mode, branch_id:branch_id},
                success: function (msg) {
                    if(msg == "done"){
                        alert("The branch is deleted successfully!");
                        location.reload();
                    }
                    else
                        alert("The branch is not deleted! Please try again later..");
                }
            });
        }
    });    
    
    //Add New Branch Dashboard
    function newBranchDashboard(){
        $(".title").text("Add New Branch");
        $("#data").addClass("wrapper2");
        html = form("","","","");
        html += `<div class="inputfield">
                    <input type="button" value="Add" id="btnAdd" class="button">
                </div>
                </form>`
        $("#data").append(html);        
    }

    // Apply Adding New Branch
    $("#data").on("click","#btnAdd", function(e){ 
        e.preventDefault();
        mode = "add";
        branch_name = $("#txtName").val();
        latitude = $("#txtLatitude").val();
        longitude = $("#txtLongitude").val();
        accuracy = $("#txtAccuracy").val();
        if(branch_name=="" || latitude=="" || longitude=="" || accuracy=="")
            alert("You should fill in all the informations!");
        else{
            $.ajax({
                type: "POST",
                url: "./assets/apis/branches.php",
                data: {mode:mode, branch_name:branch_name, latitude:latitude, longitude:longitude, accuracy:accuracy},
                success: function (msg) {
                    if(msg == "done")
                        alert("The branch is added successfully!");
                    else
                        alert("The branch already exist!");
                }
            });
        }
    });
});