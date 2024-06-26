const adminBaseUrl = "http://localhost:8080/Back_End/";

setAdminPanel();

// function performAuthenticatedRequest() {
//     // Placeholder for authentication logic
// }

function getAdminPanel() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "api/v1/panel/getAll",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function getOrderCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "orders/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function getCustomerCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "customer/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}


function getEmployeeCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "employee/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function getItemCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "item/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function searchItem(code) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: adminBaseUrl + "item/searchItemId?code=" + code,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function setAdminPanel() {
    getAdminPanel().then(function (value) {
        if (Object.keys(value).length !== 0) {
            searchItem(value.mostSaleItem).then(function (itm) {
                if (Object.keys(itm).length !== 0) {
                    $("#panelImg").attr('src', value.itemPicture);
                    $("#dashItemCode").text(value.mostSaleItem);
                    $("#dashItemDesc").text(itm.name);
                    $("#dashItemSale").text("$" + itm.salePrice);
                    $("#dashItemQTY").text(value.mostSaleItemQuantity);

                    $("#totalSales").text("$" + value.totalSales);
                    $("#totalProfit").text("$" + value.totalProfit);

                    getOrderCount().then(function (count) {
                        $("#totalSales").text(count);
                    });
                }
            });
        } else {
            $("#panelImg").attr('src', "../assets/img/yello-shoe-removebg-preview-png;base64"+value.pic);
            $("#dashItemCode").text("");
            $("#dashItemDesc").text("");
            $("#dashItemSale").text("");
            $("#dashItemQTY").text("");

            $("#totalSales").text("$0.00");
            $("#totalProfit").text("$0.00");
            $("#totalSales").text(0);
        }
    });

    getCustomerCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalCustomers").text(count);
        } else {
            $("#totalCustomers").text("0");
        }
    });

    getItemCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalItems").text(count);
        } else {
            $("#totalItems").text("0");
        }
    });

    getOrderCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalSales").text(count);
        } else {
            $("#totalSales").text("0");
        }
    });

    getEmployeeCount().then(function (count) {
        if (count !== 0 || count !== null) {
            $("#totalEmployee").text(count);
        } else {
            $("#totalEmployee").text("0");
        }
    });
}
