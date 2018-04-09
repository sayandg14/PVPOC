/**
 * 
 */
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Employee;
import com.example.demo.Project;

/**
 * @author USER
 *
 */

public interface EmployeeRepository extends CrudRepository<Employee, String> {
	List<Employee> findByTeam(String team);
}
