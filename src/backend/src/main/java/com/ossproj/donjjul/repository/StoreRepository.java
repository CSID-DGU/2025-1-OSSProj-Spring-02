package com.ossproj.donjjul.repository;

import com.ossproj.donjjul.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findByBusinessNumber(String businessNumber);

    boolean existsByBusinessNumber(String businessNumber);
}
