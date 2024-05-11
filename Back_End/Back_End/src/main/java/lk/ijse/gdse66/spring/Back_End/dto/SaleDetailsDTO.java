package lk.ijse.gdse66.spring.Back_End.dto;

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
    private String code;
    private int qty;
    private double unitPrice;

}
