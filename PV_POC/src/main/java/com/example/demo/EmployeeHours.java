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
public class EmployeeHours {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String soeid;
	private String team;
	private String hours;
	private String oppm;
	
	EmployeeHours(){}
	
	EmployeeHours(String soeid,String oppm,String hours,String team){
		this.soeid = soeid;
		this.oppm = oppm;
		this.hours = hours;
		this.team = team;
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
	public String getOppm() {
		return oppm;
	}
	public void setOppm(String oppm) {
		this.oppm = oppm;
	}
	
}
