package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Item {
    @Id
    private String code;
}
