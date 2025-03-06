package com.tailstreats.Tails_Treats.repository;

import com.tailstreats.Tails_Treats.models.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<Users, ObjectId> {
    Optional<Users> findByEmail(String email);
}
