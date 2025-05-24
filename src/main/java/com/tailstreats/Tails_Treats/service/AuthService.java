package com.tailstreats.Tails_Treats.service;

import com.tailstreats.Tails_Treats.dto.LoginRequest;
import com.tailstreats.Tails_Treats.dto.LoginResponse;
import com.tailstreats.Tails_Treats.dto.RegisterUserRequest;
import com.tailstreats.Tails_Treats.models.User;
import com.tailstreats.Tails_Treats.repository.UserRepository;
import com.tailstreats.Tails_Treats.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public ResponseEntity<?> registerUser(RegisterUserRequest registerRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Create new user
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setUserType(registerRequest.getRole().toString());

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    public LoginResponse login(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        System.out.println(user);
        // Check password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getEmail());

        // Return response with token and user details
        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUserType()
        );
    }

    public Map<String, Boolean> validateToken(String token) {
        Map<String, Boolean> response = new HashMap<>();
        
        try {
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            boolean isValid = jwtTokenProvider.validateToken(token);
            response.put("valid", isValid);
            
            return response;
        } catch (Exception e) {
            response.put("valid", false);
            return response;
        }
    }
}