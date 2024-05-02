package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.sql.Date;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Customer {

    @Id
    private String code;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String contact;
    @Temporal(TemporalType.DATE)
    private Date dob;
    private String addressLine1;
    private String addressLine2;
    @Temporal(TemporalType.DATE)
    private Date loyaltyDate;
    @Enumerated(EnumType.STRING)
    private Level loyaltyLevel;
    private Integer loyaltyPoints;
    @Temporal(TemporalType.DATE)
    private Timestamp recentPurchaseDate;
}
