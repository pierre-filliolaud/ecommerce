package com.ecommerce.gateway.repository;

import com.ecommerce.gateway.domain.SubCategory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SubCategory entity.
 */
@SuppressWarnings("unused")
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long> {

}
