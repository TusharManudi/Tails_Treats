package com.tailstreats.Tails_Treats.repository;

import com.tailstreats.Tails_Treats.models.Food;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FoodRepository extends MongoRepository<Food,String> {
    List<Food> findByStatus(String status) ;
    List<Food> findByRestaurantId(String id);
}
