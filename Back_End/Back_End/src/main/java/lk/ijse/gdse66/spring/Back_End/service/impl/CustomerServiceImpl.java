package lk.ijse.gdse66.spring.Back_End.service.impl;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.CustomerDTO;
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
            throw new RuntimeException("Customer Already Exist. Please enter another id.");
        }

        repo.save(mapper.map(dto,Customer.class));


    }

    @Override
    public void updateCustomer(CustomerDTO dto) {

    }

    @Override
    public void deleteCustomer(CustomerDTO dto) {

    }

    @Override
    public Customer searchCus(String id) {
        return null;
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
        return null;
    }
}
