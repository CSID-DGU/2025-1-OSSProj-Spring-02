package com.ossproj.donjjul.repository;

import com.ossproj.donjjul.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByBusinessNumber(String businessNumber);
}
