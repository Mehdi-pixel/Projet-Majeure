package com.project.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDto;
import com.project.repository.FireRepository;
import com.project.repository.VehicleRepository;

import java.net.MalformedURLException;
import java.net.URL;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class VehicleService {
	
	@Autowired
	VehicleRepository vehicleRepository;
	@Autowired
	FireRepository fireRepository;
	
	DisplayRunnable dRunnable;
	DisplayUpdate dUpdate;
	private Thread displayThread;
	
	//Récupération de la liste de tous les incendies actuels
	public FireDto[] getListFire() throws MalformedURLException {
		URL urllistfire = new URL("http://127.0.0.1:8081");//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		FireDto[] listfire =  restTemplate.getForObject(urllistfire + "/fire", FireDto[].class);
		Arrays.sort(listfire);
		for (int i=0;i<listfire.length;i++) {
			listfire[i].setIdRemote(listfire[i].getId());
			fireRepository.save(listfire[i]);
		}
		return listfire;
	}
	
	public void UpdateFireListRepository() throws MalformedURLException {
		URL urllistfire = new URL("http://127.0.0.1:8081");//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		FireDto[] Newlistfire =  restTemplate.getForObject(urllistfire + "/fire", FireDto[].class);
		for (int i=0;i<Newlistfire.length;i++) {
			System.out.println(Newlistfire[i].getId());
			if (fireRepository.existsById(Newlistfire[i].getId())) {
				System.out.println("Le feu est déjà dans le répertoire");
			} else {
				fireRepository.save(Newlistfire[i]);
			}
		}
	}
	
	public Object[] getAllFire() throws MalformedURLException {
		final ArrayList<FireDto> listFires = new ArrayList<FireDto>();
		Iterable<FireDto> it = fireRepository.findAll();
		//on met tous les vehicules dans une seule ArrayList
		it.forEach( new Consumer<FireDto>() {
			@Override
			public void accept(FireDto element) {
			    listFires.add(element);
			}
		});
		
		Object[] l = listFires.toArray();
		return l;
	}
	
	public void launchVehicle(VehicleDto vThread, double latFeu, double lonFeu) {
		//le véhicule n'est plus disponible pour être envoyé vers un autre feu durant la durée de son déplacement sur le feu actuel
		vThread.setDisponible(false);
		vehicleRepository.save(vThread);
		
		//Create a Runnable is charge of executing cyclic actions
		this.dRunnable=new DisplayRunnable(vThread, vehicleRepository, latFeu, lonFeu);
		
		// A Runnable is held by a Thread which manage lifecycle of the Runnable
		displayThread=new Thread(dRunnable);
		
		// The Thread is started and the method run() of the associated DisplayRunnable is launch
		displayThread.start();
	}
	
	public void updateFire() {
		//Create a Runnable is charge of executing cyclic actions
		this.dUpdate=new DisplayUpdate(fireRepository);
				
		// A Runnable is held by a Thread which manage lifecycle of the Runnable
		displayThread=new Thread(dUpdate);
				
		// The Thread is started and the method run() of the associated DisplayRunnable is launch
		displayThread.start();
	}
	
	public void stopDisplay() {
		//Calls the user defined stop method of the runnable
		this.dRunnable.stop();
		try {
			//forces the thread to stop
			this.displayThread.join(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	public void addVehicle(VehicleDto v) throws MalformedURLException {
		v.setDisponible(true);
		String urlvehicle = "http://127.0.0.1:8081/vehicle";//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<VehicleDto> request = new HttpEntity<>(v);
		ResponseEntity<VehicleDto> response = restTemplate.exchange(urlvehicle, HttpMethod.POST, request, VehicleDto.class);
		v.setIdRemote(response.getBody().getId());
		vehicleRepository.save(v);
	}
	
	public void modifVehicle(VehicleDto v) throws MalformedURLException {
		vehicleRepository.save(v);
		v.setId(v.getIdRemote());
		String urlvehicle = "http://127.0.0.1:8081/vehicle/"+v.getId();//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<VehicleDto> request = new HttpEntity<>(v);
		restTemplate.exchange(urlvehicle, HttpMethod.PUT, request, Boolean.class);
	}
	
	public Object[] getAllVehicles() throws MalformedURLException {
		
		final ArrayList<VehicleDto> listVehicles = new ArrayList<VehicleDto>();
		Iterable<VehicleDto> it = vehicleRepository.findAll();
		//on met tous les vehicules dans une seule ArrayList
		it.forEach( new Consumer<VehicleDto>() {
			@Override
			public void accept(VehicleDto element) {
			    listVehicles.add(element);
			}
		});
		
		Object[] l = listVehicles.toArray();
		return l;
	}
	
	public VehicleDto getVehicle(int id) {
		Optional<VehicleDto> v = vehicleRepository.findById(id);
		return v.get();
	}
	
	public void deleteVehicle(VehicleDto v) throws MalformedURLException {
		String urlvehicle = "http://127.0.0.1:8081/vehicle/"+v.getIdRemote();//url pour communiquer avec le Fire Simulator
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<VehicleDto> request = new HttpEntity<>(v);
		try {
			restTemplate.exchange(urlvehicle, HttpMethod.DELETE, request, Boolean.class);	
		}catch(Exception e){
			System.out.println("Erreur:Véhicule déjà supprimé de Fire Simulator.");
		}
		vehicleRepository.delete(v);
	}
	
}
