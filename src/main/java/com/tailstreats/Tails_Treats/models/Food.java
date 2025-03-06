package com.tailstreats.Tails_Treats.models;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@NoArgsConstructor
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

    public void setStatus(String status){
        this.status = status ;
    }

    public Food(String id, String restaurantId, String foodName, String description, Integer quantity, String pickupLocation, String status, LocalDateTime expiryAt) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.foodName = foodName;
        this.description = description;
        this.quantity = quantity;
        this.pickupLocation = pickupLocation;
        this.status = "Available";
        this.postedAt = LocalDateTime.now();
        this.expiryAt = expiryAt;
    }

    public String getId() {
        return id;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public String getFoodName() {
        return foodName;
    }

    public String getDescription() {
        return description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getPostedAt() {
        return postedAt;
    }

    public LocalDateTime getExpiryAt() {
        return expiryAt;
    }
}
