package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;



    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/OrderIdGenerate")
    public @ResponseBody
    CustomDTO OrderIdGenerate() {
        return service.OrderIdGenerate();
    }
}
