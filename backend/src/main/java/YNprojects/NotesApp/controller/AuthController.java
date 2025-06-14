package YNprojects.NotesApp.controller;

import YNprojects.NotesApp.Entities.AuthenticationResponse;
import YNprojects.NotesApp.Entities.User;
import YNprojects.NotesApp.Services.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.catalina.Authenticator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User user) {
        System.out.println("register controller method");
        return ResponseEntity.ok(authenticationService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user) {
        System.out.println("login controller method");
        return ResponseEntity.ok(authenticationService.authenticate(user));
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok("hello this is secure. current user: " + currentUser);
    }

    @PostMapping("/verifyJwt")
    public ResponseEntity<AuthenticationResponse> verifyJwt(@RequestBody AuthenticationResponse jwtObject) {
        String token = jwtObject.getToken();
        String message;
        if(authenticationService.verifyJwt(token)){
            message = "valid";
        } else {
            message = "invalid";
        }
        System.out.println(message);
        return ResponseEntity.ok(new AuthenticationResponse(message));
    }


}
