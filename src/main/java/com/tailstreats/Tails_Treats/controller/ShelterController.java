package com.tailstreats.Tails_Treats.controller;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelter")
public class ShelterController {

    private final FoodService foodService;

    @Autowired
    public ShelterController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/{shelterId}/claimed")
    public ResponseEntity<List<Food>> getClaimedFoods(@PathVariable String shelterId) {
        return ResponseEntity.ok(foodService.getFoodsByShelter(shelterId));
    }

    @PostMapping("/{shelterId}/claim/{foodId}")
    public ResponseEntity<Food> claimFood(@PathVariable String shelterId, @PathVariable String foodId) {
        return ResponseEntity.ok(foodService.claimFood(foodId, shelterId));
    }

    @PutMapping("/{shelterId}/pickup/{foodId}")
    public ResponseEntity<Food> markAsPickedUp(@PathVariable String shelterId, @PathVariable String foodId) {
        return ResponseEntity.ok(foodService.updateFoodStatus(foodId, "PICKED_UP"));
    }
}