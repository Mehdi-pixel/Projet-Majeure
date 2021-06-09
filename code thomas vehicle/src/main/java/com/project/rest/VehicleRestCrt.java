package com.project.rest;

import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDto;
import com.project.service.VehicleService;

@RestController
public class VehicleRestCrt {
	
	@Autowired
	VehicleService vehicleService;
	
	@RequestMapping(method=RequestMethod.GET,value="/getfirelist")
	public FireDto[] paramFire() throws MalformedURLException{
		return vehicleService.getListFire();
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/updatefirerepo")
	public void updatedFireList() throws MalformedURLException {
		vehicleService.updateFire();
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/getfirerepo")
	public Object[] getFireRep() throws MalformedURLException {
		Object[] f = vehicleService.getAllFire();
		//affichage de tous les vehicules
		System.out.println("Début affichage feux:");
		for(int i=0;i<f.length;i++) {
			System.out.println(f[i]);
		}
		System.out.println("Fin affichage feux.");
		return f;
	}
	
	//ajout de vehicule
	@RequestMapping(method=RequestMethod.POST,value="/vehicle")
	public void addVehicle(@RequestBody VehicleDto vehicle) throws MalformedURLException {
		vehicleService.addVehicle(vehicle);
		System.out.println("Vehicle created successfully.");
	}
	
	//liste de tous les vehicules
	@RequestMapping(method=RequestMethod.GET,value="/vehicle")
	public Object[] getAllVehicles() throws MalformedURLException {
		Object[] v = vehicleService.getAllVehicles();
		//affichage de tous les vehicules
		System.out.println("Début affichage véhicules:");
		for(int i=0;i<v.length;i++) {
			System.out.println(v[i]);
		}
		System.out.println("Fin affichage véhicules.");
		return v;
	}
	
	//get un vehicule par son id
	@RequestMapping(method=RequestMethod.GET,value="/vehicle/{id}")
	public VehicleDto getVehicle(@PathVariable String id) {
		VehicleDto v = vehicleService.getVehicle(Integer.valueOf(id));
		System.out.println(v);
        return v;
	}
	
	//on modifie un vehicule 
	@RequestMapping(method=RequestMethod.PUT,value="/vehicle/{id}")
	public void modifVehicle(@RequestBody VehicleDto newVehicle, @PathVariable String id) throws MalformedURLException {
		VehicleDto oldVehicle = vehicleService.getVehicle(Integer.valueOf(id));
		newVehicle.setId(oldVehicle.getId());
		newVehicle.setIdRemote(oldVehicle.getIdRemote());
		vehicleService.modifVehicle(newVehicle);
		System.out.println("Vehicle modified successfully.");
	}
	
	//on delete un vehicule 
	@RequestMapping(method=RequestMethod.DELETE,value="/vehicle/{id}")
	public void deleteVehicle(@PathVariable String id) throws MalformedURLException {
		VehicleDto v = vehicleService.getVehicle(Integer.valueOf(id));
		vehicleService.deleteVehicle(v);
		System.out.println("Vehicle deleted successfully.");
	}
	
	//envoie d'un vehicule vers un feu
	@RequestMapping(method=RequestMethod.GET,value="/launchvehicle")
	public void launchVehicle(@RequestParam double latFeu, @RequestParam double lonFeu) throws MalformedURLException {
		Object[] v = vehicleService.getAllVehicles();
		VehicleDto vdispo = null;
		
		for(int i=0;i<v.length;i++){
			if (((VehicleDto) v[i]).isDisponible() && ((VehicleDto) v[i]).getFuel()>=0) {
				vdispo = (VehicleDto) v[i];
				break;
			}
		}
		
		vehicleService.launchVehicle(vdispo, latFeu, lonFeu);
		System.out.println("Vehicle deployed.");
	}
	
	@RequestMapping(method=RequestMethod.GET,value="/stopdisplay")
	public void stopDisplay() {
		vehicleService.stopDisplay();
	}
	//Request pour le fire Simulator
	/*@RequestMapping(method=RequestMethod.GET,value="/addvehicleSimulator")
	public void () {
		
	}*/
	
}
