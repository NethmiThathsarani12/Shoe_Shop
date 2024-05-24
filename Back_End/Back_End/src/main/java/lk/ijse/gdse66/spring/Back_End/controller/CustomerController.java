package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.CustomerDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.service.CustomerService;
import lk.ijse.gdse66.spring.Back_End.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
        public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto, Address address){
//            System.out.println(dto.toString());
            dto.setAddress(address);
            service.saveCustomer(dto);
            return new ResponseUtil("200", "Successfully Registered.!", null);
        }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllCustomer());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/CustomerIdGenerate")
    public @ResponseBody
    CustomDTO customerIdGenerate() {
        return service.customerIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateCustomer(@ModelAttribute CustomerDTO customerDTO, Address address){
        customerDTO.setAddress(address);
        service.updateCustomer(customerDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ customerDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteCustomer(@RequestParam String code){
        service.deleteCustomer(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

//    @ResponseStatus(HttpStatus.CREATED)
//    @GetMapping(path = "/searchCustomer")
//    public CustomerDTO searchCustomerId(@RequestParam("code") String code) {
//        return service.searchCusId(code);
//    }

    @GetMapping(path = "/searchCustomer")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO searchCusId(@RequestParam String code, @RequestParam String name){
        return service.searchCusId(code, name); // Adjusted method call
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCus")
    public CustomerDTO searchCustId(String code){
        return service.searchCustId(code);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/customerCount")
    public @ResponseBody CustomDTO getSumCustomer() {
        return service.getSumCustomer();
    }

}

