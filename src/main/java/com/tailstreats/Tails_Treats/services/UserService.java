package com.tailstreats.Tails_Treats.services;

import com.tailstreats.Tails_Treats.models.Users;
import com.tailstreats.Tails_Treats.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public List<Users> getAllUsers(){
        return userRepo.findAll();
    }
    public Optional<Users> findByEmail(String email){
        return userRepo.findByEmail(email);
    }
    public Users createUser(Users user){
        return userRepo.save(user);
    }
    public String  deleteUser(String id){
        userRepo.deleteById(id);
        return "User deleted" ;
    }
}
