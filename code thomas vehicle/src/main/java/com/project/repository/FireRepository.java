package com.project.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.project.model.dto.FireDto;

public interface FireRepository extends CrudRepository<FireDto, Integer> {
	public Optional<FireDto> findById(Integer id);
}
