package com.stepIn.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


//import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import com.stepIn.demo.model.Program;
import com.stepIn.demo.model.User;

import com.stepIn.demo.repository.ProgramRepository;
import com.stepIn.demo.repository.RegRepository;
import java.util.Optional;
@Service
public class RegService {

    @Autowired
    public RegRepository reg;
    @Autowired
    public ProgramRepository programRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    


    
    public User getUserById(int id) {
        return reg.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    

    public List<User> getAllUsers() {
        return reg.findAll();
    }

    public User saveUser(User user) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return reg.save(user);
    }
   
    public Optional<User> findByEmail(String email) {
        return reg.findByEmail(email);
    }
    
        // Update user by ID
        public User updateUser(int id, User userDetails) {
            User user = getUserById(id);

            // Update user details
            user.setFullname(userDetails.getFullname());
            user.setLastname(userDetails.getLastname());
            user.setBatch(userDetails.getBatch());
            user.setCourse(userDetails.getCourse());
            user.setEmail(userDetails.getEmail());
            user.setPhNo(userDetails.getPhNo());
            // Save and return the updated user
            return reg.save(user);
        }

        // Get programs joined by the user
        public List<Program> getUserPrograms(int userId) {
            User user = getUserById(userId);
            return user.getJoinedPrograms();
        }
        //get user details joined the program

        public List<User> getUsersByProgramId(int programId) {
            return reg.findUsersByProgramId(programId);
        }
        

    }
  


