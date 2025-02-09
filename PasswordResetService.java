package com.stepIn.demo.service;


import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.stepIn.demo.model.PasswordResetToken;
import com.stepIn.demo.model.User;
import com.stepIn.demo.repository.PasswordResetTokenRepository;
import com.stepIn.demo.repository.RegRepository;



@Service
public class PasswordResetService {

    @Autowired
    private RegRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String email) {
        // First verify if email is not null or empty
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        
        // Try to find user and throw a more specific exception
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No user found with email: " + email));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusMinutes(15));
        tokenRepository.save(resetToken);
       
        String resetUrl = "TheToken needed for resseting your password is = " + token;
        sendEmail(email, resetUrl);
    }

    private void sendEmail(String to, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetUrl);
        mailSender.send(message);
 
    
    }


    
    
    
}

    
    



