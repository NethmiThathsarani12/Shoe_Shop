package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SalesDTO;
import lk.ijse.gdse66.spring.Back_End.service.OrderService;
import lk.ijse.gdse66.spring.Back_End.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/OrderIdGenerate")
    public @ResponseBody CustomDTO OrderIdGenerate(){
        return service.OrderIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil placeOrder(@RequestBody SalesDTO dto) {
//        System.out.println(dto.toString());
        service.placeOrder(dto);
        return new ResponseUtil("Ok", "Successfully Purchased.!", null);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrders")
    public ResponseUtil LoadOrders() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.LoadOrders());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrderDetails")
    public ResponseUtil LoadOrderDetails() {
        return new ResponseUtil("OK", "Successfully Loaded. :", service.LoadOrderDetails());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/TodayOrders")
    public ResponseUtil getTodayOrders() {
        List<SalesDTO> todayOrders = service.getTodayCount();
        return new ResponseUtil("OK", "Today's orders loaded successfully.", todayOrders);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/total")
    public Integer getTotalSalecount() {
        return service.totalSalesCount();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{code}")
    public ResponseUtil orderCanBeReturned(@PathVariable("code") String code){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                service.canBeReturned(code));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{code}")
    public ResponseUtil returnFullOrder(@PathVariable("code")String code){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned", service.returnFullOrder(code));

    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/loadData")
    public ResponseUtil loadOrderReturn(){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                service.loadReturnOrders());
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/returnOneOrder")
    public ResponseUtil returnOneItemOrder(@RequestBody SaleDetailsDTO saleDetailsDTO){
        System.out.println(saleDetailsDTO);
        service.returnOneOrder(saleDetailsDTO);
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",null);

    }

//    @ResponseStatus(HttpStatus.OK)
//    @GetMapping("/totalProfit")
//    public ResponseUtil getTotalProfit() {
//        Double totalProfit = service.getTotalProfit();
//        return new ResponseUtil("OK", "Total profit retrieved successfully.", totalProfit);
//    }
}


