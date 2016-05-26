package com.ecommerce.cart.repository;

import com.ecommerce.cart.domain.Item;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Item entity.
 */
@SuppressWarnings("unused")
public interface ItemRepository extends JpaRepository<Item,Long> {

}
