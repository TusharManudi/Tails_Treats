package com.tailstreats.Tails_Treats.services;

import com.tailstreats.Tails_Treats.models.Restaurant;
import com.tailstreats.Tails_Treats.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {
    @Autowired
    RestaurantRepository restaurantRepository;

    public Optional<Restaurant> getRestaurantById(String id){
        return restaurantRepository.findById(id);
    }

    public List<Restaurant> restaurantList(){
        return restaurantRepository.findAll() ;
    }
    public String deleteRestaurant(String id){
        restaurantRepository.deleteById(id);
        return "Deleted" ;
    }
}
