package lk.ijse.gdse66.spring.Back_End.utill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseUtil {

    private String state;
    private String message;
    private Object data;
}
