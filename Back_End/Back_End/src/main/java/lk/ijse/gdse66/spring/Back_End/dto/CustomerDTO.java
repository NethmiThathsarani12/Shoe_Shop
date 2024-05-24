package lk.ijse.gdse66.spring.Back_End.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {

    private String code;
    @NotBlank(message = "Customer name can not be null")
    @Pattern(regexp = "^[A-z ]{3,20}$",message = "Name not valid")
    private String name;
    private Gender gender;
    private Date loyaltyDate;
    private Level level;
    private Integer loyaltyPoints;
    private Date dob;
    private Address address;
    @NotBlank(message = "Customer contact can not be null")
    private String contact;
    private String email;
    private String recentPurchaseDate;

}
