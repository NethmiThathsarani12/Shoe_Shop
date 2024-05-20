package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    UserDTO searchUser(String id);
}
