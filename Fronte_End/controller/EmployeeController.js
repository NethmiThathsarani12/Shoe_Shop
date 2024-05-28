
let baseUrl = "http://localhost:8080/Back_End/";

$(document).ready(function (){
    loadAllEmployee();
});



$("#btnAddEmployee").attr('disabled', true);
$("#btnUpdateEmployee").attr('disabled', true);
$("#btnDeleteEmployee").attr('disabled', true);

//Employee Id generate

function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: baseUrl + "employee/EmployeeIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#Employee_code").val("E00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#Employee_code").val("E00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#Employee_code").val("E00-0" + tempId);
                } else {
                    $("#Employee_code").val("E00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

//employee save

$("#btnAddEmployee").click(function () {

        var image = $("#img");
        var imageUrl = image.attr('src');
        if (!imageUrl || imageUrl === '../../assets/img/nethmi.jpg') {
            //alert("Error");
            //swal("Error", "Take Item Photo.!", "error");
        }

    let formData = $("#employeeForm").serializeArray();
    formData.push({name: "pic", value: imageUrl});

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: baseUrl + "employee",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Employee", res.message);
            loadAllEmployee();

        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Employee", JSON.parse(xhr.responseText).message);
        }
    });
});

//clear text field

function setTextFieldValues(code, name, pic, gender,status,designation,role,birth,joinDate,branch,E_address_1,E_address_2,E_address_3,E_address_4,E_address_5,contact,email,person,EmgContact) {
    $("#Employee_code").val(code);
    $("#employee_name").val(name);
    $("#EProfile_pic").val(pic);
    $("#E_gender").val(gender);
    $("#E_status").val(status);
    $("#designation").val(designation);
    $("#E_AccessRole").val(role);
    $("#E_dob").val(birth);
    $("#E_DOF").val(joinDate);
    $("#E_Attached").val(branch);
    $("#E_address_1").val(E_address_1);
    $("#E_address_2").val(E_address_2);
    $("#E_address_3").val(E_address_3);
    $("#E_address_4").val(E_address_4);
    $("#E_address_5").val(E_address_5);
    $("#E_ContactNo").val(contact);
    $("#E_email").val(email);
    $("#ICE").val(person);
    $("#E_E_contact").val(EmgContact);

    $("#Employee_code").focus();
    // checkValidity(employeeValidations);

    $("#btnAddEmployee").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled', false);
}


function loadAllEmployee() {
    $("#employeeTable").empty();

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: baseUrl + "employee",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let pic = i.pic || ''; // Use empty string if pic is null
                let gender = i.gender;
                let status = i.status;
                let designation = i.designation;
                let role = i.role;
                let birth = i.birth;
                let joinDate = i.joinDate;
                let branch = i.branch;
                let address = i.address || {}; // Use empty object if address is null
                let contact = i.contact;
                let email = i.email;
                let person = i.person;
                let EmgContact = i.emgContact;

                // Access address properties correctly
                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';

                // Concatenate address properties
                let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                let row = `<tr><td>${code}</td><td>${name}</td><td>${gender}</td><td>${status}</td><td>${designation}</td><td>${role}</td><td>${birth}</td><td>${joinDate}</td><td>${branch}</td><td>${addressColumn}</td><td>${contact}</td><td>${email}</td><td>${person}</td><td>${EmgContact}</td></tr>`;
                $("#employeeTable").append(row);
            }
            blindClickEventsE();
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}


