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


