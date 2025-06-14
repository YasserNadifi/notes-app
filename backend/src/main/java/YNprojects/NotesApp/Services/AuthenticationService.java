package YNprojects.NotesApp.Services;

import YNprojects.NotesApp.Entities.AuthenticationResponse;
import YNprojects.NotesApp.Entities.User;
import YNprojects.NotesApp.Exception.UsernameAlreadyTakenException;
import YNprojects.NotesApp.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private UserRepo userRepo;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(User request) {
        if (userRepo.existsByUsername(request.getUsername())){
            throw new UsernameAlreadyTakenException("username already taken");
        }
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setRole(request.getRole());
        newUser=userRepo.save(newUser);
        String token = jwtService.generateToken(newUser);
        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        System.out.println("authenticate method 1");

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        System.out.println("authenticate method 2");
        User user = userRepo.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);
        System.out.println("authenticate method 3");
        return new AuthenticationResponse(token);
    }

    public boolean verifyJwt(String jwt) {
        try {
            System.out.println("jwt : "+jwt);
            // i used extractUsername instead of using isValid beacause the latter would require extracting
            //  the username and then validating the jwt against the user with that username which achieves
            // nothing, since the actual verification and exception throwing happens inside extractUsername
            jwtService.extractUsername(jwt);
            return true;
        } catch (Exception e) {
            System.out.println("verifyJwt exception : " + e.getMessage());
            System.out.println("verifyJwt exception name : " + e.getClass().getName());
            return false;
        }
    }
}
