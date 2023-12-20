package com.cloudedutrack.cloudedutrack.Controller;

import com.cloudedutrack.cloudedutrack.Entity.User;
import com.cloudedutrack.cloudedutrack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {



    @Autowired
    private AuthService authService;


   // public Long yash;
   @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean isValidUser = authService.authenticate(user.getUsername(), user.getPassword());
        Long userId = authService.getUserId(user.getUsername());
        //return isValidUser ? ResponseEntity.ok("Valid User") : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User");
        if(isValidUser){
            return ResponseEntity.ok(userId.toString());
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User");
        }
    }
}
