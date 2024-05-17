package lk.ijse.gdse66.spring.Back_End.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(SaleDetail_PK.class)
public class SaleDetails {

   @Id
    private String oid;
    @Id
    private String itemCode;


    private int qty;
    private double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false, updatable = false)
    private Sales sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code",referencedColumnName = "code")
    private Item items;

 public String getOid() {
  return oid;
 }

 public String getItemCode() {
  return itemCode;
 }

 public int getQty() {
  return qty;
 }

 public double getUnitPrice() {
  return unitPrice;
 }

 public Sales getSale() {
  return sale;
 }

 public Item getItems() {
  return items;
 }

 public void setOid(String oid) {
  this.oid = oid;
 }

 public void setItemCode(String itemCode) {
  this.itemCode = itemCode;
 }

 public void setQty(int qty) {
  this.qty = qty;
 }

 public void setUnitPrice(double unitPrice) {
  this.unitPrice = unitPrice;
 }

 public void setSale(Sales sale) {
  this.sale = sale;
 }

 public void setItems(Item items) {
  this.items = items;
 }
}
