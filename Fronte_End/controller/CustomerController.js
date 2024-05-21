let cusBaseUrl = "http://localhost:8080/Back_End/";

    // Load all customers and set purchaseDate to current date and time
    loadAllCustomer();

    function generateCustomerID() {
        $("#customer_code").val("C00-001");
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: cusBaseUrl + "customer/CustomerIdGenerate",
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
                    $("#customer_code").val("C00-001" );
                } else {
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
        // Set purchaseDate field to current date and time
        $('#purchaseDate').val(new Date().toISOString().slice(0, 19).replace('T', ' '));

        let formData = $("#customerForm").serializeArray();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: cusBaseUrl + "customer",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: formData,
            dataType: "json",
            success: function (res) {
                saveUpdateAlert("Customer", res.message);
                loadAllCustomer();
            },
            error: function (xhr, status, error) {
                unSuccessUpdateAlert("Customer", JSON.parse(xhr.responseText).message);
            }
        });
    });

    function setTextFieldValuesC(code, name, gender, loyaltyDate, level, total_point, customer_dob, c_address_01, c_address_02, c_address_03, c_address_04, c_address_05, c_contact_num, customer_email, purchaseDate) {
        $("#customer_code").val(code);
        $("#customer_name").val(name);
        $("#customer_gender").val(gender);
        $("#customer_jdlc").val(loyaltyDate);
        $("#level").val(level);
        $("#total_point").val(total_point);
        $("#customer_dob").val(customer_dob);
        $("#c_address_01").val(c_address_01);
        $("#c_address_02").val(c_address_02);
        $("#c_address_03").val(c_address_03);
        $("#c_address_04").val(c_address_04);
        $("#c_address_05").val(c_address_05);
        $("#c_contact_num").val(c_contact_num);
        $("#customer_email").val(customer_email);
        $("#purchaseDate").val(purchaseDate);

        $("#customer_code").focus();
        $("#btnAddCustomer").attr('disabled', false);
        $("#btnUpdateCustomer").attr('disabled', false);
        $("#btnDeleteCustomer").attr('disabled', false);
    }

    function loadAllCustomer() {
        $("#customerTable").empty();
        // Set purchaseDate field to current date and time
        $('#purchaseDate').val(new Date().toISOString().slice(0, 19).replace('T', ' '));
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: cusBaseUrl + "customer",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res) {
                for (let i of res.data) {
                    let code = i.code;
                    let name = i.name;
                    let gender = i.gender;
                    let loyaltyDate = i.loyaltyDate;
                    let level = i.level;
                    let loyaltyPoints = i.loyaltyPoints;
                    let dob = i.dob;
                    let address = i.address || {};
                    let contact = i.contact;
                    let email = i.email;
                    let recentPurchaseDate = i.recentPurchaseDate;

                    let ad1 = address.address1 || '';
                    let ad2 = address.address2 || '';
                    let ad3 = address.address3 || '';
                    let ad4 = address.address4 || '';
                    let ad5 = address.address5 || '';

                    let addressColumn = `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                    let row = `<tr><td>${code}</td><td>${name}</td><td>${gender}</td><td>${loyaltyDate}</td><td>${level}</td><td>${loyaltyPoints}</td><td>${dob}</td><td>${addressColumn}</td><td>${contact}</td><td>${email}</td><td>${recentPurchaseDate}</td></tr>`;
                    $("#customerTable").append(row);
                }
                blindClickEventsC();
                generateCustomerID();
                setTextFieldValuesC("", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
                console.log(res.message);
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                console.log(message);
            }
        });
    }


    function blindClickEventsC() {
        $("#customerTable").on("click", "tr", function () {
            let code = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let gender = $(this).children().eq(2).text();
            let loyaltyDate = $(this).children().eq(3).text();
            let level = $(this).children().eq(4).text();
            let loyaltyPoints = $(this).children().eq(5).text();
            let dob = $(this).children().eq(6).text();
            let addressColumn = $(this).children().eq(7).text(); // Assuming address is in one column

            // Split address into individual components
            let addressComponents = addressColumn.split(', ');
            let address1 = addressComponents[0] || '';
            let address2 = addressComponents[1] || '';
            let address3 = addressComponents[2] || '';
            let address4 = addressComponents[3] || '';
            let address5 = addressComponents[4] || '';

            let contact = $(this).children().eq(8).text();
            let email = $(this).children().eq(9).text();
            let purchaseDate = $(this).children().eq(10).text();

            // Set values to respective input fields
            $("#customer_code").val(code);
            $("#customer_name").val(name);
            $("#customer_gender").val(gender);
            $("#customer_jdlc").val(loyaltyDate);
            $("#level").val(level);
            $("#total_point").val(loyaltyPoints);
            $("#customer_dob").val(dob);
            $("#c_address_01").val(address1);
            $("#c_address_02").val(address2);
            $("#c_address_03").val(address3);
            $("#c_address_04").val(address4);
            $("#c_address_05").val(address5);
            $("#c_contact_num").val(contact);
            $("#customer_email").val(email);
            $("#purchaseDate").val(purchaseDate);

            // Enable buttons
            $("#btnAddCustomer").attr('disabled', false);
            $("#btnUpdateCustomer").attr('disabled', false);
            $("#btnDeleteCustomer").attr('disabled', false);
        });
    }

    $("#btnUpdateCustomer").click(function () {
        let formData = $("#customerForm").serialize();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: cusBaseUrl + "customer",
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: formData,
            dataType: "json",
            success: function (res) {
                saveUpdateAlert("Customer updated", res.message);
                loadAllCustomer();
            },
            error: function (xhr, status, error) {
                unSuccessUpdateAlert("Customer update failed", JSON.parse(xhr.responseText).message);
            }
        });
    });

    $("#btnDeleteCustomer").click(function () {
        let id = $("#customer_code").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: cusBaseUrl + "customer?code=" + id,
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (resp) {
                saveUpdateAlert("Customer", resp.message);
                loadAllCustomer();
            },
            error: function (xhr, status, error) {
                let message = JSON.parse(xhr.responseText).message;
                unSuccessUpdateAlert("Customer", message);
            }
        });
    });

    // $("#search_CId").on("keypress", function (event) {
    //     if (event.which === 13) {
    //         var search = $("#search_CId").val();
    //         $("#customerTable").empty();
    //         $.ajax({
    //             url: cusBaseUrl + "customer/searchCustomer",
    //             method: "GET",
    //             contentType: "application/json",
    //             dataType: "json",
    //             data: { code: search }, // Send the search parameter as an object
    //             success: function (res) {
    //                 console.log(res);
    //                 if (res) {
    //                     let code = res.code;
    //                     let name = res.name;
    //                     let gender = res.gender;
    //                     let loyaltyDate = res.loyaltyDate;
    //                     let level = res.level;
    //                     let loyaltyPoints = res.loyaltyPoints;
    //                     let dob = res.dob;
    //                     let addressColumn = res.address || '';
    //                     let contact = res.contact;
    //                     let email = res.email;
    //                     let recentPurchaseDate = res.recentPurchaseDate;
    //
    //                     let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + loyaltyDate + "</td><td>" + level + "</td><td>" + loyaltyPoints + "</td><td>" + dob + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + recentPurchaseDate + "</td></tr>";
    //                     $("#customerTable").append(row);
    //                     blindClickEventsC();
    //                 } else {
    //                     // No data found
    //                     console.log("No data found");
    //                     // Handle this case if required
    //                 }
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error("Error:", error);
    //                 loadAllCustomer(); // Load all customers as fallback
    //                 let message = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
    //                 emptyMassage(message);
    //             }
    //         });
    //     }
    // });


    $("#search_CId").on("keypress", function (event) {
        if (event.which === 13) {
            var search = $("#search_CId").val();
            $("#customerTable").empty();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: cusBaseUrl + "customer/searchCustomer",
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: {
                    code: search,
                    name: search
                },
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res) {
                        let code = res.code;
                        let name = res.name;
                        let gender = res.gender;
                        let loyaltyDate = res.loyaltyDate;
                        let level = res.level;
                        let loyaltyPoints = res.loyaltyPoints;
                        let dob = res.dob;
                        let addressColumn = res.address || '';
                        let contact = res.contact;
                        let email = res.email;
                        let recentPurchaseDate = res.recentPurchaseDate;

                        let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + loyaltyDate + "</td><td>" + level + "</td><td>" + loyaltyPoints + "</td><td>" + dob + "</td><td>" + addressColumn + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + recentPurchaseDate + "</td></tr>";
                        $("#customerTable").append(row);
                        blindClickEventsC();
                    } else {
                        // No data found
                        console.log("No data found");
                        // Handle this case if required
                    }
                },
                error: function (error) {
                    loadAllCustomer();
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
    $('#customer_name,#customer_gender,#customer_jdlc,#level,#total_point,#customer_dob,#c_address_01,#c_address_02,#c_address_03,#c_address_04,#c_address_05,#c_contact_num,#customer_email').val("");

}

$("#btnClearCustomer").click(function () {
    clearDetails();
});
