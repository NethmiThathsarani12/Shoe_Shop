let supBaseUrl = "http://localhost:8080/Back_End/";

$(document).ready(function() {
    loadAllSupplier();
});

function generateSupplierID() {
    $("#Supplier_code").val("S00-001");
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: supBaseUrl + "supplier/SupplierIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function(resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#Supplier_code").val("S00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]) + 1;
                let newId = "S00-" + ("000" + tempId).slice(-3);
                $("#Supplier_code").val(newId);
            }
        },
        error: function(ob, statusText, error) {
            console.error(error);
        }
    });
}

$("#btnAddSupplier").click(function() {
    let formData = $("#supplierForm").serializeArray();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: supBaseUrl + "supplier",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function(res) {
            saveUpdateAlert("Supplier", res.message);
            loadAllSupplier();
        },
        error: function(xhr, status, error) {
            unSuccessUpdateAlert("Supplier", JSON.parse(xhr.responseText).message);
        }
    });
});

function loadAllSupplier() {
    $("#supplierTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: supBaseUrl + "supplier",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function(res) {
            for (let supplier of res.data) {
                let code = supplier.code;
                let name = supplier.name;
                let category = supplier.category;
                let address = supplier.address || {};
                let contact1 = supplier.contact1;
                let contact2 = supplier.contact2;
                let email = supplier.email;

                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';
                let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                let row = `<tr><td>${code}</td><td>${name}</td><td>${category}</td><td>${addressColumn}</td><td>${contact1}</td><td>${contact2}</td><td>${email}</td></tr>`;
                $("#supplierTable").append(row);
            }
            blindClickEventsS();
            generateSupplierID();
            setTextFieldValuesS("", "", "", "", "", "", "", "", "", "", "");
        },
        error: function(error) {
            console.error(error);
        }
    });
}

function setTextFieldValuesS(code, name, category, address1, address2, address3, address4, address5, contact1, contact2, email) {
    $("#Supplier_code").val(code);
    $("#supplier_name").val(name);
    $("#S_category").val(category);
    $("#supplier_address_01").val(address1);
    $("#supplier_address_02").val(address2);
    $("#supplier_address_03").val(address3);
    $("#supplier_address_04").val(address4);
    $("#supplier_address_05").val(address5);
    $("#su_conatct_01").val(contact1);
    $("#su_conatct_02").val(contact2);
    $("#sup_email").val(email);

    $("#Supplier_code").focus();

    $("#btnAddSupplier").attr('disabled', false);
    $("#btnUpdateSupplier").attr('disabled', false);
    $("#btnDeleteSupplier").attr('disabled', false);
}

function blindClickEventsS() {
    $("#supplierTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let addressColumn = $(this).children().eq(3).text(); // Assuming address is in one column
        let contact1 = $(this).children().eq(4).text();
        let contact2 = $(this).children().eq(5).text();
        let email = $(this).children().eq(6).text();

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        // Set values to respective input fields
        setTextFieldValuesS(code, name, category, address1, address2, address3, address4, address5, contact1, contact2, email);
    });

    $("#btnAddSupplier").attr('disabled', false);
}





$("#btnUpdateSupplier").click(function () {
    let formData = $("#supplierForm").serialize();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: supBaseUrl + "supplier",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Supplier updated", res.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Supplier update failed", JSON.parse(xhr.responseText).message);
        }
    });
});

$("#btnDeleteSupplier").click(function () {
    let id = $("#Supplier_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: supBaseUrl + "supplier?code=" + id,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Supplier", resp.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Supplier", message);
        }
    });
});


$("#search_Supplier").on("keypress", function (event) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    if (event.which === 13) {
        var search = $("#search_Supplier").val();

        $("#supplierTable").empty();
        $.ajax({
            url: supBaseUrl + "supplier/searchSupplier?code=" + search,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            data: { supplier_Id: search }, // Send the search parameter as an object
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let category = res.category;
                    let address = res.address || '';
                    let contact1 = res.contact1;
                    let contact2 = res.contact2;
                    let email = res.email;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    // Concatenate address properties
                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                    let row = "<tr><td>" + code + "</td><td>" + name  + "</td><td>" + category + "</td><td>" + addressColumn + "</td><td>" + contact1 + "</td><td>" + contact2 + "</td><td>" + email +"</td></tr>";
                    $("#supplierTable").append(row);
                    blindClickEventsS();
                } else {
                    // No data found
                    console.log("No data found");
                    // Handle this case if required
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                loadAllSupplier(); // Load all employees as fallback
                let message = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
                emptyMassage(message);
            }
        });
    }
});