function blindClickEventsE() {
    $("#employeeTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let status = $(this).children().eq(3).text();
        let designation = $(this).children().eq(4).text();
        let role = $(this).children().eq(5).text();
        let birth = $(this).children().eq(6).text();
        let joinDate = $(this).children().eq(7).text();
        let branch = $(this).children().eq(8).text();
        let addressColumn = $(this).children().eq(9).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact = $(this).children().eq(10).text();
        let email = $(this).children().eq(11).text();
        let person = $(this).children().eq(12).text();
        let EmgContact = $(this).children().eq(13).text();

        // Set values to respective input fields
        $("#Employee_code").val(code);
        $("#employee_name").val(name);
        $("#E_gender").val(gender);
        $("#E_status").val(status);
        $("#designation").val(designation);
        $("#E_AccessRole").val(role);
        $("#E_dob").val(birth);
        $("#E_DOF").val(joinDate);
        $("#E_Attached").val(branch);
        $("#E_address_1").val(address1);
        $("#E_address_2").val(address2);
        $("#E_address_3").val(address3);
        $("#E_address_4").val(address4);
        $("#E_address_5").val(address5);
        $("#E_ContactNo").val(contact);
        $("#E_email").val(email);
        $("#ICE").val(person);
        $("#E_E_contact").val(EmgContact);
    });

    $("#btnAddEmployee").attr('disabled', true);
}

//
// $("#search_Id").on("keypress", function (event) {
//     if (event.which === 13) {
//         var search = $("#search_Id").val();
//         $("#employeeTable").empty();
//         $.ajax({
//             url: baseUrl + "employee/searchEmployee/?employee_Id="+ search,
//             method: "GET",
//             contentType: "application/json",
//             dataType: "json",
//             success: function (res) {
//                 console.log(res);
//                 if (res) {
//                     $("#Employee_code").val(res.code);
//                     $("#employee_name").val(res.name);
//                     $("#EProfile_pic").val(res.pic);
//                     $("#E_gender").val(res.gender);
//                     $("#E_status").val(res.status);
//                     $("#designation").val(res.designation);
//                     $("#E_AccessRole").val(res.role);
//                     $("#E_dob").val(res.birth);
//                     $("#E_DOF").val(res.joinDate);
//                     $("#E_Attached").val(res.branch);
//
//                     // Accessing address properties correctly
//                     let address = res.address || {}; // Use empty object if address is null
//                     $("#E_address_1").val(address.address1 || '');
//                     $("#E_address_2").val(address.address2 || '');
//                     $("#E_address_3").val(address.address3 || '');
//                     $("#E_address_4").val(address.address4 || '');
//                     $("#E_address_5").val(address.address5 || '');
//
//                     $("#E_ContactNo").val(res.contact);
//                     $("#E_email").val(res.email);
//                     $("#ICE").val(res.person);
//                     $("#E_E_contact").val(res.emgContact);
//
//                     // Appending row to employee table
//                     let row = "<tr><td>" + res.code + "</td><td>" + res.name + "</td><td>" + res.pic + "</td><td>" + res.gender + "</td><td>" + res.status + "</td><td>" + res.designation + "</td><td>" + res.role + "</td><td>" + res.birth + "</td><td>" + res.joinDate + "</td><td>" + (address.address1 || '') + "</td><td>" + (address.address2 || '') + "</td><td>" + (address.address3 || '') + "</td><td>" + (address.address4 || '') + "</td><td>" + (address.address5 || '') + "</td><td>" + res.contact + "</td><td>" + res.email + "</td><td>" + res.person + "</td><td>" + res.emgContact + "</td></tr>";
//                     $("#employeeTable").append(row);
//                 } else {
//                     // Handle case when no employee found
//                     emptyMassage("No employee found.");
//                 }
//             },
//             error: function (error) {
//                 loadAllEmployee();
//                 let message = JSON.parse(error.responseText).message;
//                 emptyMassage(message);
//             }
//         });
//     }
// });

//update employee

$("#btnUpdateEmployee").click(function () {

    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/nethmi.jpg') {
        // Handle error scenario
    }
    let formData = $("#employeeForm").serialize();
    // let empId = $("#Employee_code").val();
    // formData += "&code=" + empId;
    console.log(formData);

    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    // console.log(formData);
    $.ajax({
        url: baseUrl + "employee",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("updated", res.message);
            loadAllEmployee()
        },
        error: function (error) {
            unSuccessUpdateAlert("updated", JSON.parse(error.responseText).message);
        }
    });
});


//Delete employee

