package com.ossproj.donjjul.service;

import com.ossproj.donjjul.domain.Store;
import com.ossproj.donjjul.dto.StoreMarkerDto;
import com.ossproj.donjjul.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    // 가게 등록
    public Store createStore(Store store) {
        return storeRepository.save(store);
    }

    // 사업자번호로 가게 조회
    public Optional<Store> findByBusinessNumber(String businessNumber) {
        return storeRepository.findByBusinessNumber(businessNumber);
    }

    public Optional<Store> findById(Long id) {
        return storeRepository.findById(id);
    }


    // ✅ 카카오맵 마커용 가게 리스트 조회
    public List<StoreMarkerDto> getStoresForMap(String category) {
        List<Store> stores = (category != null && !category.isEmpty())
                ? storeRepository.findByCategory(category)
                : storeRepository.findAll();

        return stores.stream()
                .map(StoreMarkerDto::new)
                .toList();
    }

    public List<Store> getStoresWithId1To6() {
        return storeRepository.findByIdBetween(1L, 6L);
    }

    public List<Store> getStoresWithId7To12() {
        return storeRepository.findByIdBetween(7L, 12L);
    }
}
