let cusBaseUrl = "http://localhost:8080/Back_End/";
generateCustomerID();

loadAllCustomer();



$("#btnAddCustomer").attr('disabled', false);
$("#btnUpdateCustomer").attr('disabled', false);
$("#btnDeleteCustomer").attr('disabled', false);

function generateCustomerID() {
    $("#customer_code").val("C00-001");
    $.ajax({
        url: cusBaseUrl + "customer/CustomerIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#customer_code").val("C00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#customer_code").val("C00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#customer_code").val("C00-0" + tempId);
                } else {
                    $("#customer_code").val("C00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}
$("#btnAddCustomer").click(function () {
    // Get form data
    let formData = new FormData($("#customerForm")[0]);

    // Convert dates to proper format before sending
    formData.set("dob", formatDate(formData.get("dob")));
    formData.set("loyaltyDate", formatDate(formData.get("loyaltyDate")));
    formData.set("recentPurchaseDate", formatTimestamp(formData.get("recentPurchaseDate")));

    if(customer.recentPurchaseDate===null){
        customer.recentPurchaseDate="No Purchases Yet";
    }

    // Send AJAX request
    $.ajax({
        url: cusBaseUrl + "customer",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Customer", res.message);
            // loadAllCustomer();
        },
        error: function (error) {
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});

// Function to format date to yyyy-MM-dd
function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Function to format timestamp to yyyy-MM-dd HH:mm:ss
function formatTimestamp(timestamp) {
    let d = new Date(timestamp);
    let year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
}




function loadAllCustomer() {
    $("#customerTable").empty();
    $.ajax({
        url: cusBaseUrl + "customer/loadAllEmployee", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let gender = i.gender;
                let loyaltyDate = i.loyaltyDate;
                let level = i.loyaltyLevel;
                let email = i.email;
                let recentPurchaseDate = i.recentPurchaseDate;
                let loyaltyPoints = i.loyaltyPoints;
                let dob = i.dob;
                let addressLine1 = i.addressLine1;
                let addressLine2 = i.addressLine2;
                let contact = i.contact;


                let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + loyaltyDate + "</td><td>" + level + "</td><td>" + email + "</td><td>" + recentPurchaseDate + "</td><td>" + loyaltyPoints + "</td><td>" + dob + "</td><td>" + addressLine1 + "</td><td>" + addressLine2 + "</td><td>" + contact + "</td></tr>";
                $("#customerTable").append(row);
            }
            // blindClickEventsD();
            generateCustomerID();
            // setTextFieldValuesD("", "", "", "", "", "", "", "", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}