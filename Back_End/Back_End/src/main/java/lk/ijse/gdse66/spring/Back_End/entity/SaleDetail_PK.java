package lk.ijse.gdse66.spring.Back_End.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
public class SaleDetail_PK implements Serializable {
    private String oid;
    private String itemCode;

    public String getOid() {
        return oid;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
}