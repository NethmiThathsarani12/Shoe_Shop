let orderBaseUrl = "http://localhost:8080/Back_End/";

$(document).ready(function (){
    generateOrderID();
});



$("#btnPurchase").attr('disabled', true);
/*$("#btnAddToCart").attr('disabled', true);*/

function generateOrderID() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: orderBaseUrl+"orders/OrderIdGenerate",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" + id);

            if (id === null) {
                $("#oid").val("O00-001");
            } else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#oid").val("O00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#oid").val("O00-0" + tempId);
                } else {
                    $("#oid").val("O00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {
            console.log(ob);
            console.log(statusText);
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Request failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

$("#Customer_Id").empty();
$.ajax({
    url: orderBaseUrl+ "customer",
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

$("#Customer_Id").keypress(function (e) {
    if (e.which == 13) { // Enter key pressed
        var search = $("#Customer_Id").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: orderBaseUrl + "customer/searchCus?code="+ search,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#cusName").val(res.name);
                $("#point").val(res.loyaltyPoints);
                // $("#qtyOnHand").val(res.qty);
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                console.log(message);
            }
        });
    }
});

//
// $("#Customer_Id").click(function () {
//     // performAuthenticatedRequest();
//     // const accessToken = localStorage.getItem('accessToken');
//     var search = $("#Customer_Id").val();
//     $.ajax({
//         url:orderBaseUrl+ "customer/searchCus?code="+ search,
//         method: "GET",
//         // headers: {
//         //     'Authorization': 'Bearer ' + accessToken
//         // },
//         contentType: "application/json",
//         dataType: "json",
//         success: function (res) {
//             console.log(res);
//             $("#cusName").val(res.name);
//             $("#point").val(res.loyaltyPoints);
//         },
//         error: function (error) {
//             let message = JSON.parse(error.responseText).message;
//             console.log(message);
//         }
//     })
// });
//
// $("#Item_Code").empty();
// $.ajax({
//     url: orderBaseUrl+ "item",
//     method: "GET",
//     dataType: "json",
//     success: function (res) {
//         console.log(res);
//
//         for (let i of res.data) {
//             let id = i.code;
//
//             $("#Item_Code").append(`<option>${id}</option>`);
//         }
//         console.log(res.message);
//     },
//     error: function (error) {
//         let message = JSON.parse(error.responseText).message;
//         console.log(message);
//     }
//
// });
//
// $("#Item_Code").click(function () {
//     var search = $("#Item_Code").val();
//     $.ajax({
//         url:orderBaseUrl+ "item/searchItemId?code="+ search,
//         method: "GET",
//         contentType: "application/json",
//         dataType: "json",
//         success: function (res) {
//             console.log(res);
//             $("#itemName").val(res.name);
//             $("#itemPrice").val(res.salePrice);
//             $("#qtyOnHand").val(res.qty);
//         },
//         error: function (error) {
//             let message = JSON.parse(error.responseText).message;
//             console.log(message);
//         }
//     })
// });


$("#Item_Code").empty();
/*performAuthenticatedRequest();
const accessToken = localStorage.getItem('accessToken');*/
$.ajax({
    url: orderBaseUrl + "item",
    method: "GET",
   /* headers: {
        'Authorization': 'Bearer ' + accessToken
    },*/
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

// Add event listener for keypress on the dropdown
$("#Item_Code").keypress(function (e) {
    if (e.which == 13) { // Enter key pressed
        var search = $("#Item_Code").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: orderBaseUrl + "item/searchItemId?code=" + search,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
        });
    }
});



function updateDateTime() {
    let currentDateTime = new Date();

    let year = currentDateTime.getFullYear();
    let month = currentDateTime.getMonth() + 1;
    let day = currentDateTime.getDate();

    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    let formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    $('#oDate').val(`${formattedDate} ${formattedTime}`);

}

updateDateTime();

setInterval(updateDateTime,1000);

let itemCode;
let itemName;
let itemPrice;
let itemQty;
let itemOrderQty;
let total = 0;
let discount = 0;
let subTotal = 0;
let tableRow = [];

$("#btnAddToCart").on("click", function () {
    let duplicate = false;
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#Item_Code option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;
        }
    }
    if (duplicate !== true) {
        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#itemPrice").val());
        $('#Item_Code,#itemName,#itemPrice,#qtyOnHand,#buyQty').val("");
        $("#btnAddToCart").attr('disabled', false);
    } else if (duplicate === true) {
        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());
        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());
    }
    $("#tblAddToCart>tr").click('click', function () {
        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let unitPrice = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();
        let total = $(this).children(":eq(4)").text();
        $("#Item_Code").val(itemCode);
        $("#itemName").val(itemName);
        $("#itemPrice").val(unitPrice);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);
    });
});

