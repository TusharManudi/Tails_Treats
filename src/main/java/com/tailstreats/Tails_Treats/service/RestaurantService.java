package com.tailstreats.Tails_Treats.service;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tailstreats.Tails_Treats.models.User;
import com.tailstreats.Tails_Treats.repository.UserRepository;

@Service
public class RestaurantService {
    
    @Autowired
    UserRepository userRepository;
    public HashMap<String , Object> getRestaurantDetails(String restaurantId){
        User restaurant = userRepository.findById(restaurantId).orElse(null);
        HashMap<String, Object> restaurantDetails = new HashMap<>();
        restaurantDetails.put("restaurantName", restaurant.getName());
        restaurantDetails.put("restaurantAddress", restaurant.getAddress());
        return restaurantDetails;
    }
}
