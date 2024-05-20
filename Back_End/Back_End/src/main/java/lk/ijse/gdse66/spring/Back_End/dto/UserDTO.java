package lk.ijse.gdse66.spring.Back_End.dto;

import lk.ijse.gdse66.spring.Back_End.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String password;
    private Role role;
}
