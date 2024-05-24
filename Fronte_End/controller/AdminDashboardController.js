const adminBaseUrl = "http://localhost:8080/Back_End/";


    performAuthenticatedRequest();
    setTotalProfit();

    function performAuthenticatedRequest() {
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: adminBaseUrl + "orders/TodayOrders",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function(resp) {
                console.log("Response received:", resp); // Log the response for debugging
                if (resp.state === "OK") { // Check for 'state' instead of 'status'
                    let num = resp.data.length; // Assuming 'data' is an array of today's orders
                    $("#todaySales").text(num);
                } else {
                    console.error("Unexpected response format:", resp);
                }
            },
            error: function(ob, statusText, error) {
                console.error("Error fetching today's sales:", statusText, error);
            }
        });


    }
function setTotalProfit() {
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: adminBaseUrl + "item/totalProfit",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function(resp) {
            console.log("Response received:", resp); // Log the response for debugging
            if (resp.status === "200") { // Check for 'status' of '200' as expected
                let totalProfit = resp.data; // Total profit value
                $("#totalProfit").text(totalProfit); // Update the element with id="totalProfit" to display the total profit
            } else {
                console.error("Unexpected response format:", resp);
            }
        },
        error: function(ob, statusText, error) {
            console.error("Error fetching total profit:", statusText, error);
        }
    });
}


$("#totalCustomer").val("00");
performAuthenticatedRequest();
const accessToken = localStorage.getItem('accessToken');
$.ajax({
    url: adminBaseUrl + "customer/customerCount",
    method: "GET",
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    contentType: "application/json",
    dataType: "json",
    success: function (resp) {
        let num = resp.count;
        $("#totalCustomer").text(num);

    },
    error: function (ob, statusText, error) {

    }
});