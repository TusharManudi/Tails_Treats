package com.tailstreats.Tails_Treats.controller;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.service.FoodService;
import com.tailstreats.Tails_Treats.service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    private final FoodService foodService;

    
    private final RestaurantService RestaurantService; // Added RestaurantService application

    @Autowired
    public RestaurantController(FoodService foodService , RestaurantService restaurantService) {
        this.foodService = foodService;
        this.RestaurantService = restaurantService;
    }

    @GetMapping("/{restaurantId}/details")
    public ResponseEntity<Map<String, Object>> getRestaurantDetails(@PathVariable String restaurantId) {
        try {
            // Fetch restaurant details
            Map<String, Object> restaurantDetails = RestaurantService.getRestaurantDetails(restaurantId); 
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch restaurant details: " + e.getMessage());
            return ResponseEntity.status(500).body((Map<String, Object>) (Map<?, ?>) errorResponse);
        }
        Map<String, Object> restaurantDetails = RestaurantService.getRestaurantDetails(restaurantId);
        return ResponseEntity.ok(restaurantDetails);
    }

    @PostMapping("/{restaurantId}/donate")
    public ResponseEntity<?> donateFood(@PathVariable String restaurantId, @RequestBody Food food) {
        try {
            System.out.println("Received donation request for restaurant: " + restaurantId);
            System.out.println("Request body: " + food);
            
            // Set restaurant ID
            food.setRestaurantId(restaurantId);
            
            // Set creation time if not already set
            if (food.getDonationTime() == null) {
                food.setDonationTime(LocalDateTime.now());
            }
            
            // Set default status if not provided
            if (food.getStatus() == null || food.getStatus().isEmpty()) {
                food.setStatus("AVAILABLE");
            }
            
            // Print the food object before saving
            System.out.println("Food object before saving: " + food);
            
            // Save the food donation
            Food savedFood = foodService.donateFood(food);
            System.out.println("Saved food donation: " + savedFood);
            
            return ResponseEntity.ok(savedFood);
        } catch (DateTimeParseException e) {
            System.err.println("Date parsing error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid date format: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            System.err.println("General error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create donation: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/{restaurantId}/donations")
    public ResponseEntity<?> getDonations(@PathVariable String restaurantId) {
        try {
            List<Food> donations = foodService.getFoodsByRestaurant(restaurantId);
            return ResponseEntity.ok(donations);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch donations: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}