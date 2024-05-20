let supBaseUrl = "http://localhost:8080/Back_End/";

$(document).ready(function (){
    loadAllSupplierD();
});


function loadAllSupplierD() {
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


$("#sup_d_id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#sup_d_id").val();
        $("#supplierTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
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
