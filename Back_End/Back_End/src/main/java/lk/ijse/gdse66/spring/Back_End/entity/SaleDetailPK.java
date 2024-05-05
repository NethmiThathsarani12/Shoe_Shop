package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetailPK implements Serializable {
    private String oId;
    private String code;
}
