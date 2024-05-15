package lk.ijse.gdse66.spring.Back_End.repo;

import lk.ijse.gdse66.spring.Back_End.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepo extends JpaRepository<Sales,String> {

    @Query(value = "SELECT oid FROM sales ORDER BY oid DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();



}
