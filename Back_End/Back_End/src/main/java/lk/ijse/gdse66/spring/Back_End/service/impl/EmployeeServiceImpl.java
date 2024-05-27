package lk.ijse.gdse66.spring.Back_End.service.impl;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.repo.EmployeeRepo;
import lk.ijse.gdse66.spring.Back_End.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveEmployee(EmployeeDTO dto) {
        if (repo.existsById(dto.getCode())) {
            throw new RuntimeException("Employee Already Exists. Please enter another id.");
        }

        // Map the EmployeeDTO to Employee entity
        Employee employee = mapper.map(dto, Employee.class);

        // Set the address for the employee
        employee.setAddress(dto.getAddress());

        // Save the employee to the repository
        repo.save(employee);
    }


    @Override
    public void updateEmployee(EmployeeDTO dto) {

        if (!repo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! employeeId : "+ dto.getCode());
        }
        repo.save(mapper.map(dto, Employee.class));

    }

    @Override
    public void deleteEmployee(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(id);
    }


//    @Override
//    public EmployeeDTO searchEmpId(String id) {
//
//        if (!repo.existsById(id)){
//            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
//        }
//        return mapper.map(repo.findById(id).get(),EmployeeDTO.class);
//    }

    @Override
    public EmployeeDTO searchEmpId(String code, String name) {
        Employee employee = repo.findEmployeeByCodeOrName(code, name);
        if (employee == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(employee, EmployeeDTO.class);
    }

    @Override
    public ArrayList<EmployeeDTO> loadAllEmployee() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Employee>>() {
        }.getType());
    }

    @Override
    public CustomDTO employeeIdGenerate() {
        return new CustomDTO(repo.getLastIndex());

    }

    @Override
    public CustomDTO getSumEmployee() {
        return new CustomDTO(repo.getSumEmployee());
    }

    @Override
    public Integer getTotalEmployeeCount() {
        return repo.totalEmployeeCount();
    }
}
