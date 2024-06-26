package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.enums.ShoeType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item {
    @Id
    private String code;
    private String name;
    private Integer qty;
    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture;
    @Enumerated(EnumType.STRING)
    private ShoeType shoeType;
    private Integer size;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "supplier_id", referencedColumnName = "code", nullable = false)
    private Supplier supplier;
    private String supName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "items")
    private List<SaleDetails> saleDetails = new ArrayList<>();


}
