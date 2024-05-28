package lk.ijse.gdse66.spring.Back_End.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false, updatable = false)
    private Sales sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code",referencedColumnName = "code")
    private Item items;

    private Double itmTotal;

    private String status;

    private int return_qty;

 public int getReturn_qty() {
  return return_qty;
 }

 public void setReturn_qty(int return_qty) {
  this.return_qty = return_qty;
 }

 public String getStatus() {
  return status;
 }

 public void setStatus(String status) {
  this.status = status;
 }

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

 public Double getItmTotal() {
  return itmTotal;
 }

 public void setItmTotal(Double itmTotal) {
  this.itmTotal = itmTotal;
 }
}
