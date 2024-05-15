let orderVBaseUrl = "http://localhost:8080/Back_End/";

loadAllSales();
loadAllOrderDetails();

function loadAllSales() {
    $("#tblOrder").empty();
    $.ajax({
        url: orderVBaseUrl+ "orders/LoadOrders",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let purchaseDate = i.purchaseDate;
                let total = i.total;
                let paymentMethod = i.paymentMethod;
                let totalPoints = i.totalPoints;
                let cashier = i.cashier;
                let cusName = i.cusName;

                let row = "<tr><td>" + oid + "</td><td>" + purchaseDate + "</td><td>" + total + "</td><td>" + paymentMethod + "</td><td>"+ totalPoints + "</td><td>" + cashier + "</td><td>" + cusName + "</td></tr>";
                $("#tblOrder").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

function loadAllOrderDetails() {
    $("#tblOrderDetails").empty();
    $.ajax({
        url: orderVBaseUrl+"orders/LoadOrderDetails",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let itemCode = i.itemCode;
                let qty = i.qty;
                let unitPrice = i.unitPrice;

                let row = "<tr><td>" + oid + "</td><td>" + itemCode + "</td><td>" + qty + "</td><td>" + unitPrice + "</td></tr>";
                $("#tblOrderDetails").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}