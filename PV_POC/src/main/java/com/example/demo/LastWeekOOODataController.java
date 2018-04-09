/**
 * 
 */
package com.example.demo;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.LastWeekRepository;

/**
 * @author USER
 *
 */
@RestController
@CrossOrigin
@RequestMapping("/lastWeekOOOData")
public class LastWeekOOODataController {

	@Autowired
	EmployeeRepository empRepo;
	
	@Autowired
	LastWeekRepository lastWeekRepo;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<LastWeekOOODTO> getLastWeekOOOData(){
		LocalDate localDate = LocalDate.now();
		localDate = localDate.with(TemporalAdjusters.previous(DayOfWeek.SUNDAY));
		List<LastWeekOOO> lastWeekOOODTOs = lastWeekRepo.findByWeekEnd(localDate.toString());
		System.out.println("lastWeekOOODTOs size :"+lastWeekOOODTOs.size());
		if(lastWeekOOODTOs.size() == 0) {
			Iterable<Employee> allEmployees = empRepo.findAll();
			List<LastWeekOOODTO> lwdatas = new ArrayList<LastWeekOOODTO>();
			for(Employee emp:allEmployees){
				LastWeekOOODTO lwdata = new LastWeekOOODTO();
				lwdata.setSoeid(emp.getSoeid());
				lwdata.setFirstName(emp.getFirstName());
				lwdata.setLastName(emp.getLastName());
				lwdata.setWeekEnd(localDate.toString());
				lwdata.setHoursFilled("0");
				lwdata.setLastWeekOoo("0");
				lwdatas.add(lwdata);
			}
			return lwdatas;
		} else {
			List<LastWeekOOODTO> lwdatas = new ArrayList<LastWeekOOODTO>();
			for(LastWeekOOO lastWeekOOODTO:lastWeekOOODTOs) {
				LastWeekOOODTO lwdata = new LastWeekOOODTO();
				lwdata.setFirstName(lwdata.getFirstName());
				lwdata.setLastName(lwdata.getLastName());
				lwdata.setSoeid(lwdata.getSoeid());
				lwdata.setHoursFilled(lwdata.getHoursFilled());
				lwdata.setWeekEnd(lwdata.getWeekEnd());
				lwdatas.add(lwdata);
			}
			return lwdatas;
		}
		
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@Transactional
	public boolean saveLastWeekData(@RequestBody LastWeekOOOData lastWeekOOODatas){
		System.out.println("lastWeekOOODatas siz : "+lastWeekOOODatas.getLastWeekOOODTOs().size());
		for(LastWeekOOODTO lastWeekOOODTO:lastWeekOOODatas.getLastWeekOOODTOs()) {
			LastWeekOOO lastWeekOOO = new LastWeekOOO();
			lastWeekOOO.setHoursFilled(lastWeekOOODTO.getHoursFilled());
			lastWeekOOO.setSoeid(lastWeekOOODTO.getSoeid());
			lastWeekOOO.setWeekEnd(lastWeekOOODTO.getWeekEnd());
			lastWeekRepo.removeByWeekEndAndSoeid(lastWeekOOO.getWeekEnd(), lastWeekOOO.getSoeid());
			lastWeekRepo.save(lastWeekOOO);
		}
		return false;
	}
	
	
}
