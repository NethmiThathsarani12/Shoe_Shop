package lk.ijse.gdse66.spring.Back_End.service;

import lk.ijse.gdse66.spring.Back_End.auth.reponse.JwtAuthResponse;
import lk.ijse.gdse66.spring.Back_End.auth.request.SignInRequest;
import lk.ijse.gdse66.spring.Back_End.auth.request.SignUpRequest;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}
