package com.ossproj.donjjul.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import jakarta.persistence.Lob;


import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "business_number", unique = true)
    private String businessNumber;

    private String address;
    private Double latitude;
    private Double longitude;

    private String description;

    @Column(name = "is_certified")
    private Boolean isCertified;

    @Column(name = "is_disaster_area")
    private Boolean isDisasterArea;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column
    private String category;

    @Lob
    private String image;

    @Column
    private String work_time;

    @Column
    private String store_phone;

    @Column
    private String rating;
}
