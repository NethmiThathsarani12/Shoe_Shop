// let lBaseUrl = "http://localhost:8080/Back_End/api/v1/auth/";
//
// $("#btnSingUp").click(function() {
//
//     let value = {
//         email: $("#upUser_Name").val(),
//         password: $("#upPassword").val(),
//         role: $('#role_Type').val()
//     }
//     console.log(value);
//     $.ajax({
//         url: lBaseUrl+ "signup",
//         method: "POST",
//         data: JSON.stringify(value),
//         contentType: "application/json",
//         success: function (res, textStatus, jsXH) {
//             localStorage.setItem('accessToken', res.token);
//             // alert("Error User Added");
//             Swal.fire({
//                 icon: "error",
//                 title: "Request True",
//                 showConfirmButton: true,
//                 timer: 1500
//             });
//             // console.log(res);
//             /* $("#inputEmail").val("");
//              $("#inputPassword").val("");
//              $("#reInputPassword").val("");*/
//         },
//         error: function (ob, textStatus, error) {
//             alert("Error User Not Added");
//             Swal.fire({
//                 icon: "error",
//                 title: "Request failed",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     });
//
// });
//
//
// $("#btnLogin").click(function() {
//     let value = {
//         email: $("#user_Name").val(),
//         password: $("#password").val(),
//     }
//     console.log(value);
//     $.ajax({
//         url: lBaseUrl+"signin",
//         method: "POST",
//         data: JSON.stringify(value),
//         contentType: "application/json",
//         success: function (res, textStatus, jsXH) {
//             localStorage.setItem('email', value.email);
//             localStorage.setItem('password', value.password);
//             localStorage.setItem('accessToken', res.token);
//             console.log("User SignIn Successfully "+res.token);
//             performAuthenticatedRequest();
//             const accessToken = localStorage.getItem('accessToken');
//
//             $.ajax({
//                 url: lBaseUrl+"search/" + value.email,
//                 method: "GET",
//                 headers: {
//                     'Authorization': 'Bearer ' + accessToken
//                 },
//                 dataType: "json",
//                 success: function (res, textStatus, xhr) {
//                     localStorage.setItem('role', res.role);
//                     localStorage.setItem('cashier', value.email);
//                     if (res.role === "ADMIN") {
//                         window.location.href = "AdminDashBoard.html";
//                     } else if(res.role === "USER"){
//                         window.location.href = "UserDashBoard.html";
//                     }
//                 },
//                 error: function (ob, textStatus, error) {
//                     swal("Error","Error Sign in", "error");
//                 }
//             });
//
//         },
//         error: function (ob, textStatus, error) {
//             swal("Error", "Error Sign in", "error");
//         }
//     });
// });
//
// function isTokenExpired(token) {
//     const jwtPayload = JSON.parse(atob(token.split('.')[1]));
//     const expiryTime = jwtPayload.exp * 1000;
//     return Date.now() >= expiryTime;
// }
// function performAuthenticatedRequest() {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken || isTokenExpired(accessToken)) {
//         $.ajax({
//             url: lBaseUrl+"signin",
//             method: "POST",
//             data: JSON.stringify({
//                 email: localStorage.getItem('email'),
//                 password: localStorage.getItem('password'),
//             }),
//             contentType: "application/json",
//             success: function (res, textStatus, jsXH) {
//                 localStorage.setItem('accessToken', res.token);
//                 console.log("sign in Successfully "+res.token);
//             },
//             error: function (ob, textStatus, error) {
//                 console.log("token renew sign in error "+accessToken);
//             }
//         });
//     } else {
//
//     }
// }
let lBaseUrl = "http://localhost:8080/Back_End/api/v1/auth/";

$("#btnSingUp").click(function() {
    let value = {
        email: $("#upUser_Name").val(),
        password: $("#upPassword").val(),
        role: $('#role_Type').val()
    };
    console.log(value);
    $.ajax({
        url: lBaseUrl + "signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('accessToken', res.token);
            Swal.fire({
                icon: "success",
                title: "User Added Successfully",
                showConfirmButton: true,
                timer: 1500
            });
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error User Not Added",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

$("#btnLogin").click(function() {
    let value = {
        email: $("#user_Name").val(),
        password: $("#password").val(),
    };
    console.log(value);
    $.ajax({
        url: lBaseUrl + "signin",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully " + res.token);
            fetchUserDetails(value.email, res.token);
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error Sign in",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
});

function fetchUserDetails(email, token) {
    $.ajax({
        url: lBaseUrl + "search/" + email,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        dataType: "json",
        success: function (res, textStatus, xhr) {
            localStorage.setItem('role', res.role);
            localStorage.setItem('cashier', email);
            Swal.fire({
                icon: "success",
                title: "Welcome, " + res.email,
                showConfirmButton: true,
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (res.role === "ADMIN") {
                        window.location.href = "AdminDashBoard.html";
                    } else if(res.role === "USER"){
                        window.location.href = "UserDashBoard.html";
                    }
                }
            });
        },
        error: function (ob, textStatus, error) {
            Swal.fire({
                icon: "error",
                title: "Error fetching user details",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}

function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: lBaseUrl + "signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("Sign in successfully, new token: " + res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("Token renew sign in error " + error);
            }
        });
    }
}

