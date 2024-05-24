package lk.ijse.gdse66.spring.Back_End.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SaleDetailsDTO;
import lk.ijse.gdse66.spring.Back_End.dto.SalesDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Customer;
import lk.ijse.gdse66.spring.Back_End.entity.Item;
import lk.ijse.gdse66.spring.Back_End.entity.SaleDetails;
import lk.ijse.gdse66.spring.Back_End.entity.Sales;
import lk.ijse.gdse66.spring.Back_End.enums.Level;
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
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo repo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private OrderDetailsRepo saleDetailsRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void placeOrder(SalesDTO dto) {
        if (repo.existsById(dto.getOid())) {
            throw new RuntimeException("Order Id " + dto.getOid() + " already exists. Please enter another id!");
        }

        Sales sales = mapper.map(dto, Sales.class);
        Sales save = repo.save(sales);

        for (SaleDetailsDTO saleDetailsDTO : dto.getSaleDetails()) {
            if (saleDetailsDTO.getItemCode() == null) {
                throw new IllegalArgumentException("Code must not be null for sale details");
            }

            // Map DTO to entity
            SaleDetails saleDetails = new SaleDetails();
            saleDetails.setQty(saleDetailsDTO.getQty());
            saleDetails.setUnitPrice(saleDetailsDTO.getUnitPrice());
            saleDetails.setItemCode(saleDetailsDTO.getItemCode());
            saleDetails.setOid(saleDetailsDTO.getOId());

            // Save entity to database
            saleDetailsRepo.save(saleDetails);
        }

        // Update item quantities and customer loyalty points
        for (SaleDetails sd : save.getSaleDetails()) {
            Item item = itemRepo.findById(sd.getItemCode()).orElseThrow(() ->
                    new RuntimeException("Item not found with code: " + sd.getItemCode())
            );
            item.setQty(item.getQty() - sd.getQty());
            itemRepo.save(item);

            // Check if the unit price is greater than 800
            if (sd.getUnitPrice() > 800) {
                // Update customer loyalty points
                Customer customer = customerRepo.findById(dto.getCustomer().getCode()).orElseThrow(() ->
                        new RuntimeException("Customer not found with code: " + dto.getCustomer().getCode())
                );
                customer.setLoyaltyPoints(customer.getLoyaltyPoints() + 1);
                updateLoyaltyLevel(customer);
                customerRepo.save(customer);
            }
        }
    }


    private void updateLoyaltyLevel(Customer customer) {
        int totalPoints = customer.getLoyaltyPoints();
        if (totalPoints >= 200) {
            customer.setLevel(Level.GOLD);
        } else if (totalPoints >= 100) {
            customer.setLevel(Level.SILVER);
        } else if (totalPoints >= 50) {
            customer.setLevel(Level.BRONZE);
        } else {
            customer.setLevel(Level.NEW);
        }
    }



    @Override
    public ArrayList<SalesDTO> LoadOrders() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<SalesDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(saleDetailsRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
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

    @Override
    public SaleDetails getOrderById(String id) {
        // Check if the id is null or empty before invoking findById
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID must not be null or empty");
        }


        Optional<SaleDetails> optionalSaleDetails = saleDetailsRepo.findById(id);

        if (optionalSaleDetails.isPresent()) {
            return optionalSaleDetails.get();
        } else {
            throw new EntityNotFoundException("Order with id " + id + " not found");
        }
    }

    public List<SalesDTO> getTodayCount() {
        List<Sales> todayOrders = repo.findTodayOrders();
        return mapper.map(todayOrders, new TypeToken<List<SalesDTO>>() {}.getType());
    }

//    @Override
//    public Double getTotalProfit() {
//        return repo.getTotalProfit();
//    }
}
