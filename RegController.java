package com.stepIn.demo.controller;

import java.util.List;


import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stepIn.demo.model.Program;
//import com.stepIn.demo.model.Program;
import com.stepIn.demo.model.User;

import com.stepIn.demo.service.RegService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class RegController {

    @Autowired
    private RegService service;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final Logger logger = LoggerFactory.getLogger(RegController.class);
    
   
    // Get all users
    @GetMapping("/api/show")
    public ResponseEntity<List<User>> showAll() {
        try {
            List<User> users = service.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            // Log the error and return internal server error response
            System.err.println("Error fetching users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Add a new user
    @PostMapping("/api/save")
    public ResponseEntity<?> addUser(@RequestBody User users) {
        try {
            // Log the received user for debugging
            System.out.println("Received User: " + users);

            User savedUser = service.saveUser(users);

            // Check if the user was saved successfully
            if (savedUser != null) {
                System.out.println("Saved User: " + savedUser);
                return ResponseEntity.ok(savedUser);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("User could not be saved. Please try again.");
            }
        } catch (Exception e) {
            // Log the error and return internal server error response
            System.err.println("Error saving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the user.");
        }
    }
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            logger.info("Login attempt for email: {}", loginRequest.getEmail());

            Optional<User> userOpt = service.findByEmail(loginRequest.getEmail());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                logger.info("User found: {}", user);

                // Compare passwords
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    logger.info("Password matched for user: {}", user.getEmail());

                    return ResponseEntity.ok(Map.of(
                            "role", user.getRole(),
                            "token", "dummy-token",
                            "userId",user.getId()// Replace with actual token logic
                    ));
                } else {
                    logger.warn("Invalid password for user: {}", user.getEmail());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
                }
            } else {
                logger.warn("User not found for email: {}", loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            logger.error("Error during login: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the login request.");
        }
    }

    
    // Get user by ID
    @GetMapping("/show/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = service.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Update user by ID
    @PutMapping("/edit/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User userDetails) {
        try {
            User updatedUser = service.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get programs joined by the user
    @GetMapping("/user/{id}/programs")
    public ResponseEntity<List<Program>> getUserPrograms(@PathVariable int id) {
        try {
            List<Program> programs = service.getUserPrograms(id);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/user/{programId}")
    public List<User> getUsersByProgram(@PathVariable int programId) {
        return service.getUsersByProgramId(programId);
    }
    
    
}

    
