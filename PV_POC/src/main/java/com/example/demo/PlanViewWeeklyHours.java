/**
 * 
 */
package com.example.demo;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @author USER
 *
 */
@Entity
public class PlanViewWeeklyHours {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String soeid;
	private String team;
	private String hours;
	private String oppm;
	private String selectedWeekEnd;
	private boolean isSubmitted;
	
	PlanViewWeeklyHours(){}
	
	PlanViewWeeklyHours(String soeid,String oppm,String hours,String team,String selectedWeekEnd,boolean isSubmitted){
		this.soeid = soeid;
		this.oppm = oppm;
		this.hours = hours;
		this.team = team;
		this.selectedWeekEnd = selectedWeekEnd;
		this.isSubmitted = isSubmitted;
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
	public String getSelectedWeekEnd() {
		return selectedWeekEnd;
	}
	public void setSelectedWeekEnd(String selectedWeekEnd) {
		this.selectedWeekEnd = selectedWeekEnd;
	}
	public boolean isSubmitted() {
		return isSubmitted;
	}
	public void setSubmitted(boolean isSubmitted) {
		this.isSubmitted = isSubmitted;
	}
	
	@Override
    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof PlanViewWeekly)) {
            return false;
        }
        PlanViewWeekly pv = (PlanViewWeekly) o;
        return Objects.equals(oppm, pv.getOppm()) &&
                Objects.equals(soeid, pv.getSoeid());
    }

    @Override
    public int hashCode() {
        return Objects.hash(oppm, soeid);
    }
	
}
