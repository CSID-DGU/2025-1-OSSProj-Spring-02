package com.ossproj.donjjul.service;

import com.ossproj.donjjul.domain.Review;
import com.ossproj.donjjul.domain.Store;
import com.ossproj.donjjul.domain.User;
import com.ossproj.donjjul.dto.ReviewCreateRequest;
import com.ossproj.donjjul.dto.ReviewResponse;
import com.ossproj.donjjul.repository.ReviewRepository;
import com.ossproj.donjjul.repository.StoreRepository;
import com.ossproj.donjjul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepo;
    private final UserRepository userRepo;
    private final StoreRepository storeRepo;

    @Transactional
    public ReviewResponse createReview(ReviewCreateRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));

        Store store = storeRepo.findById(req.getStoreId())
                .orElseThrow(() -> new IllegalArgumentException("스토어 없음"));

        Review r = new Review(user, store, req.getRating(), req.getContent());
        reviewRepo.save(r);

        return new ReviewResponse(
                r.getId(), r.getUserId(), r.getStoreId(),
                r.getRating(), r.getContent(), r.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByUserId(Long userId) {
        return reviewRepo.findByUser_Id(userId)  // <-- 여기
                .stream()
                .map(r -> new ReviewResponse(
                        r.getId(),
                        r.getUser().getId(),    // getUserId()가 없으면 이렇게
                        r.getStore().getId(),
                        r.getRating(),
                        r.getContent(),
                        r.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

        @Transactional(readOnly = true)
        public List<ReviewResponse> getReviewsByStoreId(Long storeId) {
                return reviewRepo.findByStore_Id(storeId)
                        .stream()
                        .map(r -> new ReviewResponse(
                                r.getId(),
                                r.getUser().getId(),
                                r.getStore().getId(),
                                r.getRating(),
                                r.getContent(),
                                r.getCreatedAt()
                ))
                .collect(Collectors.toList());
        }


}
