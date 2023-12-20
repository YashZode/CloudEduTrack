package com.cloudedutrack.cloudedutrack.service;

import com.cloudedutrack.cloudedutrack.Entity.User;
import com.cloudedutrack.cloudedutrack.Repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;


//    public boolean authenticate(String username, String rawPassword) {
//        Optional<User> optionalUser = userRepository.findByUsername(username);
//        System.out.println("User found: " + optionalUser.isPresent()); // This should log true if user is found
//        if (!optionalUser.isPresent()) {
//            return false; // User not found, return false immediately
//        }
//        return optionalUser.map(user -> {
//            try {
//                String hashedPassword = hashWithSHA256(rawPassword);
//                // Log the hash to compare
//                System.out.println("Hashed password: " + hashedPassword);
//                System.out.println("Stored password: " + user.getPassword());
//                return hashedPassword.equals(user.getPassword());
//            } catch (NoSuchAlgorithmException e) {
//                throw new RuntimeException(e);
//            }
//        }).orElse(false);
//    }
    @Transactional(readOnly = true)
    public boolean authenticate(String username, String rawPassword) {
        User user = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getResultList().stream().findFirst().orElse(null);

        if (user == null) {
            return false;
        }

        try {
            String hashedPassword = hashWithSHA256(rawPassword);
            return hashedPassword.equals(user.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public Long getUserId(String username) {
        User user = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getResultList().stream().findFirst().orElse(null);

        if (user != null) {
            return user.getId();
        } else {
            // Handle the case where the user is not found, perhaps throw an exception or return null
            //  throw new UsernameNotFoundException("User not found with username: " + username);
            System.out.println("User not found with username: " + username);
            return 0L;
        }

    }


    public static String hashWithSHA256(String textToHash) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(textToHash.getBytes());
        return bytesToHex(encodedhash);
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {  // Corrected to iterate over the array, not the length
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }



}
