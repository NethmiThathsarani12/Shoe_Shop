package lk.ijse.gdse66.spring.Back_End.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminPanelDTO {
    private String id;
    private Double totalSales;
    private Double totalProfit;
    private String mostSaleItem;
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;
}
