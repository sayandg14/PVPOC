/**
 * 
 */
package com.example.demo;

/**
 * @author USER
 *
 */
public class Team {
	private String teamId;
	private String teamName;
	
	Team(String teamId,String teamName) {
		this.teamId = teamId;
		this.teamName = teamName;
	}
	public String getTeamId() {
		return teamId;
	}
	public void setTeamId(String teamId) {
		this.teamId = teamId;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
}
