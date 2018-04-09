/**
 * 
 */
package com.example.demo;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author USER
 *
 */

@Entity
public class Project implements Comparable<Project>{
	
	@Id
	private String oppm;
	private String pNumber;
	private String projectDesc;
	private int monthRelease;
	private int yearRelease;
	private String hours;
	private String assigned;
	private String team;
	private boolean isInvalidated;
	
	Project(){}
	
	public String getOppm() {
		return oppm;
	}
	public void setOppm(String oppm) {
		this.oppm = oppm;
	}
	public String getpNumber() {
		return pNumber;
	}
	public void setpNumber(String pNumber) {
		this.pNumber = pNumber;
	}
	public String getProjectDesc() {
		return projectDesc;
	}
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}
	public String getHours() {
		return hours;
	}
	public void setHours(String hours) {
		this.hours = hours;
	}
	public String getAssigned() {
		return assigned;
	}
	public void setAssigned(String assigned) {
		this.assigned = assigned;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public boolean isInvalidated() {
		return isInvalidated;
	}
	public void setInvalidated(boolean isInvalidated) {
		this.isInvalidated = isInvalidated;
	}
	public int getMonthRelease() {
		return monthRelease;
	}
	public void setMonthRelease(int monthRelease) {
		this.monthRelease = monthRelease;
	}
	public int getYearRelease() {
		return yearRelease;
	}
	public void setYearRelease(int yearRelease) {
		this.yearRelease = yearRelease;
	}

	@Override
	public int compareTo(Project p2) {
		Map<String,Integer> monthMap = new HashMap<>();
		monthMap.put("JAN", 0);
		monthMap.put("FEB", 1);
		monthMap.put("MAR", 2);
		monthMap.put("APR", 3);
		monthMap.put("MAY", 4);
		monthMap.put("JUN", 5);
		monthMap.put("JUL", 6);
		monthMap.put("AUG", 7);
		monthMap.put("SEP", 8);
		monthMap.put("OCT", 9);
		monthMap.put("NOV", 10);
		monthMap.put("DEC", 11);
		System.out.println("Month release : "+this.monthRelease);
		System.out.println("Month release : "+this.yearRelease);
		
		Calendar cal1;
		Calendar cal2;
		try {
			int month = this.monthRelease;
			int year = this.yearRelease;
			cal1 = Calendar.getInstance();
			cal1.set(year, month, 01);
			
			month = p2.getMonthRelease();
			year = p2.getYearRelease();
			cal2 = Calendar.getInstance();
			cal2.set(year, month, 01);
			return cal1.compareTo(cal2);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return 1;
		}
		
		
	}
	
}
