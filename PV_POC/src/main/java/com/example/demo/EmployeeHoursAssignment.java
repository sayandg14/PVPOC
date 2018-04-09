package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.EmployeeHoursRepository;
import com.example.demo.repository.PlanViewWeeklyRepository;
import com.example.demo.repository.ProjectRepository;

@RestController
@RequestMapping("/employeeHoursAssignment")
@CrossOrigin 
public class EmployeeHoursAssignment {

	@Autowired
	EmployeeHoursRepository empHourRepo;
	@Autowired
	ProjectRepository projectRepo;
	@Autowired
	PlanViewWeeklyRepository planViewWeeklyRepo;
	
	List<Employee> employees = new ArrayList<>();
	
	@RequestMapping(method = RequestMethod.POST)
	@Transactional
	public boolean submitSelectedEMployees(@RequestBody Map employeeHoursData,HttpServletRequest request,HttpServletResponse response){
		System.out.println("in post employees : "+employeeHoursData);
		System.out.println("employeeHoursData Map value : "+((List<Map<String,String>>)employeeHoursData.get("selectedEmployeesProjects")));
		List<Map<String,String>> employeeHoursDataList = (List<Map<String,String>>)employeeHoursData.get("selectedEmployeesProjects");
		System.out.println("employeeHoursDataList Size : "+employeeHoursDataList.size());
		
		//String oppmDelete = employeeHoursDataList.get(0).get("oppm");
		
		
		//empHourRepo.removeByOppm(oppmDelete);
		for(Map<String,String> employeeHoursMap:employeeHoursDataList) {
			System.out.println("employeeHours soedID : "+employeeHoursMap.get("soeid"));
			System.out.println("employeeHours Team : "+employeeHoursMap.get("team"));
			System.out.println("employeeHours Hours : "+employeeHoursMap.get("hours"));
			System.out.println("employeeHours oppm : "+employeeHoursMap.get("oppm"));
			
			String soeId = employeeHoursMap.get("soeid");
			String team = employeeHoursMap.get("team");
			String hours = employeeHoursMap.get("hours");
			String oppm = employeeHoursMap.get("oppm");
			
			//List<EmployeeHours> empHourList = empHourRepo.findByOppmAndsoeid(oppm,soeId);
			
			
			if(hours.equals("0") || hours.equals(""))
				continue;
			EmployeeHours employeeHours = new EmployeeHours();
			employeeHours.setSoeid(soeId);
			employeeHours.setTeam(team);
			employeeHours.setHours(hours);
			employeeHours.setOppm(oppm);
			
			try {
				empHourRepo.removeByOppmAndSoeid(oppm, soeId);
				empHourRepo.save(employeeHours);
				Project project = (Project)projectRepo.findOne(oppm);
				System.out.println("Project OPPM : "+project.getOppm());
				project.setAssigned("Y");
				projectRepo.save(project);
				
			} catch(Exception e){
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
	
	@RequestMapping(method = RequestMethod.GET,value="/{selectedProjectOppm}")
	public List<EmployeeHours> getAssignedTeamMembers(@PathVariable String selectedProjectOppm){
		System.out.println("selectedProjectOppm : "+selectedProjectOppm);
		List<EmployeeHours> employeeHoursList = empHourRepo.findByOppm(selectedProjectOppm);
		List<EmployeeHours> assignedEmployees = new ArrayList<>();
		for(EmployeeHours empHour:employeeHoursList) {
			assignedEmployees.add(empHour);
		}
		System.out.println("Length : "+assignedEmployees.size());
		return assignedEmployees;
	}
}
