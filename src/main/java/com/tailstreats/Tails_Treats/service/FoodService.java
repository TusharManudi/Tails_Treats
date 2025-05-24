package com.tailstreats.Tails_Treats.service;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food donateFood(Food food) {
        try {
            // Log the food object for debugging
            System.out.println("Processing food donation: " + food);
            
            // Set creation timestamp if not already set
            if (food.getDonationTime() == null) {
                food.setDonationTime(LocalDateTime.now());
            }
            
            // Ensure status is set
            if (food.getStatus() == null || food.getStatus().isEmpty()) {
                food.setStatus("AVAILABLE");
            }
            
            // Save the food donation
            return foodRepository.save(food);
        } catch (Exception e) {
            // Log any exceptions
            System.err.println("Error saving food donation: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<Food> getAvailableFoods() {
        return foodRepository.findByStatus("AVAILABLE");
    }

    public List<Food> getFoodsByRestaurant(String restaurantId) {
        if (restaurantId == null || restaurantId.isEmpty()) {
            throw new RuntimeException("Restaurant ID is required");
        }
        return foodRepository.findByRestaurantId(restaurantId);
    }

    public List<Food> getFoodsByShelter(String shelterId) {
        if (shelterId == null || shelterId.isEmpty()) {
            throw new RuntimeException("Shelter ID is required");
        }
        return foodRepository.findByShelterId(shelterId);
    }

    public Food claimFood(String id, String shelterId) {
        if (id == null || id.isEmpty()) {
            throw new RuntimeException("Food ID is required");
        }
        if (shelterId == null || shelterId.isEmpty()) {
            throw new RuntimeException("Shelter ID is required");
        }
        
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with ID: " + id));
        
        if (!"AVAILABLE".equals(food.getStatus())) {
            throw new RuntimeException("Food is not available for claiming");
        }
        
        food.setShelterId(shelterId);
        food.setStatus("CLAIMED");
        food.setClaimTime(LocalDateTime.now());
        
        return foodRepository.save(food);
    }

    public Food updateFoodStatus(String id, String status) {
        if (id == null || id.isEmpty()) {
            throw new RuntimeException("Food ID is required");
        }
        if (status == null || status.isEmpty()) {
            throw new RuntimeException("Status is required");
        }
        
        // Validate status
        if (!isValidStatus(status)) {
            throw new RuntimeException("Invalid status: " + status);
        }
        
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with ID: " + id));
        
        food.setStatus(status);
        
        if ("PICKED_UP".equals(status)) {
            food.setPickUpTime(LocalDateTime.now());
        } else if ("DELIVERED".equals(status)) {
            food.setDeliveryTime(LocalDateTime.now());
        }
        
        return foodRepository.save(food);
    }

    public Food getFoodById(String id) {
        if (id == null || id.isEmpty()) {
            throw new RuntimeException("Food ID is required");
        }
        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with ID: " + id));
    }
    
    // Helper method to validate status
    private boolean isValidStatus(String status) {
        return "AVAILABLE".equals(status) || 
               "CLAIMED".equals(status) || 
               "PICKED_UP".equals(status) || 
               "DELIVERED".equals(status) ||
               "EXPIRED".equals(status);
    }

    public boolean deleteFood(String id) {
        foodRepository.deleteById(id);
        return true;
    }
}