$("#btnDeleteEmployee").click(function () {
    let id = $("#Employee_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: baseUrl + "employee?code=" + id , method: "delete",headers: {
            'Authorization': 'Bearer ' + accessToken
        }, dataType: "json", success: function (resp) {
            saveUpdateAlert("Employee", resp.message);
            loadAllEmployee();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Employee", message);
        }
    });
});


$('#EProfile_pic').change(function() {
    var fileInput = $('#EProfile_pic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
       // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});
//
// $("#search_EmployeeId").on("keypress", function (event) {
//     if (event.which === 13) {
//         var search = $("#search_EmployeeId").val();
//         $("#employeeTable").empty();
//         $.ajax({
//             url: baseUrl + "employee/searchEmployee?code=" + search,
//             method: "GET",
//             contentType: "application/json",
//             dataType: "json",
//             data: { employee_Id: search }, // Send the search parameter as an object
//             success: function (res) {
//                 console.log(res);
//                 if (res) {
//                     let code = res.code;
//                     let name = res.name;
//                     let pic = res.pic;
//                     let gender = res.gender;
//                     let status = res.status;
//                     let designation = res.designation;
//                     let role = res.role;
//                     let birth = res.birth;
//                     let joinDate = res.joinDate;
//                     let address = res.address || '';
//                     let contact = res.contact;
//                     let email = res.email;
//                     let person = res.person;
//                     let EmgContact = res.emgContact;
//
//                     let ad1 = address.address1 || '';
//                     let ad2 = address.address2 || '';
//                     let ad3 = address.address3 || '';
//                     let ad4 = address.address4 || '';
//                     let ad5 = address.address5 || '';
//
//                     // Concatenate address properties
//                     let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;
//
//                     let row = "<tr><td>" + code + "</td><td>" + name  + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + designation + "</td><td>" + role + "</td><td>" + birth + "</td><td>" + joinDate + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + person + "</td><td>" + EmgContact + "</td></tr>";
//                     $("#employeeTable").append(row);
//                     blindClickEventsE();
//                 } else {
//                     // No data found
//                     console.log("No data found");
//                     // Handle this case if required
//                 }
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error:", error);
//                 loadAllEmployee(); // Load all employees as fallback
//                 let message = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
//                 emptyMassage(message);
//             }
//         });
//     }
// });


$("#search_EmployeeId").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_EmployeeId").val();
        $("#employeeTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: baseUrl + "employee/searchEmployee",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search, // Provide the 'code' parameter
                name: search  // Provide the 'name' parameter
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let pic = res.pic;
                    let gender = res.gender;
                    let status = res.status;
                    let designation = res.designation;
                    let role = res.role;
                    let birth = res.birth;
                    let joinDate = res.joinDate;
                    let address = res.address || '';
                    let contact = res.contact;
                    let email = res.email;
                    let person = res.person;
                    let EmgContact = res.emgContact;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    // Concatenate address properties
                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                    let row = "<tr><td>" + code + "</td><td>" + name  + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + designation + "</td><td>" + role + "</td><td>" + birth + "</td><td>" + joinDate + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + person + "</td><td>" + EmgContact + "</td></tr>";
                    $("#employeeTable").append(row);
                    blindClickEventsE();
                } else {
                    // No data found
                    console.log("No data found");
                    // Handle this case if required
                }
            },
            error: function (error) {
                loadAllEmployee();
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
});

function clearDetails() {
    $('#employee_name,#EProfile_pic,#E_gender,#E_status,#designation,#E_AccessRole,#E_dob,#E_DOF,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact').val("");

}

$("#btnClearEmplyee").click(function () {
    clearDetails();
});

//Employee Validation


$("#Employee_code").focus();
const regExEmpID = /^(E00-)[0-9]{3,4}$/;
const regExEmpName = /^[A-z ]{3,20}$/;
const regExEmpStatus = /^[A-z ]{3,20}$/;
const regExEmpBranch = /^[A-z ]{3,20}$/;
const regExEmpAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExEmpContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExEmpEmailAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regExEmpInfo = /^[A-z ]{3,20}$/;
const regExEmpContactNumEm = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;

let employeeValidations = [];
employeeValidations.push({
    reg: regExEmpID, field: $('#Employee_code'), error: 'Employee ID Pattern is Wrong : C00-001'
});

employeeValidations.push({
    reg: regExEmpName, field: $('#employee_name'), error: 'Employee Name Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpStatus, field: $('#E_status'), error: 'Employee Status Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpBranch, field: $('#E_Attached'), error: 'Employee Branch Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpAddress1, field: $('#E_address_1'), error: 'Employee Address Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpAddress2, field: $('#E_address_2'), error: 'Employee Address Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpAddress3, field: $('#E_address_3'), error: 'Employee Address Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpAddress4, field: $('#E_address_4'), error: 'Employee Address Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpAddress5, field: $('#E_address_5'), error: 'Employee Address Pattern is Wrong : A-z 3-20'
});

employeeValidations.push({
    reg: regExEmpContactNum, field: $('#E_ContactNo'), error: 'Employee Contact Pattern is Wrong :  0-9'
});

employeeValidations.push({
    reg: regExEmpEmailAddress, field: $('#E_email'), error: 'Employee Email Pattern is Wrong :  enter correct email with "@"'
});

employeeValidations.push({
    reg: regExEmpInfo, field: $('#ICE'), error: 'Employee Info Pattern is Wrong :  enter correct '
});

employeeValidations.push({
    reg: regExEmpContactNumEm, field: $('#E_E_contact'), error: 'Employee contact Pattern is Wrong :  enter correct '
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('keyup', function (event) {
    checkValidity(employeeValidations);
});

$("#Employee_code,#employee_name,#E_status,#E_Attached,#E_address_1,#E_address_2,#E_address_3,#E_address_4,#E_address_5,#E_ContactNo,#E_email,#ICE,#E_E_contact").on('blur', function (event) {
    checkValidity(employeeValidations);
});

$("#Employee_code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpID, $("#Employee_code"))) {
        $("#employee_name").focus();
    } else {
        focusText($("#employee_name"));
    }
});

$("#employee_name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#employee_name"))) {
        focusText($("#EProfile_pic"));
    }
});

