package lk.ijse.gdse66.spring.Back_End.service.impl;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SupplierDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import lk.ijse.gdse66.spring.Back_End.repo.SupplierRepo;
import lk.ijse.gdse66.spring.Back_End.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveSupplier(SupplierDTO dto) {
        if (repo.existsById(dto.getCode())){
            throw new RuntimeException("Supplier Already Exists. Please enter another id.");
        }

        Supplier supplier=mapper.map(dto,Supplier.class);
        supplier.setAddress(dto.getAddress());
        repo.save(supplier);
    }

    @Override
    public void updateSupplier(SupplierDTO dto) {
        if (!repo.existsById(dto.getCode())){
            throw new RuntimeException("update failed! supplierId : "+dto.getCode());

        }

        repo.save(mapper.map(dto,Supplier.class));
    }

    @Override
    public void deleteSupplier(String id) {
        if (!repo.existsById(id)){
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
            repo.deleteById(id);
    }

    @Override
    public SupplierDTO searchSupId(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(repo.findById(id).get(), SupplierDTO.class);

    }

    @Override
    public ArrayList<SupplierDTO> loadAllSupplier() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Supplier>>() {
        }.getType());
    }

    @Override
    public CustomDTO supplierIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public SupplierDTO getSumSupplier() {
        return null;
    }
}
