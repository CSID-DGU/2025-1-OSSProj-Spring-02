package com.ossproj.donjjul.controller;

import com.ossproj.donjjul.domain.Store;
import com.ossproj.donjjul.dto.StoreMarkerDto;
import com.ossproj.donjjul.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    // ✅ 가게 등록
    @PostMapping
    public ResponseEntity<Store> createStore(@RequestBody Store store) {
        Store saved = storeService.createStore(store);
        return ResponseEntity.ok(saved);
    }

    // ✅ 사업자번호로 단일 가게 조회
    @GetMapping("/{businessNumber}")
    public ResponseEntity<Store> getStoreByBusinessNumber(@PathVariable String businessNumber) {
        Optional<Store> store = storeService.findByBusinessNumber(businessNumber);
        return store.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ 카카오맵 마커용 전체 가게 리스트 조회 (카테고리 선택 가능)
    @GetMapping
    public ResponseEntity<List<StoreMarkerDto>> getStoreMarkers(
            @RequestParam(required = false) String category) {
        List<StoreMarkerDto> stores = storeService.getStoresForMap(category);
        return ResponseEntity.ok(stores);
    }
}
