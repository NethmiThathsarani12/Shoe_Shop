package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class AdminPanel {
   @Id
    private String id;
    private Double totalSales;
    private Double totalProfit;
    private String mostSaleItem;
    @Column(columnDefinition = "LONGTEXT")
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;
}
