/**
 * 
 */
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.PlanViewWeeklyHours;

/**
 * @author USER
 *
 */

public interface PlanViewWeeklyRepository extends CrudRepository<PlanViewWeeklyHours, Integer> {
	int removeBySelectedWeekEnd(String selectedWeekEnd);
	List<PlanViewWeeklyHours> findBySelectedWeekEnd(String selectedWeekEnd);
	List<PlanViewWeeklyHours> findByOppm(String oppm);
	List<PlanViewWeeklyHours> findByOppmAndSoeid(String oppm,String soeid);
}

