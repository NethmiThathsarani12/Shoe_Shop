
let baseUrl = "http://localhost:8080/Back_End/";
loadAllEmployee();

$("#btnAddEmployee").attr('disabled', false);
$("#btnUpdateEmployee").attr('disabled', true);
$("#btnDeleteEmployee").attr('disabled', true);


function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    $.ajax({
        url: baseUrl + "employee/EmployeeIdGenerate",
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
        url: baseUrl + "employee", method: "post", data: formData, dataType: "json", success: function (res) {
            saveUpdateAlert("Employee", res.message);
            loadAllEmployee();
        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});


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
    checkValidity(employeeValidations);

    $("#btnAddEmployee").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', true);
    $("#btnDeleteEmployee").attr('disabled', true);
}

function loadAllEmployee() {
    $("#employeeTable").empty();
    $.ajax({
        url: baseUrl + "employee", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let pic = i.pic;
                let gender = i.gender;
                let status = i.status;
                let designation = i.designation;
                let role = i.role;
                let birth = i.birth;
                let joinDate = i.joinDate;
                let branch = i.branch;
                let E_address_1 = i.E_address_1;
                let E_address_2 = i.E_address_2;
                let E_address_3 = i.E_address_3;
                let E_address_4 = i.E_address_4;
                let E_address_5 = i.E_address_5;
                let contact = i.contact;
                let email = i.email;
                let person = i.person;
                let EmgContact = i.EmgContact;

                let row = "<tr><td>" + code + "</td><td>" + name  + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + designation + "</td><td>" + role + "</td><td>" + birth + "</td><td>" + joinDate + "</td><td>" + branch + "</td><td>" + E_address_1 + "</td></tr>" + E_address_2 + "</td></tr>"+ E_address_3 + "</td></tr>"+ E_address_4 + "</td></tr>"+ E_address_5 + "</td></tr>"+ contact + "</td></tr>"+ email + "</td></tr>"+ person + "</td></tr>"+ EmgContact + "</td></tr>";
                $("#employeeTable").append(row);
            }
             blindClickEventsE();
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "","","","","","","","","");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}


function blindClickEventsE() {
    $("#employeeTable>tr").on("click", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        // let pic = $(this).children().eq(2).text();
        let gender = $(this).children().eq(2).text();
        let status = $(this).children().eq(3).text();
        let designation = $(this).children().eq(4).text();
        let role = $(this).children().eq(5).text();
        let birth = $(this).children().eq(6).text();
        let joinDate = $(this).children().eq(7).text();
        let branch = $(this).children().eq(8).text();
        let address1 = $(this).children().eq(9).text();
        let address2 = $(this).children().eq(10).text();
        let address3 = $(this).children().eq(11).text();
        let address4 = $(this).children().eq(12).text();
        let address5 = $(this).children().eq(13).text();
        let contact = $(this).children().eq(14).text();
        let email = $(this).children().eq(15).text();
        let person = $(this).children().eq(16).text();
        let EmgContact = $(this).children().eq(17).text();


        console.log(code, name,  gender, status, designation,role , birth, joinDate, branch, address1,address2,address3,address4,address5,contact,email,person,EmgContact);

        $("#Employee_code").val(code);
        $("#employee_name").val(name);
        // $("#EProfile_pic").val(pic);
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
    $("#btnAddEmployee").attr('disabled', false);
}

$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#employeeTable").empty();
        $.ajax({
            url: baseUrl + "employee/searchEmployee/?employee_Id="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#Employee_code").val(res.code);
                $("#employee_name").val(res.name);
                $("#EProfile_pic").val(res.pic);
                $("#E_gender").val(res.gender);
                $("#E_status").val(res.status);
                $("#designation").val(res.designation);
                $("#E_AccessRole").val(res.role);
                $("#E_dob").val(res.birth);
                $("#E_DOF").val(res.joinDate);
                $("#E_Attached").val(res.branch);
                $("#E_address_1").val(res.E_address_1);
                $("#E_address_2").val(res.E_address_2);
                $("#E_address_3").val(res.E_address_3);
                $("#E_address_4").val(res.E_address_4);
                $("#E_address_5").val(res.E_address_5);
                $("#E_ContactNo").val(res.contact);
                $("#E_email").val(res.email);
                $("#ICE").val(res.person);
                $("#E_E_contact").val(res.EmgContact);



                let row = "<tr><td>" + res.code + "</td><td>" + res.name + "</td><td>" + res.pic + "</td><td>" + res.gender + "</td><td>" + res.status + "</td><td>" + res.designation + "</td><td>" + res.role + "</td><td>" + res.birth + "</td><td>" + res.joinDate + "</td><td>" + res.E_address_1 + "</td><td>" + res.E_address_2 + "</td><td>" + res.E_address_3 + "</td></tr>"+ "</td><td>" + res.E_address_4 + "</td><td>" + res.E_address_5+ "</td><td>" + res.contact+ "</td><td>" + res.email + "</td><td>" + res.person+ "</td><td>" + res.EmgContact +"</td></tr>";
                $("#employeeTable").append(row);
            },
            error: function (error) {
                loadAllEmployee();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});