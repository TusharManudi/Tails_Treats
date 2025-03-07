package com.tailstreats.Tails_Treats.controllers;

import com.tailstreats.Tails_Treats.models.Users;
import com.tailstreats.Tails_Treats.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<Users> getUsers(){
        List<Users> ls = userService.getAllUsers();
        return ls;

    }
    @PostMapping("/create")
    public void createUser(@RequestBody Users user){
        userService.createUser(user);
    }
}
