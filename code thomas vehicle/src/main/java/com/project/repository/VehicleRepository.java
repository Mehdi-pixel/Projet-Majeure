package com.project.repository;

import org.springframework.data.repository.CrudRepository;

import com.project.model.dto.VehicleDto;

public interface VehicleRepository extends CrudRepository<VehicleDto, Integer> {
	
}
