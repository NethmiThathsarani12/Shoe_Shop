package lk.ijse.gdse66.spring.Back_End.service.impl;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SalesDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Sales;
import lk.ijse.gdse66.spring.Back_End.repo.CustomerRepo;
import lk.ijse.gdse66.spring.Back_End.repo.ItemRepo;
import lk.ijse.gdse66.spring.Back_End.repo.OrderDetailsRepo;
import lk.ijse.gdse66.spring.Back_End.repo.OrderRepo;
import lk.ijse.gdse66.spring.Back_End.service.OrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo repo;

    @Autowired
    private OrderDetailsRepo orRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
 private ModelMapper mapper;

    @Override
    public void placeOrder(SalesDTO dto) {
        Sales sales = mapper.map(dto,Sales.class);
        if (repo.existsById(sales.getOId())){
            throw new RuntimeException("Sales" + sales.getOId()+"Already added.!");
        }
        repo.save(sales);
    }

    @Override
    public ArrayList<SalesDTO> LoadOrders() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SalesDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(orRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public CustomDTO getSumOrders() {
        return null;
    }
}
