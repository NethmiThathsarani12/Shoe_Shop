package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.CustomerDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Customer;
import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface CustomerService {

    void saveCustomer(CustomerDTO dto);
    void updateCustomer(CustomerDTO dto);
    void deleteCustomer(String id);
//    CustomerDTO searchCusId(String id);
CustomerDTO searchCusId(String code, String name);
    ArrayList<CustomerDTO> loadAllCustomer();

    @ResponseBody
    CustomDTO customerIdGenerate();
    @ResponseBody
    CustomDTO getSumCustomer();

    CustomerDTO searchCustId(String id);

    Integer getTotalCustomerCount();
}
