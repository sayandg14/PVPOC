/**
 * 
 */
package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author USER
 *
 */
@Entity
public class PlanViewWeekly {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String soeid;
	private String team;
	private String hours;
	private String totHours;
	private String remainingHours;
	private String oppm;
	private String projectDesc;
	private String pNumber;
	
	private int monthRelease;
	private int yearRelease;
	private boolean disabled;
	
	PlanViewWeekly(){}
	
	PlanViewWeekly(String soeid,String oppm,String projectDesc,String pNumber,String hours,String totHours,
			String remainingHours,String team,int monthRelease,int yearRelease,boolean disabled){
		this.soeid = soeid;
		this.oppm = oppm;
		this.projectDesc = projectDesc;
		this.pNumber = pNumber;
		this.hours = hours;
		this.totHours = totHours;
		this.remainingHours = remainingHours;
		this.team = team;
		this.monthRelease = monthRelease;
		this.yearRelease = yearRelease;
		this.disabled = disabled;
	}
	
	public void setSoeid(String soeid) {
		this.soeid = soeid;
	}
	public String getSoeid() {
		return soeid;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getHours() {
		return hours;
	}
	public void setHours(String hours) {
		this.hours = hours;
	}
	public String getTotHours() {
		return totHours;
	}
	public String getRemainingHours() {
		return remainingHours;
	}
	public void setRemainingHours(String remainingHours) {
		this.remainingHours = remainingHours;
	}
	public void setTotHours(String totHours) {
		this.totHours = totHours;
	}
	public String getOppm() {
		return oppm;
	}
	public void setOppm(String oppm) {
		this.oppm = oppm;
	}
	public String getProjectDesc() {
		return projectDesc;
	}
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}
	public String getpNumber() {
		return pNumber;
	}
	public void setpNumber(String pNumber) {
		this.pNumber = pNumber;
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
	public boolean isDisabled() {
		return disabled;
	}
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	
}
