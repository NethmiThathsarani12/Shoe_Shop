package lk.ijse.gdse66.spring.Back_End.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import lk.ijse.gdse66.spring.Back_End.enums.ShoeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItemDTO {

    private String code;
    private String name;
    private Integer qty;
    private String itemPicture;
    private ShoeType shoeType;
    private Integer size;
    private Supplier supplier;
    private String supName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}