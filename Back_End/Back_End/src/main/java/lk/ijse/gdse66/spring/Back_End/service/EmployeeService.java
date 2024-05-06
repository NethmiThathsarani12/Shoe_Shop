package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(String id);
    EmployeeDTO searchEmpId(String id);
    ArrayList<EmployeeDTO> loadAllEmployee();

    @ResponseBody
    CustomDTO employeeIdGenerate();
    @ResponseBody
    CustomDTO getSumEmployee();


}
