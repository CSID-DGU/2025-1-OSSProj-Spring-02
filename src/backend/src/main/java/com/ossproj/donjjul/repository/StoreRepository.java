package com.ossproj.donjjul.repository;

import com.ossproj.donjjul.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findByBusinessNumber(String businessNumber);

    boolean existsByBusinessNumber(String businessNumber);

    // ✅ 카테고리 필터용 메서드 (지도 마커 조회용)
    List<Store> findByCategory(String category);

    // ID가 1~6 사이인 가게들만 조회
    List<Store> findByIdBetween(Long start, Long end);
}
