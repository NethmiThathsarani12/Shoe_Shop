package lk.ijse.gdse66.spring.Back_End.dto;

import lk.ijse.gdse66.spring.Back_End.entity.Sales;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SaleDetailsDTO {

    private String oId;
    private String itemCode;
    private int qty;
    private double unitPrice;
    private String status;
    private int return_qty;

//   private SalesDTO sale;
//   private ItemDTO items;

}
