package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.dto.CustomDTO;
import lk.ijse.gdse66.spring.Back_End.dto.EmployeeDTO;
import lk.ijse.gdse66.spring.Back_End.dto.ItemDTO;
import lk.ijse.gdse66.spring.Back_End.entity.Employee;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface ItemService {

    void saveItem(ItemDTO dto);
    void updateItem(ItemDTO dto);
    void deleteItem(String id);
//    ItemDTO searchItemCode(String id);
  ItemDTO searchItemId(String code, String name);
    ArrayList<ItemDTO> loadAllItem();

    @ResponseBody
    CustomDTO getSumItem();

    ItemDTO searchItemId(String id);

    Double getTotalProfit();

    Integer getTotalItemCount();
}
