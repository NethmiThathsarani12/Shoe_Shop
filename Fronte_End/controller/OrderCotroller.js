let orderBaseUrl = "http://localhost:8080/Back_End/";

generateOrderID();

function generateOrderID() {
    $("#customer_code").val("SAI-001");
    $.ajax({
        url: orderBaseUrl + "orders/OrderIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#orderId").val("SAI-001" );
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#orderId").val("SAI-00" + tempId);
                } else if (tempId <= 99) {
                    $("#orderId").val("SAI-0" + tempId);
                } else {
                    $("#orderId").val("SAI-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

$("#Customer_Id").empty();
$.ajax({
    url:  orderBaseUrl + "customer",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#Customer_Id").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#Customer_Id").click(function () {
    var search = $("#Customer_Id").val();
    $.ajax({
        url: orderBaseUrl+"customer/searchCus?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#cusName").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});

$("#Item_Code").empty();
$.ajax({
    url: orderBaseUrl+ "item",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#Item_Code").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});

$("#Item_Code").click(function () {
    var search = $("#Item_Code").val();
    $.ajax({
        url: orderBaseUrl+ "item/searchItemId?code="+ search,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            $("#itemName").val(res.name);
            $("#itemPrice").val(res.salePrice);
            $("#qtyOnHand").val(res.qty);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    })
});