$("#E_status").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpStatus, $("#E_status"))) {
        focusText($("#designation"));
    }
});

$("#E_Attached").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpBranch, $("#E_Attached"))) {
        focusText($("#E_address_1"));
    }
});

$("#E_address_1").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress1, $("#E_address_1"))) {
        focusText($("#E_address_2"));
    }
});

$("#E_address_2").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress2, $("#E_address_2"))) {
        focusText($("#E_address_3"));
    }
});

$("#E_address_3").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress3, $("#E_address_3"))) {
        focusText($("#E_address_4"));
    }
});

$("#E_address_4").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress4, $("#E_address_4"))) {
        focusText($("#E_address_5"));
    }
});

$("#E_address_5").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpAddress5, $("#E_address_5"))) {
        focusText($("#E_ContactNo"));
    }
});

$("#E_ContactNo").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpContactNum, $("#E_ContactNo"))) {
        focusText($("#E_email"));
    }
});

$("#E_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpEmailAddress, $("#E_email"))) {
        focusText($("#ICE"));
    }
});

$("#ICE").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpInfo, $("#ICE"))) {
        focusText($("#emgContact"));
    }
});

$("#emgContact").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpContactNumEm, $("#emgContact"))) {
        if (event.which === 13) {
            $('#btnAddEmployee').focus();
        }
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnAddEmployee").attr('disabled', true);
        $("#btnUpdateEmployee").attr('disabled', true);
        $("#btnDeleteEmployee").attr('disabled', true);
    } else {
        $("#btnAddEmployee").attr('disabled', false);
        $("#btnUpdateEmployee").attr('disabled', false);
        $("#btnDeleteEmployee").attr('disabled', false);
    }
}