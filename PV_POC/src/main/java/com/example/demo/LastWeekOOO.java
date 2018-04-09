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
public class LastWeekOOO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String soeid;
	private String weekEnd;
	private String hoursFilled;
	
	LastWeekOOO(){}
	
	public String getSoeid() {
		return soeid;
	}
	public void setSoeid(String soeid) {
		this.soeid = soeid;
	}
	public String getWeekEnd() {
		return weekEnd;
	}
	public void setWeekEnd(String weekEnd) {
		this.weekEnd = weekEnd;
	}
	public String getHoursFilled() {
		return hoursFilled;
	}
	public void setHoursFilled(String hoursFilled) {
		this.hoursFilled = hoursFilled;
	}
}