function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());
    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;
    $("#qtyOnHand").val(avaQty);
}

function manageTotal(preTotal, nowTotal) {
    total -= preTotal;
    total += nowTotal;
    $("#txtTotal").val(total);
}
$("#tblAddToCart").empty();

function loadCartTableDetail() {
    itemCode = $("#Item_Code").val();
    itemName = $("#itemName").val();
    itemPrice = $("#itemPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();
    let total = itemPrice * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;
    $("#tblAddToCart").append(row);
}

$(document).on("change keyup blur", "#txtDiscount", function () {
    discount = $("#txtDiscount").val();
    discount = (total / 100) * discount;
    subTotal = total - discount;

    $("#txtSubTotal").val(subTotal);
});

$(document).on("change keyup blur", "#txtCash", function () {
    let cash = $("#txtCash").val();
    let balance = cash - subTotal;
    $("#txtBalance").val(balance);
    if (balance < 0) {
        $("#lblCheckSubtotal").parent().children('strong').text(balance + " : plz enter valid Balance");
        $("#btnPurchase").attr('disabled', false);
    } else {
        $("#lblCheckSubtotal").parent().children('strong').text("");
        $("#btnPurchase").attr('disabled', false);
    }
});

$("#btnPurchase").click(function (){
  purchase();
});


$("#btnPurchaseC").click(function () {
    purchase();
});

function purchase(){
    var SaleDetails = [];
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        var detailOb = {
            oid: $("#oid").val(),
            itemCode: $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText,
            qty: $("#tblAddToCart tr").children(':nth-child(4)')[i].innerText,
            unitPrice: $("#tblAddToCart tr").children(':nth-child(5)')[i].innerText,
            // return_qty: $("#tblAddToCart tr").children(':nth-child(6)')[i].innerText


        }
        SaleDetails.push(detailOb);
    }
    var saleId = $("#oid").val();

    if (!saleId) {
        alert("Order ID must not be null");
        return;
    }

    var customerCode = $("#Customer_Id").val();
    var customerName = $("#cusName").val();

    if (!customerCode || !customerName) {
        alert("Customer information must not be null");
        return;
    }
    var date = $("#oDate").val();
    var payment = $("#Payment").val();
    var total = $("#txtTotal").val();
    var totalPoints = $("#point").val();
    var cashierName = $("#cashierName").val();


    var orderOb = {
        oid: saleId,
        purchaseDate: date,
        total: total,
        totalPoints: totalPoints,
        paymentMethod:payment,
        cashier: cashierName,
        customer: {
            code: customerCode,
            name: customerName
        },
        saleDetails: SaleDetails
    };



    /* console.log(orderOb)
     console.log(SaleDetails)*/
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:orderBaseUrl+ "orders",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(orderOb),
        success: function (res) {
            saveUpdateAlert("Sale", res.message);
            generateOrderID();

        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Sale", message);
        }
    });

    /*   clearDetails();*/
    $("#tblAddToCart").empty();
    $("#btnPurchase").attr('disabled', false);
    $("#btnAddToCart").attr('disabled', false);
    total = 0;
}

//
// const regExCusID = /^(C00-)[0-9]{3,4}$/;
// const regExItemID = /^[A-z0-9/ ]{3,20}$/;
// const regExBuyQty = /^[0-9]{0,}[.]?[0-9]{1,2}$/;
// const regExCashierName = /^[A-z ]{3,20}$/;
//
// let orderValidations = [];
// orderValidations.push({
//     reg: regExCusID, field: $('#Customer_Id'), error: 'Customer ID Pattern is Wrong : C00-001'
// });
//
// orderValidations.push({
//     reg: regExItemID, field: $('#Item_Code'), error: 'Item ID Pattern is Wrong : enter correct item id'
// });
//
// orderValidations.push({
//     reg: regExBuyQty, field: $('#buyQty'), error: 'Buy QTY is Wrong : enter correct some qty'
// });
//
// orderValidations.push({
//     reg: regExCashierName, field: $('#cashierName'), error: 'Cashier name is wrong : enter correct cashier name'
// });