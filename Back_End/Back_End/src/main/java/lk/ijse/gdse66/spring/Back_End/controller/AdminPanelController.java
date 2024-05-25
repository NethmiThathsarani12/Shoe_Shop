package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.AdminPanelDTO;
import lk.ijse.gdse66.spring.Back_End.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/panel")
@CrossOrigin
public class AdminPanelController {

    @Autowired
    OrderService saleService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public AdminPanelDTO getAdminPanel(){
        return saleService.getAdminPanelDetails();
    }
}
