package lk.ijse.gdse66.spring.Back_End.service.impl;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.CustomerDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Customer;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.repo.CustomerRepo;
import lk.ijse.gdse66.spring.Back_End.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (repo.existsById(dto.getCode())){
            throw new RuntimeException("Employee Already Exists. Please enter another id.");

        }

        Customer customer = mapper.map(dto,Customer.class);

        customer.setAddress(dto.getAddress());

        repo.save(customer);

    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (!repo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! customerId : "+ dto.getCode());
        }
        repo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(id);
    }

//    @Override
//    public CustomerDTO searchCusId(String id) {
//        if (!repo.existsById(id)) {
//            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
//        }
//        return mapper.map(repo.findById(id).get(), CustomerDTO.class);
//    }

    @Override
    public CustomerDTO searchCusId(String code, String name) {
        Customer customer = repo.findCustomerByCodeOrName(code, name);
        if (customer == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(customer, CustomerDTO.class);
    }

    @Override
    public ArrayList<CustomerDTO> loadAllCustomer() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Customer>>() {
        }.getType());
    }

    @Override
    public CustomDTO customerIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public CustomDTO getSumCustomer() {
        return new CustomDTO(repo.getSumCustomer());
    }

    @Override
    public CustomerDTO searchCustId(String code) {
        Optional<Customer> customer = repo.findById(code);
        if (customer == null) {
            throw new RuntimeException("supplier not found with code: " + code);
        }
        return mapper.map(customer, CustomerDTO.class);
    }

    @Override
    public Integer getTotalCustomerCount() {
        return repo.totalCustomerCount();
    }
}
