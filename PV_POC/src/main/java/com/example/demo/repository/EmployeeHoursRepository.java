/**
 * 
 */
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.EmployeeHours;

/**
 * @author USER
 *
 */

public interface EmployeeHoursRepository extends CrudRepository<EmployeeHours, Integer> {
	List<EmployeeHours> findByOppm(String oppm);
	int removeByOppmAndSoeid(String oppm,String soeid);
	
}

