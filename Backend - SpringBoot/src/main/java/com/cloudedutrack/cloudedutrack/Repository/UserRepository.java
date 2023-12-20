package com.cloudedutrack.cloudedutrack.Repository;

import com.cloudedutrack.cloudedutrack.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
