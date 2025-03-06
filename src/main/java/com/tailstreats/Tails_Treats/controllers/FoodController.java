package com.tailstreats.Tails_Treats.controllers;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    FoodService foodService ;
    @GetMapping("/available")
    public List<Food> getAvailableFood(){
        return foodService.getFoodByStatus();
    }

    @PostMapping("/add")
    public ResponseEntity<Food> addFood(Food food){
        return ResponseEntity.ok(foodService.addFood(food)) ;
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getFoodById(@PathVariable String id){
        Optional<Food> food = foodService.getFoodById(id);
        return food.map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }
}
