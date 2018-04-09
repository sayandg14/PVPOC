/**
 * 
 */
package com.example.demo;

import java.text.Format;
import java.text.SimpleDateFormat;
/**
 * @author USER
 *
 */
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

import com.example.demo.repository.ProjectRepository;


@RestController
@RequestMapping("/projects")
@CrossOrigin 
public class Projects {
	
	@Autowired
	ProjectRepository projectRepo;
	
	List<Project> projects = new ArrayList<>();
	
	@SuppressWarnings("unused")
	@RequestMapping(method = RequestMethod.POST)
	public Project addProject(@RequestBody Map projectData,HttpServletRequest request,HttpServletResponse response){
		System.out.println("in post project : "+projectData);
		
		String pNumber = (((Map)projectData.get("projectData")).get("pNumber")).toString();
		String oppm = (((Map)projectData.get("projectData")).get("oppm")).toString();
		String desc = (((Map)projectData.get("projectData")).get("projectDesc")).toString();
		String monthRelease = (((Map)projectData.get("projectData")).get("monthRelease")).toString();
		String yearRelease = (((Map)projectData.get("projectData")).get("yearRelease")).toString();
		String hours = (((Map)projectData.get("projectData")).get("hours")).toString();
		String team = (((Map)projectData.get("projectData")).get("team")).toString();
		
		Project project = new Project();
		project.setpNumber(pNumber);
		project.setOppm(oppm);
		project.setProjectDesc(desc);
		project.setMonthRelease(Integer.parseInt(monthRelease));
		project.setYearRelease(Integer.parseInt(yearRelease));
		project.setAssigned("N");
		project.setHours(hours);
		project.setTeam(team);
		project.setInvalidated(false);
		
		projectRepo.save(project);
		projects.add(project);
		return project;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Project> getAllProjects(HttpServletRequest request,HttpServletResponse response){
		
		projects = (List<Project>) projectRepo.findAll();
		if(projects.size() > 0)
			System.out.println("projects : "+projects.get(0).getProjectDesc());
		else 
			System.out.println("Number of Projects is Zero");
		return projects;
	}
	
	@RequestMapping(method = RequestMethod.GET,value="/{teamName}")
	public List<Project> getpRrojectsByTeam(@PathVariable String teamName,HttpServletRequest request,
			HttpServletResponse response){
		
		List<Project> projectByTeam = new ArrayList<>();
		try {
			System.out.println("Path variable teamName : "+teamName);
			projects = (List<Project>) projectRepo.findAll();
			for(Project project:projects) {
				if(project.getTeam().equals(teamName)){
					projectByTeam.add(project);
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return projectByTeam;
	}
}

