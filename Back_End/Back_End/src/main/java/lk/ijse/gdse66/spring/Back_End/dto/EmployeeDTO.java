package lk.ijse.gdse66.spring.Back_End.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Designation;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {

    private String code;
    @NotBlank(message = "Employee name is not blank")
    @Pattern(regexp = "^[A-z ]{3,20}$",message = "Invalid name format")
    private String name;
    private String  pic;
    private Gender gender;

    @NotBlank(message = "status can not be blank")
    private String status;

    @NotBlank(message = "designation can not be null")
    private Designation designation;
    private Role role;
    private Date birth;

    @NotBlank(message = "Join date can not be null")
    private Date joinDate ;
    private String branch;
    private Address address;

    @NotBlank(message = "contact can not be null")
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

    private UserDTO user;
}
