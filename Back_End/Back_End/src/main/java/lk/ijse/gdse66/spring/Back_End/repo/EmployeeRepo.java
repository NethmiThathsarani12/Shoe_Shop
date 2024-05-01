package lk.ijse.gdse66.spring.Back_End.repo;


import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee,String> {

//    Employee findFirstByOrderByEmployeeIdDesc();

    @Query(value = "SELECT code FROM employee ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(code) FROM employee", nativeQuery = true)
    int getSumEmployee();


}
