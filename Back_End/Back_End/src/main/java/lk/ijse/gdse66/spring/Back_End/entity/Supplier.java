package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lk.ijse.gdse66.spring.Back_End.embeded.Address;
import lk.ijse.gdse66.spring.Back_End.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {

    @Id
    private String code;
    private String name;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Embedded
    private Address address;
    private String contact1;
    private String contact2;
    private String email;


    @OneToMany(cascade = CascadeType.ALL)
    private List<Item> items;

}
