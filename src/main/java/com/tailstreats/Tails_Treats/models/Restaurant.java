package com.tailstreats.Tails_Treats.models;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "Restaurants")
@Data
public class Restaurant {
    @Id
    private String RestaurantId;
    private String name;
    @NonNull
    private String email ;
    @NonNull
    private String password;
    private String location ;
    private ArrayList<Food> donations = new ArrayList<>();
}