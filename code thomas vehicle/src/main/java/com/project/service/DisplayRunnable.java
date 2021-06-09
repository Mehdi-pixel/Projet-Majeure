package com.project.service;

import java.net.MalformedURLException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.project.model.dto.VehicleDto;
import com.project.repository.VehicleRepository;

public class DisplayRunnable implements Runnable {
	
	@Autowired
	VehicleRepository vehicleRepository;
	
	protected VehicleDto v;
	protected VehicleRepository vrep;
	private double fireLat;
	private double fireLon;
	boolean isEnd = false;

	public DisplayRunnable(VehicleDto vThread, VehicleRepository vrepo, double LatFeu, double LonFeu) {
		this.v = vThread;
		this.vrep = vrepo;
		this.fireLat = LatFeu;
		this.fireLon = LonFeu;
	}

	public void updateCoord() {
		vrep.save(v);
		v.setId(v.getIdRemote());
		String urlvehicle = "http://127.0.0.1:8081/vehicle/"+v.getIdRemote();//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<VehicleDto> request = new HttpEntity<>(v);
		restTemplate.exchange(urlvehicle, HttpMethod.PUT, request, VehicleDto.class);
	}
	
	@Override
	public void run() {
		while (!this.isEnd) {
			try {
				Thread.sleep(5000);
				
				//simulation de consommation du vehicule
				fuelConsumption();
				
				//simulation de deplacement du vehicule
				if (!this.isEnd) {
					deplacement();
				}
				
				try {
					updateCoord();
				}
				catch(Exception e) {}
					
				//affichage du vehicule (de ses données)
				System.out.println(v.toString());
				System.out.println("");
				/*
				try {
					modifVehicle(v);
				} catch (MalformedURLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("en cours: "+v);
				*/
				
				//si le vehicule est arrivé à destination on arrête le thread
				if((v.getLat()==this.fireLat) && (v.getLon()==this.fireLon)) {
					stop();
				}
				
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("Véhicule n°"+v.getId()+" a terminé son déplacement.");
		v.setDisponible(true);
		v.setFuel(100.0f);
		try {
			System.out.println("modif finale + "+v.isDisponible());
			modifVehicle(v);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("fin: "+v);		
	}

	public void stop() {
		this.isEnd = true;
	}
	
	public void deplacement() {
		//latitude vehicule dans un radius de 0.03 du feu
		System.out.println(v.getLat()+" "+v.getLon());
		
		if(Math.abs(v.getLat()-this.fireLat) <= 0.03) {
			v.setLat(this.fireLat);
		}
		else if (fireLat>0) {
			if ((v.getLat()>0) && (v.getLat()>fireLat)) {
				v.setLat(v.getLat()-0.03);
			}
			else if ((v.getLat()>0) && (v.getLat()<fireLat)){
				v.setLat(v.getLat()+0.03);
			}
			else {
				v.setLat(v.getLat()+0.03);
			}
		}
		else {
			if ((v.getLat()<0) && (v.getLat()<fireLat)) {
				v.setLat(v.getLat()+0.03);
			}
			else if ((v.getLat()<0) && (v.getLat()>fireLat)){
				v.setLat(v.getLat()-0.03);
			}
			else {
				v.setLat(v.getLat()-0.03);
			}
		}
		
		//longitude vehicule dans un radius de 0.03 du feu
		if(Math.abs(v.getLon()-this.fireLon) <= 0.03) {
			v.setLon(this.fireLon);
		}
		else if (fireLon>0) {
			if ((v.getLon()>0) && (v.getLon()>fireLon)) {
				v.setLon(v.getLon()-0.03);
			}
			else if ((v.getLon()>0) && (v.getLon()<fireLon)){
				v.setLon(v.getLon()+0.03);
			}
			else {
				v.setLon(v.getLon()+0.03);
			}
		}
		else {
			if ((v.getLon()<0) && (v.getLon()<fireLon)) {
				v.setLon(v.getLon()+0.03);
			}
			else if ((v.getLon()<0) && (v.getLon()>fireLon)){
				v.setLon(v.getLon()-0.03);
			}
			else {
				v.setLon(v.getLon()-0.03);
			}
		}	
	}
	
	public void fuelConsumption() {
		if (v.getFuel() <= 0) {
			stop();
			System.out.println("Véhicule n°"+v.getId()+" n'a plus de fuel.");
			return;
		}
		v.setFuel(v.getFuel()-v.getFuelConsumption());
	}
	
	public void modifVehicle(VehicleDto v) throws MalformedURLException {
		v.setId(v.getIdRemote());
		String urlvehicle = "http://127.0.0.1:8081/vehicle/"+v.getId();//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<VehicleDto> request = new HttpEntity<>(v);
		restTemplate.exchange(urlvehicle, HttpMethod.PUT, request, Boolean.class);
	}
	
	public VehicleDto getVehicle(int id) {
		Optional<VehicleDto> v = vehicleRepository.findById(id);
		return v.get();
	}

}
