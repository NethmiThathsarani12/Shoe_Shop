let lBaseUrl = "http://localhost:8080/Back_End/api/v1/auth/";

$("#btnSingUp").click(function() {

    let value = {
        email: $("#upUser_Name").val(),
        password: $("#upPassword").val(),
        role: $('#role_Type').val()
    }
    console.log(value);
    $.ajax({
        url: lBaseUrl+ "signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('accessToken', res.token);
            alert("Error User Added");
            // console.log(res);
            /* $("#inputEmail").val("");
             $("#inputPassword").val("");
             $("#reInputPassword").val("");*/
        },
        error: function (ob, textStatus, error) {
            alert("Error User Not Added");
        }
    });

});
$("#btnLogin").click(function() {
    let value = {
        email: $("#user_Name").val(),
        password: $("#password").val(),
    }
    console.log(value);
    $.ajax({
        url: lBaseUrl+"signin",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully "+res.token);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');

            $.ajax({
                url: lBaseUrl+"search/" + value.email,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res, textStatus, xhr) {
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('cashier', value.email);
                    if (res.role === "ADMIN") {
                        window.location.href = "AdminDashBoard.html";
                    } else if(res.role === "USER"){
                        window.location.href = "UserDashBoard.html";
                    }
                },
                error: function (ob, textStatus, error) {
                    // swal("Error","Error Sign in", "error");
                }
            });

        },
        error: function (ob, textStatus, error) {
            // swal("Error", "Error Sign in", "error");
        }
    });
});

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}
function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: lBaseUrl+"signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("sign in Successfully "+res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("token renew sign in error "+accessToken);
            }
        });
    } else {

    }
}