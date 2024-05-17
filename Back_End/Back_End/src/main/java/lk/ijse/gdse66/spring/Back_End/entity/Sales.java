package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.enums.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Sales {
    @Id
    private String oid;
    private String purchaseDate;
    private Double total;
    @Enumerated(EnumType.STRING)
    private Payment paymentMethod;
    private Integer totalPoints;
    private String cashier;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "customer_name",referencedColumnName = "code", nullable = false)
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "sale")
    private List<SaleDetails> saleDetails = new ArrayList<>();

    public String getOid() {
        return oid;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public Double getTotal() {
        return total;
    }

    public Payment getPaymentMethod() {
        return paymentMethod;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public String getCashier() {
        return cashier;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<SaleDetails> getSaleDetails() {
        return saleDetails;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public void setPaymentMethod(Payment paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void setCashier(String cashier) {
        this.cashier = cashier;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setSaleDetails(List<SaleDetails> saleDetails) {
        this.saleDetails = saleDetails;
    }
}
