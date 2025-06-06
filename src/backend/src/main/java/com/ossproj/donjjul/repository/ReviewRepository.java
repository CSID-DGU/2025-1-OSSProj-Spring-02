// repository/ReviewRepository.java
package com.ossproj.donjjul.repository;

import com.ossproj.donjjul.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser_Id(Long userId);

    List<Review> findByStore_Id(Long storeId);
}
