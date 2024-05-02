package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.CustomerDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Customer;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface CustomerService {

    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(CustomerDTO dto);
    Customer searchCus(String id);
    ArrayList<CustomerDTO> loadAllCustomer();

    @ResponseBody
    CustomDTO customerIdGenerate();

    @ResponseBody
    CustomDTO getSumCustomer();
}