function clearDetails() {
    $('#supplier_name,#S_category,#supplier_address_01,#supplier_address_02,#supplier_address_03,#supplier_address_04,#supplier_address_05,#su_conatct_01,#su_conatct_02,#sup_email').val("");

}

$("#btnClearSupplier").click(function () {
    clearDetails();
});

$("#Supplier_code").focus();
const regExSupID = /^(S00-)[0-9]{3,4}$/;
const regExSupName = /^[A-z ]{3,20}$/;
const regExSupAddress1 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress2 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress3 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress4 = /^[A-z0-9/ ]{4,30}$/;
const regExSupAddress5 = /^[A-z0-9/ ]{4,30}$/;
const regExSupContactNum = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExSupContactNum2 = /^(07(0|1|2|4|5|6|7|8)[0-9]{7})$/;
const regExSupEmailSupAddress = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let supplierValidations = [];
supplierValidations.push({
    reg: regExSupID, field: $('#Supplier_code'), error: 'Supplier ID Pattern is Wrong : S00-001'
});
supplierValidations.push({
    reg: regExSupName, field: $('#supplier_name'), error: 'Supplier Name Pattern is Wrong : A-z 3-20'
});
supplierValidations.push({
    reg: regExSupAddress1, field: $('#supplier_address_01'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress2, field: $('#supplier_address_02'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress3, field: $('#supplier_address_03'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress4, field: $('#supplier_address_04'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupAddress5, field: $('#supplier_address_05'), error: 'Supplier Address is Wrong : Enter address'
});
supplierValidations.push({
    reg: regExSupContactNum, field: $('#su_conatct_01'), error: 'Supplier contact is Wrong : Enter email address'
});
supplierValidations.push({
    reg: regExSupContactNum2, field: $('#su_conatct_02'), error: 'Employee contact is Wrong : Enter email address'
});
supplierValidations.push({
    reg: regExSupEmailSupAddress, field: $('#sup_email'), error: 'Supplier email is Wrong : Enter email address'
});

$("#Supplier_code,#supplier_name,#supplier_address_01,#supplier_address_02,#supplier_address_03,#supplier_address_04,#supplier_address_05,#su_conatct_01,#su_conatct_02,#sup_email").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#Supplier_code,#supplier_name,#supplier_address_01,#supplier_address_02,#supplier_address_03,#supplier_address_04,#supplier_address_05,#su_conatct_01,#su_conatct_02,#sup_email").on('keyup', function (event) {
    checkValidity(supplierValidations);
});

$("#Supplier_code,#supplier_name,#supplier_address_01,#supplier_address_02,#supplier_address_03,#supplier_address_04,#supplier_address_05,#su_conatct_01,#su_conatct_02,#sup_email").on('blur', function (event) {
    checkValidity(supplierValidations);
});

$("#Supplier_code").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpID, $("#Supplier_code"))) {
        $("#supplier_name").focus();
    } else {
        focusText($("#Supplier_code"));
    }
});

$("#supplier_name").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExEmpName, $("#supplier_name"))) {
        focusText($("#S_category"));
    }
});

$("#supplier_address_01").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupAddress1, $("#supplier_address_01"))) {
        focusText($("#supplier_address_02"));
    }
});

$("#supplier_address_02").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupAddress2, $("#supplier_address_02"))) {
        focusText($("#supplier_address_03"));
    }
});

$("#supplier_address_03").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupAddress3, $("#supplier_address_03"))) {
        focusText($("#supplier_address_04"));
    }
});

$("#supplier_address_04").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupAddress4, $("#supplier_address_04"))) {
        focusText($("#supplier_address_05"));
    }
});

$("#supplier_address_05").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupAddress5, $("#supplier_address_05"))) {
        focusText($("#su_conatct_01"));
    }
});

$("#su_conatct_01").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupContactNum, $("#su_conatct_01"))) {
        focusText($("#su_conatct_02"));
    }
});

$("#su_conatct_02").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupContactNum2, $("#su_conatct_02"))) {
        focusText($("#sup_email"));
    }
});

$("#sup_email").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSupEmailSupAddress, $("#sup_email"))) {
        focusText($("#btnAddSupplier"));
    }
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnAddSupplier").attr('disabled', true);
        $("#btnUpdateSupplier").attr('disabled', true);
        $("#btnDeleteSupplier").attr('disabled', true);
    } else {
        $("#btnAddSupplier").attr('disabled', false);
        $("#btnUpdateSupplier").attr('disabled', false);
        $("#btnDeleteSupplier").attr('disabled',false);
    }
}