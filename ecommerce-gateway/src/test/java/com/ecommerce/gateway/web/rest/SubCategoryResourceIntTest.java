package com.ecommerce.gateway.web.rest;

import com.ecommerce.gateway.GatewayApp;
import com.ecommerce.gateway.domain.SubCategory;
import com.ecommerce.gateway.repository.SubCategoryRepository;
import com.ecommerce.gateway.repository.search.SubCategorySearchRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the SubCategoryResource REST controller.
 *
 * @see SubCategoryResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GatewayApp.class)
@WebAppConfiguration
@IntegrationTest
public class SubCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";

    private static final Boolean DEFAULT_ALCOHOL = false;
    private static final Boolean UPDATED_ALCOHOL = true;

    @Inject
    private SubCategoryRepository subCategoryRepository;

    @Inject
    private SubCategorySearchRepository subCategorySearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restSubCategoryMockMvc;

    private SubCategory subCategory;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SubCategoryResource subCategoryResource = new SubCategoryResource();
        ReflectionTestUtils.setField(subCategoryResource, "subCategorySearchRepository", subCategorySearchRepository);
        ReflectionTestUtils.setField(subCategoryResource, "subCategoryRepository", subCategoryRepository);
        this.restSubCategoryMockMvc = MockMvcBuilders.standaloneSetup(subCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        subCategorySearchRepository.deleteAll();
        subCategory = new SubCategory();
        subCategory.setName(DEFAULT_NAME);
        subCategory.setAlcohol(DEFAULT_ALCOHOL);
    }

    @Test
    @Transactional
    public void createSubCategory() throws Exception {
        int databaseSizeBeforeCreate = subCategoryRepository.findAll().size();

        // Create the SubCategory

        restSubCategoryMockMvc.perform(post("/api/sub-categories")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(subCategory)))
                .andExpect(status().isCreated());

        // Validate the SubCategory in the database
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeCreate + 1);
        SubCategory testSubCategory = subCategories.get(subCategories.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubCategory.isAlcohol()).isEqualTo(DEFAULT_ALCOHOL);

        // Validate the SubCategory in ElasticSearch
        SubCategory subCategoryEs = subCategorySearchRepository.findOne(testSubCategory.getId());
        assertThat(subCategoryEs).isEqualToComparingFieldByField(testSubCategory);
    }

    @Test
    @Transactional
    public void getAllSubCategories() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get all the subCategories
        restSubCategoryMockMvc.perform(get("/api/sub-categories?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(subCategory.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].alcohol").value(hasItem(DEFAULT_ALCOHOL.booleanValue())));
    }

    @Test
    @Transactional
    public void getSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", subCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(subCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.alcohol").value(DEFAULT_ALCOHOL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubCategory() throws Exception {
        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);
        subCategorySearchRepository.save(subCategory);
        int databaseSizeBeforeUpdate = subCategoryRepository.findAll().size();

        // Update the subCategory
        SubCategory updatedSubCategory = new SubCategory();
        updatedSubCategory.setId(subCategory.getId());
        updatedSubCategory.setName(UPDATED_NAME);
        updatedSubCategory.setAlcohol(UPDATED_ALCOHOL);

        restSubCategoryMockMvc.perform(put("/api/sub-categories")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedSubCategory)))
                .andExpect(status().isOk());

        // Validate the SubCategory in the database
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeUpdate);
        SubCategory testSubCategory = subCategories.get(subCategories.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubCategory.isAlcohol()).isEqualTo(UPDATED_ALCOHOL);

        // Validate the SubCategory in ElasticSearch
        SubCategory subCategoryEs = subCategorySearchRepository.findOne(testSubCategory.getId());
        assertThat(subCategoryEs).isEqualToComparingFieldByField(testSubCategory);
    }

    @Test
    @Transactional
    public void deleteSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);
        subCategorySearchRepository.save(subCategory);
        int databaseSizeBeforeDelete = subCategoryRepository.findAll().size();

        // Get the subCategory
        restSubCategoryMockMvc.perform(delete("/api/sub-categories/{id}", subCategory.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate ElasticSearch is empty
        boolean subCategoryExistsInEs = subCategorySearchRepository.exists(subCategory.getId());
        assertThat(subCategoryExistsInEs).isFalse();

        // Validate the database is empty
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);
        subCategorySearchRepository.save(subCategory);

        // Search the subCategory
        restSubCategoryMockMvc.perform(get("/api/_search/sub-categories?query=id:" + subCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].alcohol").value(hasItem(DEFAULT_ALCOHOL.booleanValue())));
    }
}
