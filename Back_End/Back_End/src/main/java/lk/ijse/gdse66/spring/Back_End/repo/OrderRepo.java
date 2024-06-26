package lk.ijse.gdse66.spring.Back_End.repo;

import lk.ijse.gdse66.spring.Back_End.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Sales,String> {

    @Query(value = "SELECT oid FROM sales ORDER BY oid DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT * FROM sales WHERE DATE(purchase_date) = CURDATE()", nativeQuery = true)
    List<Sales> findTodayOrders();

    @Query(value ="SELECT COUNT(s) FROM Sales s")
    Integer totalSalesCount();

    Sales findByOid(String id);

//    @Query("SELECT SUM(s.total) FROM Sales s")
//    Double getTotalProfit();


}
