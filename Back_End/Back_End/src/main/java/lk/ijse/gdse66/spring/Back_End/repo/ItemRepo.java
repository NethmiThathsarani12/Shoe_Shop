package lk.ijse.gdse66.spring.Back_End.repo;

import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import lk.ijse.gdse66.spring.Back_End.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepo extends JpaRepository<Item,String> {

    @Query(value = "SELECT COUNT(code) FROM item", nativeQuery = true)
    int getSumItem();

    @Query(value = "SELECT * FROM item e WHERE e.code = :code OR e.name = :name", nativeQuery = true)
    Item findItemByCodeOrName(@Param("code") String code, @Param("name") String name);

    @Query("SELECT SUM(i.expectedProfit) FROM Item i")
    Double getTotalProfit();
}
