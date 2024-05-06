package lk.ijse.gdse66.spring.Back_End.controller;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import lk.ijse.gdse66.spring.Back_End.service.SupplierService;
import lk.ijse.gdse66.spring.Back_End.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/supplier")
public class SupplierController {

    @Autowired
    private SupplierService service;

    @GetMapping
    public ResponseUtil getAllSupplier(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllSupplier());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveSupplier(@ModelAttribute SupplierDTO supplierDTO, Address address){
        System.out.println(supplierDTO.toString());
        supplierDTO.setAddress(address);
        service.saveSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Registered.!", null);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateSupplier(@ModelAttribute SupplierDTO supplierDTO,Address address){
        supplierDTO.setAddress(address);
        service.updateSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ supplierDTO.getCode(),null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteSupplier(@RequestParam String code){
        service.deleteSupplier(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchSupplier")
    public SupplierDTO searchSupId(@RequestParam("code")String code){
        return service.searchSupId(code);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/SupplierIdGenerate")
    public @ResponseBody CustomDTO supplierIdGenerate() {
        return service.supplierIdGenerate();
    }
}
