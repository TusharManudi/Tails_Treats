package com.tailstreats.Tails_Treats.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "foods")
public class Food {
    
    @Id
    private String id;
    private String foodName;
    private String description;
    private String restaurantId;
    private String shelterId;
    private String status; // AVAILABLE, CLAIMED, PICKED_UP, DELIVERED, EXPIRED
    private LocalDateTime donationTime;
    private LocalDateTime claimTime;
    private LocalDateTime pickupTime; // Note: Changed from pickUpTime to pickupTime for consistency
    private LocalDateTime deliveryTime;
    private LocalDateTime expiryTime;
    private String quantity;
    private String foodType; // e.g., "Dry Food", "Wet Food", "Treats"
    private String animalType; // e.g., "Dog", "Cat", "Bird"
    
    // Default constructor
    public Food() {}
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getFoodName() {
        return foodName;
    }
    
    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getRestaurantId() {
        return restaurantId;
    }
    
    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }
    
    public String getShelterId() {
        return shelterId;
    }
    
    public void setShelterId(String shelterId) {
        this.shelterId = shelterId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getDonationTime() {
        return donationTime;
    }
    
    public void setDonationTime(LocalDateTime donationTime) {
        this.donationTime = donationTime;
    }
    
    public LocalDateTime getClaimTime() {
        return claimTime;
    }
    
    public void setClaimTime(LocalDateTime claimTime) {
        this.claimTime = claimTime;
    }
    
    public LocalDateTime getPickupTime() {
        return pickupTime;
    }
    
    public void setPickupTime(LocalDateTime pickupTime) {
        this.pickupTime = pickupTime;
    }
    
    // For backward compatibility with existing code
    public void setPickUpTime(LocalDateTime pickupTime) {
        this.pickupTime = pickupTime;
    }
    
    public LocalDateTime getDeliveryTime() {
        return deliveryTime;
    }
    
    public void setDeliveryTime(LocalDateTime deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
    
    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }
    
    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }
    
    public String getQuantity() {
        return quantity;
    }
    
    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    
    public String getFoodType() {
        return foodType;
    }
    
    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }
    
    public String getAnimalType() {
        return animalType;
    }
    
    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }
}

