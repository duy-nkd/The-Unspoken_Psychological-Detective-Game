package com.capstone.detectivegame.repository;
import com.capstone.detectivegame.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> {}
