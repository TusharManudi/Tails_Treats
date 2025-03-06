package com.tailstreats.Tails_Treats.repository;

import com.tailstreats.Tails_Treats.models.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant,String> {
}
