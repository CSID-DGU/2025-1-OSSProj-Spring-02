package com.ossproj.donjjul.controller;

import com.ossproj.donjjul.dto.ReviewCreateRequest;
import com.ossproj.donjjul.dto.ReviewResponse;
import com.ossproj.donjjul.service.ReviewService;
import com.ossproj.donjjul.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ossproj.donjjul.domain.User;
import com.ossproj.donjjul.domain.Review;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ReviewResponse> create(@RequestBody ReviewCreateRequest request) {
        // 1. 리뷰 먼저 저장
        ReviewResponse reviewRes = reviewService.createReview(request);

        // 2. 포인트 적립 (userId는 request에 들어있어야 함)
        Long userId = request.getUserId(); // ReviewCreateRequest에 getUserId() 필요
        User user = userService.findById(userId);
        user.addDonationPoints(100); // 100포인트 적립
        userService.save(user);

        return ResponseEntity.ok(reviewRes);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByStoreId(@PathVariable Long storeId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByStoreId(storeId);
        return ResponseEntity.ok(reviews);
    }
}
