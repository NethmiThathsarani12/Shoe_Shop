package lk.ijse.gdse66.spring.Back_End.controller;


import lk.ijse.gdse66.spring.Back_End.dto.ItemDTO;
import lk.ijse.gdse66.spring.Back_End.service.ItemService;
import lk.ijse.gdse66.spring.Back_End.utill.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllItem(){
        return new ResponseUtil("200", "Successfully Loaded. :", itemService.loadAllItem());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveItem(@ModelAttribute ItemDTO itemDTO){
        System.out.println(itemDTO.toString());
        itemService.saveItem(itemDTO);
        return new ResponseUtil("200", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateItem(@ModelAttribute ItemDTO itemDTO){
        itemService.updateItem(itemDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ itemDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteItem(@RequestParam String code){
        itemService.deleteItem(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

//    @ResponseStatus(HttpStatus.CREATED)
//    @GetMapping(path = "/searchEmployee")
//    public ItemDTO searchItemId(String code){
//        return itemService.searchItemId(code);
//    }



}
