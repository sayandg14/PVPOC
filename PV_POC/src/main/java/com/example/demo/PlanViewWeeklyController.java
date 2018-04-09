/**
 * 
 */
package com.example.demo;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.EmployeeHoursRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.PlanViewWeeklyRepository;
import com.example.demo.repository.ProjectRepository;

/**
 * @author USER
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/planViewWeekly")
public class PlanViewWeeklyController {
	
	@Autowired
	ProjectRepository projectRepo;
	@Autowired
	EmployeeRepository empRepo;
	@Autowired
	PlanViewWeeklyRepository planViewWeeklyRepo;
	@Autowired
	EmployeeHoursRepository empHourRepo;
	
	@RequestMapping("/weekEnds")
	public List<String> getWeekEnds(){
		LocalDate localDate = LocalDate.now();

        List<String> weekEnds = new ArrayList<>();
        for(int i=0;i<5;i++) {
        	localDate = localDate.with(TemporalAdjusters.previous(DayOfWeek.SUNDAY));
        }
        for(int i=0;i<7;i++) {
        	localDate = localDate.with(TemporalAdjusters.next(DayOfWeek.SUNDAY));
        	weekEnds.add(localDate.toString());
        }
        
        return weekEnds;
	}
	
	@RequestMapping(method = RequestMethod.GET,value="/{teamName}/{weekEnd}")
	public List<List<PlanViewWeekly>> getWeekAssignments(@PathVariable String teamName,@PathVariable String weekEnd){
		
		
		int yearRelease = Integer.parseInt(weekEnd.split("-")[0]);
		int monthRelease = Integer.parseInt(weekEnd.split("-")[1]);
		boolean isDisabled = false;
		List<Project> projects = (List<Project>)projectRepo.findByTeam(teamName,monthRelease,yearRelease);
		Collections.sort(projects);
		List<Employee> employees = (List<Employee>)empRepo.findByTeam(teamName);
		
		List<PlanViewWeeklyHours> existingPlanViewWeeklyList = planViewWeeklyRepo.findBySelectedWeekEnd(weekEnd);
		System.out.println("existingPlanViewWeeklyList size : "+existingPlanViewWeeklyList.size());
		if(existingPlanViewWeeklyList.size()>0 && existingPlanViewWeeklyList.get(0).isSubmitted() == true) {
			isDisabled = true;
		}
		List<List<PlanViewWeekly>> employeeHours = new ArrayList<>();
		for(int i=0;i<projects.size();i++) {
			
			/*	get assgined employees only input textbox box enabled 	*/
			List<EmployeeHours> assignedEmployees = empHourRepo.findByOppm(projects.get(i).getOppm());
			List<String> assignedEmployeesStr = new ArrayList<>();
			for(EmployeeHours empHour:assignedEmployees){
				assignedEmployeesStr.add(empHour.getSoeid());
			}
			/*	End get assgined employees only input textbox box enabled 	*/
			
			/*	Calculate Remaining hours	*/
			int alreadyFilledHours = 0;
			List<PlanViewWeeklyHours> existingPlanViewWeeklyListByOppm = 
					planViewWeeklyRepo.findByOppm(projects.get(i).getOppm());
			System.out.println("existingPlanViewWeeklyListByOppm size : "+existingPlanViewWeeklyListByOppm.size());
			for(PlanViewWeeklyHours pvByOppm:existingPlanViewWeeklyListByOppm) {
				System.out.println("pvByOppm issubmitted : "+pvByOppm.isSubmitted()+" weekend : "+pvByOppm.getSelectedWeekEnd());
				if(pvByOppm.isSubmitted() == true || pvByOppm.getSelectedWeekEnd().equals(weekEnd)) {
					alreadyFilledHours += Integer.parseInt(pvByOppm.getHours());
				}
			}
			System.out.println("alreadyFilledHours : "+alreadyFilledHours+" for OPPM : "+projects.get(i).getOppm());
			/* 	End Calculate Remaining Hours	*/
			
			List<PlanViewWeekly> empHourRow = new ArrayList<>();
			empHourRow.add(new PlanViewWeekly("",projects.get(i).getOppm(),projects.get(i).getProjectDesc(),
					projects.get(i).getpNumber(),"","","",projects.get(i).getTeam(),projects.get(i).getMonthRelease(),
					projects.get(i).getYearRelease(),isDisabled));
			for(int j=0;j<employees.size();j++){
				/*System.out.println("!assignedEmployeesStr.contains(employees.get(j).getSoeid()) : "+!assignedEmployeesStr.contains(employees.get(j).getSoeid()));
				System.out.println("soeid : "+employees.get(j).getSoeid()+" oppm : "+projects.get(i).getOppm()
						+"isDisabled : "+isDisabled);*/
				if(!assignedEmployeesStr.contains(employees.get(j).getSoeid()) || (existingPlanViewWeeklyList.size()>0 && existingPlanViewWeeklyList.get(0).isSubmitted() == true)){
					isDisabled = true;
				}
				PlanViewWeekly pvWeekly = new PlanViewWeekly(employees.get(j).getSoeid(),projects.get(i).getOppm(),
						projects.get(i).getProjectDesc(),projects.get(i).getpNumber(),"0","","",projects.get(i).getTeam(),
						projects.get(i).getMonthRelease(),projects.get(i).getYearRelease(),isDisabled);
				
				/*	Set Hours which is set and saved / submitted already	*/
				for(PlanViewWeeklyHours pvWeeklyHour:existingPlanViewWeeklyList) {
					if(pvWeeklyHour.equals(pvWeekly)) {
						/*System.out.println("Equals Object , oppm : "+pvWeeklyHour.getOppm()+" , "
								+ "soeid : "+pvWeeklyHour.getSoeid()+" , hours : "+pvWeeklyHour.getHours()+
								" isSubmitted : "+pvWeeklyHour.isSubmitted()+" totHours : "+pvWeekly.getTotHours()
								+" isDisabled : "+isDisabled);*/
						pvWeekly.setHours(pvWeeklyHour.getHours());
						break;
					}
				}
				/*	End Set Hours which is set and saved / submitted already	*/
				empHourRow.add(pvWeekly);
				isDisabled = false;
			}
			empHourRow.add(new PlanViewWeekly("","","","","",projects.get(i).getHours(),"","",0,0,true));
			empHourRow.add(new PlanViewWeekly("","","","","",projects.get(i).getHours(),String.valueOf(Integer.parseInt(projects.get(i).getHours()) - alreadyFilledHours),"",0,0,true));
			employeeHours.add(empHourRow);
		}
		
		return employeeHours;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@Transactional
	public boolean addPlanViewWeekly(@RequestBody PlanViewWeeklyData planViewWeeklyData){
		System.out.println("in post project : "+planViewWeeklyData);
		try {
			
			List<List<PlanViewWeekly>> planViewWeeklyList = (List<List<PlanViewWeekly>>)planViewWeeklyData.getPlanViewWeeklyData();
			String selectedWeekEnd = planViewWeeklyData.getSelectedWeekEnd();
			
			String action = planViewWeeklyData.getAction();
			boolean isSubmitted = false;
			if(action.equals("submit"))
				isSubmitted = true;
			planViewWeeklyRepo.removeBySelectedWeekEnd(selectedWeekEnd);
			for(List<PlanViewWeekly> planViewWeekly : planViewWeeklyList) {
				for(PlanViewWeekly planViewWeeklyObj:planViewWeekly) {
					System.out.println("soeID : "+planViewWeeklyObj.getSoeid()+" oppm : "+planViewWeeklyObj.getOppm()
							+" hours :"+planViewWeeklyObj.getHours()+" isSubmitted : "+isSubmitted);
					if(null != planViewWeeklyObj.getSoeid() && !("").equals(planViewWeeklyObj.getSoeid()) && 
							null != planViewWeeklyObj.getOppm() && !("").equals(planViewWeeklyObj.getOppm()) &&
							null != planViewWeeklyObj.getHours() && !("0").equals(planViewWeeklyObj.getHours())){
						PlanViewWeeklyHours planViewWeeklyHours = new PlanViewWeeklyHours(planViewWeeklyObj.getSoeid(),planViewWeeklyObj.getOppm(),
								planViewWeeklyObj.getHours(),planViewWeeklyObj.getTeam(),selectedWeekEnd,isSubmitted);
						
						planViewWeeklyRepo.save(planViewWeeklyHours);
					}
				}
			}
		} catch(Exception e){
			e.printStackTrace();
		}
		return true;
	}

}
