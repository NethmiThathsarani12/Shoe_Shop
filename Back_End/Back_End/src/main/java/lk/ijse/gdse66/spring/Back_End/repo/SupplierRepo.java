package lk.ijse.gdse66.spring.Back_End.repo;

import lk.ijse.gdse66.spring.Back_End.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepo extends JpaRepository<Supplier,String> {

    @Query(value = "SELECT code FROM supplier ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(code) FROM supplier", nativeQuery = true)
    int getSumSupplier();
}
