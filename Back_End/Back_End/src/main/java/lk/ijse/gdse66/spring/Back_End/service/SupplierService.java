package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SupplierService {

    void saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String id);
    Supplier searchSupId(String id);
    ArrayList<SupplierDTO> loadAllSupplier();

    @ResponseBody
    CustomDTO supplierIdGenerate();
    @ResponseBody
    SupplierDTO getSumSupplier();
}
