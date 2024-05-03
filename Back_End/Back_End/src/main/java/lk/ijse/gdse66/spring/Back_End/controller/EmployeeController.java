package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.service.EmployeeService;
import lk.ijse.gdse66.spring.Back_End.utill.ResponseUtil;
import lk.ijse.gdse66.spring.Back_End.utill.UtilMatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveEmployee(@ModelAttribute EmployeeDTO employeeDTO, Address address,String profilePic){
        System.out.println(employeeDTO.toString());
        System.out.println(employeeDTO.getAddress());
        employeeDTO.setAddress(address);
        service.saveEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateEmployee(@ModelAttribute EmployeeDTO employeeDTO,Address address){
        System.out.println(employeeDTO.toString());
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestParam String code){
        service.deleteEmployee(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee")
    public Employee searchEmpId(@RequestParam("employee_Id") String employee_Id){
        return service.searchEmpId(employee_Id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllEmployee(){
        return new ResponseUtil("OK", "Successfully Loaded. :", service.loadAllEmployee());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody CustomDTO employeeIdGenerate() {
        return service.employeeIdGenerate();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/employeeCount")
    public CustomDTO getSumEmployee(){
        return service.getSumEmployee();
    }

}
