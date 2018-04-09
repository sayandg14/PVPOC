package com.example.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.EmployeeRepository;


@RestController
@RequestMapping("/employees")
@CrossOrigin 
public class Employees {
	
	@Autowired
	EmployeeRepository empRepo;
	
	List<Employee> employees = new ArrayList<>();
	
	@RequestMapping(method = RequestMethod.POST)
	public Employee addEmployee(@RequestBody Map employeeData,HttpServletRequest request,HttpServletResponse response){
		System.out.println("in post employees : "+employeeData);
		
		String firstName = (((Map)employeeData.get("employeeData")).get("firstName")).toString();
		String lastName = (((Map)employeeData.get("employeeData")).get("lastName")).toString();
		String soeId = (((Map)employeeData.get("employeeData")).get("soeid")).toString();
		String team = (((Map)employeeData.get("employeeData")).get("team")).toString();
		
		Employee employee = new Employee();
		employee.setFirstName(firstName);
		employee.setLastName(lastName);
		employee.setSoeid(soeId);
		employee.setTeam(team);
		
		empRepo.save(employee);
		
		employees.add(employee);
		return employee;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Employee> getAllEmployees(HttpServletRequest request,
			HttpServletResponse response){
		//System.out.println("Path variable teamName : "+teamName);
		
		employees = (List<Employee>) empRepo.findAll();
		if(employees.size() > 0)
			System.out.println("employees : "+employees.get(0).getFirstName());
		else 
			System.out.println("Number of Employees is Zero");
		return employees;
	}
	
	@RequestMapping(method = RequestMethod.GET,value="/{teamName}")
	public List<Employee> getEmployeesByTeam(@PathVariable String teamName){
		List<Employee> employeeByTeam = new ArrayList<>();
		employees = (List<Employee>) empRepo.findAll();
		System.out.println("Path variable teamName : "+teamName);
		if(employees.size() > 0)
			System.out.println("employees : "+employees.get(0).getFirstName());
		else 
			System.out.println("Number of Employees is Zero");
		
		for(Employee employee:employees) {
			if(employee.getTeam().equals(teamName)){
				employeeByTeam.add(employee);
			}
		}
		return employeeByTeam;
	}
}
