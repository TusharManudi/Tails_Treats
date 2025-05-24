package com.tailstreats.Tails_Treats.repository;

import com.tailstreats.Tails_Treats.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String phone);
}
