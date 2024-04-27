
let employeeBaseUrl = "http://localhost:8080/Back_End/";
loadAllEmployee();

$("#btnAddEmployee").attr('disabled', true);
$("#btnUpdateEmployee").attr('disabled', true);
$("#btnDeleteEmployee").attr('disabled', true);


function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    $.ajax({
        url: employeeBaseUrl + "employee/EmployeeIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#Employee_code").val("E00-00" + tempId);
            } else if (tempId <= 99) {
                $("#Employee_code").val("E00-0" + tempId);
            } else {
                $("#Employee_code").val("E00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

$("#btnAddEmployee").click(function () {
    let formData = $("#employeeForm").serialize();
    console.log(formData);
    $.ajax({
        url: employeeBaseUrl + "employee", method: "post", data: formData, dataType: "json", success: function (res) {
            saveUpdateAlert("Employee", res.message);
            loadAllEmployee();
        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});


function setTextFieldValues(Employee_code, employee_name, EProfile_pic, E_gender,E_status,E_Designation,E_AccessRole,E_dob,E_DOF,E_Attached,E_address_1,E_address_2,E_address_3,E_address_4,E_address_5,E_ContactNo,E_email,ICE,E_E_contact) {
    $("#Employee_code").val(Employee_code);
    $("#employee_name").val(employee_name);
    $("#EProfile_pic").val(EProfile_pic);
    $("#E_gender").val(E_gender);
    $("#E_status").val(E_status);
    $("#E_Designation").val(E_Designation);
    $("#E_AccessRole").val(E_AccessRole);
    $("#E_dob").val(E_dob);
    $("#E_DOF").val(E_DOF);
    $("#E_Attached").val(E_Attached);
    $("#E_address_1").val(E_address_1);
    $("#E_address_2").val(E_address_2);
    $("#E_address_3").val(E_address_3);
    $("#E_address_4").val(E_address_4);
    $("#E_address_5").val(E_address_5);
    $("#E_ContactNo").val(E_ContactNo);
    $("#E_email").val(E_email);
    $("#ICE").val(ICE);
    $("#E_E_contact").val(E_E_contact);

    $("#employee_name").focus();
    checkValidity(employeeValidations);

    $("#btnAddEmployee").attr('disabled', true);
    $("#btnUpdateEmployee").attr('disabled', true);
    $("#btnDeleteEmployee").attr('disabled', true);
}

function loadAllEmployee() {
    $("#employeeTable").empty();
    $.ajax({
        url: employeeBaseUrl + "employee/loadAllEmployee", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let Employee_code = i.Employee_code;
                let employee_name = i.employee_name;
                let EProfile_pic = i.image.EProfile_pic;
                let E_gender = i.E_gender;
                let E_status = i.E_status;
                let E_Designation = i.E_Designation;
                let E_AccessRole = i.E_AccessRole;
                let E_dob = i.E_dob;
                let E_DOF = i.E_DOF;
                let E_Attached = i.E_Attached;
                let E_address_1 = i.E_address_1;
                let E_address_2 = i.E_address_2;
                let E_address_3 = i.E_address_3;
                let E_address_4 = i.E_address_4;
                let E_address_5 = i.E_address_5;
                let E_ContactNo = i.E_ContactNo;
                let E_email = i.E_email;
                let ICE = i.ICE;
                let E_E_contact = i.E_E_contact;

                let row = "<tr><td>" + Employee_code + "</td><td>" + employee_name  + "</td><td>" + E_gender + "</td><td>" + E_status + "</td><td>" + E_Designation + "</td><td>" + E_AccessRole + "</td><td>" + E_dob + "</td><td>" + E_DOF + "</td><td>" + E_Attached + "</td><td>" + E_address_1 + "</td></tr>" + E_address_2 + "</td></tr>"+ E_address_3 + "</td></tr>"+ E_address_4 + "</td></tr>"+ E_address_5 + "</td></tr>"+ E_ContactNo + "</td></tr>"+ E_email + "</td></tr>"+ ICE + "</td></tr>"+ E_E_contact + "</td></tr>";
                $("#employeeTable").append(row);
            }
            blindClickEvents();
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "","","","","","","","","");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#employeeTable").empty();
        $.ajax({
            url: employeeBaseUrl + "employee/searchEmployee/?employee_Id="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#Employee_code").val(res.Employee_code);
                $("#employee_name").val(res.employee_name);
                $("#EProfile_pic").val(res.EProfile_pic);
                $("#E_gender").val(res.E_gender);
                $("#E_status").val(res.E_status);
                $("#email").val(res.email);
                $("#nic_No").val(res.nic_No);
                $("#license_No").val(res.license_No);
                $("#license_Img").prop(res.license_Img);
                $("#driverAvailability").val(res.driverAvailability);
                $("#role_Type").val(res.user.role_Type);
                $("#user_Name").val(res.user.user_Name);
                $("#password").val(res.user.password);


                let row = "<tr><td>" + res.user_Id + "</td><td>" + res.name.firstName + "</td><td>" + res.name.lastName + "</td><td>" + res.contact_No + "</td><td>" + res.address + "</td><td>" + res.email + "</td><td>" + res.nic_No + "</td><td>" + res.license_No + "</td><td>" + res.driverAvailability + "</td><td>" + res.user.role_Type + "</td><td>" + res.user.user_Name + "</td><td>" + res.user.password + "</td></tr>";
                $("#driverTable").append(row);
            },
            error: function (error) {
                loadAllDrivers();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});