package lk.ijse.gdse66.spring.Back_End.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "Item name can not be null")
    private String name;

    @NotBlank(message = "Item qty can not be blank")
    private Integer qty;
    private String itemPicture;
    private ShoeType shoeType;

    @NotBlank(message = "item size can not be null")
    private Integer size;
    private Supplier supplier;
    private String supName;
    @NotBlank(message = "item price can not be null")
    private Double salePrice;
    @NotBlank(message = "item price can not be null")
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}
