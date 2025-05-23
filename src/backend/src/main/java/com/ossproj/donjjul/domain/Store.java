package com.ossproj.donjjul.domain;

import jakarta.persistence.*;
import lombok.*;
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
}
