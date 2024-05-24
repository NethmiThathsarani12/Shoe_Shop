package lk.ijse.gdse66.spring.Back_End.dto;

import jakarta.validation.constraints.NotBlank;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SupplierDTO {

    private String code;
    @NotBlank(message = "supplier name can not be null")
    private String name;
    private Category category;
    private Address address;
    @NotBlank(message = "supplier contact can not be null")
    private String contact1;
    private String contact2;
    private String email;
}
