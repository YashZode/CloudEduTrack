package com.cloudedutrack.cloudedutrack.service;

import com.cloudedutrack.cloudedutrack.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

//    public Long findUserIdByUsername(String username) {
//        User user =  userRepository.findByUsername(username)
//              //  .map(User::getId)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//        return user.getId();
//
//    }

    public boolean authenticate (String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }
}
