package com.tailstreats.Tails_Treats.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "food_listing")
public class Food {
    @Id
    private String id;
    private String restaurantId;
    private String foodName;
    private String description;
    private Integer quantity;
    private String pickupLocation ;
    private String status;
    private LocalDateTime postedAt;
    private LocalDateTime expiryAt;

    public Food(String id, String restaurantId, String foodName, String description, Integer quantity, String pickupLocation, String status, LocalDateTime postedAt, LocalDateTime expiryAt) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.foodName = foodName;
        this.description = description;
        this.quantity = quantity;
        this.pickupLocation = pickupLocation;
        this.status = "Available";
        this.postedAt = postedAt;
        this.expiryAt = expiryAt;
    }
}
