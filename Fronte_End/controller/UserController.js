let UBaseUrl = "http://localhost:8080/Back_End/api/v1/auth/";

$("#btnUpdateUser").click(function () {
    searchUser($("#Useremail").val()).then(function (user) {
        if (user) {
            //performAuthenticatedRequest();
            // const accessToken = localStorage.getItem('accessToken');
            let value = {
                email: $("#Useremail").val(),
                password: $("#userpass").val(),
                role: $('#Userrole').val()
            }
            console.log(value);
            $.ajax({
                url: UBaseUrl+"user",
                method: "PUT",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    alert("update successfully")
                },
                error: function (ob, textStatus, error) {
                    alert("not update"+error)
                }
            });

        } else {
            alert("User not exits.!")
        }
    });
});

$("#btnDeleteUser").click(function () {
    let id = $("#Useremail").val();

    searchUser(id).then(function (isValid) {
        if (isValid == false) {
            alert("No such user..please check the ID")
        } else {


            // performAuthenticatedRequest();
            // const accessToken = localStorage.getItem('accessToken');
            let value = {
                email: $("#Useremail").val(),
                password: $("#userpass").val(),
                role: $('#Userrole').val()
            }
            $.ajax({
                url: UBaseUrl+"user",
                method: "DELETE",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res) {
                    console.log(res);
                    alert("user Delete Successfully")
                    // swal("Deleted", "Admin Delete Successfully", "success");
                    // adminClear();
                    //getAllAdmins();
                    //captureClear();


                },
                error: function (ob, textStatus, error) {
                    alert("Error user Not Delete")
                }
            });
        }

    });

    /*$("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);*/

});

function searchUser(name) {
    return new Promise(function (resolve, reject) {
        /*performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);*/
        $.ajax({
            url: UBaseUrl+"search/" + name,
            method: "GET",
            dataType: "json",
            success: function (res, textStatus, xhr) {
                if (xhr.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });

}