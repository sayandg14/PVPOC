/**
 * 
 */
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.LastWeekOOO;

/**
 * @author USER
 *
 */

public interface LastWeekRepository extends CrudRepository<LastWeekOOO, String> {
	List<LastWeekOOO> findByWeekEnd(String weekEnd);
	int removeByWeekEndAndSoeid(String weekEnd,String soeid);
}
