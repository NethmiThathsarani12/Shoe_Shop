package lk.ijse.gdse66.spring.Back_End.dto;

import lk.ijse.gdse66.spring.Back_End.entity.Customer;
import lk.ijse.gdse66.spring.Back_End.enums.Payment;

import java.util.ArrayList;
import java.util.List;

public class SalesDTO {

    private String oId;
    private String purchaseDate;
    private Double total;
    private Payment paymentMethod;
    private Integer totalPoints;
    private String cashier;
    private String customerName;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}
