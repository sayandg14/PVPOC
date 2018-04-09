/**
 * 
 */
package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author USER
 *
 */

@RestController
@RequestMapping("/teams")
@CrossOrigin 
public class Teams {
	
	List<Team> teams = new ArrayList<Team>();
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Team> getAllTeams(HttpServletRequest request,HttpServletResponse response){
		teams.clear();
		teams.add(new Team("NPS","NPS"));
		teams.add(new Team("CRS","CRS"));
		teams.add(new Team("NGA","NGA"));
		System.out.println("teams size : "+teams.size());
		return teams;
	}
}
