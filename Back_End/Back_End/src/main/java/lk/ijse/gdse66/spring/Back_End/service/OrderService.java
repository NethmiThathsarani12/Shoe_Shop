package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SalesDTO;
import lk.ijse.gdse66.spring.Back_End.entity.SaleDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface OrderService {
    void placeOrder(@RequestBody SalesDTO dto);

    ArrayList<SalesDTO> LoadOrders();

    ArrayList<SaleDetailsDTO> LoadOrderDetails();

    @ResponseBody
    CustomDTO OrderIdGenerate();

    @ResponseBody
    CustomDTO getSumOrders();

    SaleDetails getOrderById(String id);
}