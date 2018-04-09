/**
 * 
 */
package com.example.demo;

import java.util.List;

/**
 * @author USER
 *
 */
public class PlanViewWeeklyData {
	private List<List<PlanViewWeekly>> planViewWeeklyData;
	private String selectedWeekEnd;
	private String action;

	public List<List<PlanViewWeekly>> getPlanViewWeeklyData() {
		return planViewWeeklyData;
	}
	public void setPlanViewWeeklyData(List<List<PlanViewWeekly>> planViewWeeklyData) {
		this.planViewWeeklyData = planViewWeeklyData;
	}
	public String getSelectedWeekEnd() {
		return selectedWeekEnd;
	}
	public void setSelectedWeekEnd(String selectedWeekEnd) {
		this.selectedWeekEnd = selectedWeekEnd;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
}
