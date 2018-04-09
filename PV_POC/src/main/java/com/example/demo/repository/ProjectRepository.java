/**
 * 
 */
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.Project;

/**
 * @author USER
 *
 */
public interface ProjectRepository extends CrudRepository<Project, String> {
	@Query("SELECT p FROM Project p where p.team = ?1 and (p.yearRelease > ?3) or "
			+ "(p.monthRelease >= ?2 and p.yearRelease = ?3) and p.isInvalidated = false")
	List<Project> findByTeam(String team,int monthRelease,int yearRelease);
}
