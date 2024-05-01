package lk.ijse.gdse66.spring.Back_End.utill;

import java.util.Base64;
import java.util.UUID;

public class UtilMatter {

    public static String generateId(){
        return UUID.randomUUID().toString();
    }

    public static String convertBase64(String data){
        return Base64.getEncoder().encodeToString(data.getBytes());
    }

}
