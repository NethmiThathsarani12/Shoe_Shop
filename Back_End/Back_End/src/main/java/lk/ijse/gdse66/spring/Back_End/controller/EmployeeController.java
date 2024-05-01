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
        employeeDTO.setAddress(address);
        String profile = UtilMatter.convertBase64(profilePic);
        employeeDTO.setPic(profile);
        service.saveEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateEmployee(@ModelAttribute EmployeeDTO employeeDTO,Address address){
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("OK", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestBody EmployeeDTO dto){
        service.deleteEmployee(dto);
        return new ResponseUtil("OK", "Successfully Deleted. :"+ dto.getCode(),null);
    }

//    @ResponseStatus(HttpStatus.CREATED)
//    @GetMapping(path = "/searchEmployee", params = {"employee_Id"})
//    public Employee searchEmpId(String employee_Id){
//        return service.searchEmpId(employee_Id);
//    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllEmployee(){
        return new ResponseUtil("OK", "Successfully Loaded. :", service.loadAllEmployee());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.employeeIdGenerate();
    }


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/employeeCount")
    public CustomDTO getSumEmployee(){
        return service.getSumEmployee();
    }

}