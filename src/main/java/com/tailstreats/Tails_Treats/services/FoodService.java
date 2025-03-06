package com.tailstreats.Tails_Treats.services;

import com.tailstreats.Tails_Treats.models.Food;
import com.tailstreats.Tails_Treats.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepo ;

    public Food addFood(Food food){
        return foodRepo.save(food);

    }
    public List<Food> getFoodByStatus(){
        return foodRepo.findByStatus("Available");
    }
    public Food claimFood(String id){
        Optional<Food> foodOptional = foodRepo.findById(id) ;
        if(foodOptional.isPresent()){
            Food food = foodOptional.get();
            food.setStatus("Claimed");
            return foodRepo.save(food);
        }
        return null;
    }
    public void deleteFood(String id){
        foodRepo.deleteById(id);
    }
    public Optional<Food> getFoodById(String id){
        return foodRepo.findById(id);
    }

}
