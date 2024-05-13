package lk.ijse.gdse66.spring.Back_End.repo;

import lk.ijse.gdse66.spring.Back_End.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepo extends JpaRepository<SaleDetails,String> {
}
