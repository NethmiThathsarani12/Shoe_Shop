package lk.ijse.gdse66.spring.Back_End.entity;


import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Customer {
    @Id
    private String code;
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Temporal(TemporalType.DATE)
    private Date loyaltyDate;
    @Enumerated(EnumType.STRING)
    private Level level;
    private Integer loyaltyPoints;
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Embedded
    private Address address;
    private String contact;
    private String email;
    private String recentPurchaseDate;

//    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "customer")
//    private List<Sales> sales = new ArrayList<>();

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public Gender getGender() {
        return gender;
    }

    public Date getLoyaltyDate() {
        return loyaltyDate;
    }

    public Level getLevel() {
        return level;
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public Date getDob() {
        return dob;
    }

    public Address getAddress() {
        return address;
    }

    public String getContact() {
        return contact;
    }

    public String getEmail() {
        return email;
    }

    public String getRecentPurchaseDate() {
        return recentPurchaseDate;
    }

//    public List<Sales> getSales() {
//        return sales;
//    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setLoyaltyDate(Date loyaltyDate) {
        this.loyaltyDate = loyaltyDate;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRecentPurchaseDate(String recentPurchaseDate) {
        this.recentPurchaseDate = recentPurchaseDate;
    }

//    public void setSales(List<Sales> sales) {
//        this.sales = sales;
//    }
}





