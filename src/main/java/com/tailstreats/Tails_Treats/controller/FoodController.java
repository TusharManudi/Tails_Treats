package com.tailstreats.Tails_Treats.controller;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/donate")
    public ResponseEntity<Food> donateFood(@RequestBody Food food) {
        try {
            // Log the incoming request for debugging
            System.out.println("Received donation request: " + food);
            
            // Call the service to save the food donation
            Food savedFood = foodService.donateFood(food);
            
            return ResponseEntity.ok(savedFood);
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error processing donation: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<Food>> getAvailableFoods() {
        return ResponseEntity.ok(foodService.getAvailableFoods());
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getFoodsByRestaurant(@PathVariable String restaurantId) {
        return ResponseEntity.ok(foodService.getFoodsByRestaurant(restaurantId));
    }

    @PutMapping("/{id}/claim")
    public ResponseEntity<Food> claimFood(@PathVariable String id, @RequestParam String shelterId) {
        return ResponseEntity.ok(foodService.claimFood(id, shelterId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Food> updateFoodStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(foodService.updateFoodStatus(id, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable String id) {
        return ResponseEntity.ok(foodService.getFoodById(id));
    }

    @GetMapping("/restaurant/{restaurantId}/donations")
    public ResponseEntity<List<Food>> getRestaurantDonations(@PathVariable String restaurantId) {
        return ResponseEntity.ok(foodService.getFoodsByRestaurant(restaurantId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable String id) {
        foodService.deleteFood(id);
        return ResponseEntity.ok().build();
    }
}