package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Designation;
import lk.ijse.gdse66.spring.Back_End.enums.Gender;
import lk.ijse.gdse66.spring.Back_End.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employee {

    @Id
    private String code;
    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String pic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String status;
    @Enumerated(EnumType.STRING)
    private Designation designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Temporal(TemporalType.DATE)
    private Date birth;
    @Temporal(TemporalType.DATE)
    private Date joinDate ;
    private String branch;
    @Embedded
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

}
