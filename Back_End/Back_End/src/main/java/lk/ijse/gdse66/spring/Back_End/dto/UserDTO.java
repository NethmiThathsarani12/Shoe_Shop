package lk.ijse.gdse66.spring.Back_End.dto;

import lk.ijse.gdse66.spring.Back_End.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String email;
    private Role role;
    private String password;
}
