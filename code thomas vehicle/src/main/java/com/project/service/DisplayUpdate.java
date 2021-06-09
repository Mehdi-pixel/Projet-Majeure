package com.project.service;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.project.model.dto.FireDto;
import com.project.repository.FireRepository;

public class DisplayUpdate implements Runnable {
	
	@Autowired
	FireRepository fireRepository;
	
	protected FireDto f;
	protected FireRepository frep;
	boolean isEnd = false;

	public DisplayUpdate(FireRepository frepo) {
		this.frep = frepo;
	}

	public void updateFireRepo() {
		System.out.println("Time to update Repository");
		this.frep.deleteAll();
		String urlfire = "http://127.0.0.1:8081";//url pour communiquer avec le Fire Simulator
		//Récupération de la liste des feux à jour
		RestTemplate restTemplate = new RestTemplate();
		FireDto[] listfire =  restTemplate.getForObject(urlfire + "/fire", FireDto[].class);
		System.out.println("Connection established");
		Arrays.sort(listfire);
		//Mise à jour du repository
		for (int i=0;i<listfire.length;i++) {
			System.out.println("Time to save our fires"+" : "+listfire[i].getId());
			listfire[i].setIdRemote(listfire[i].getId());
			this.frep.save(listfire[i]);
		}	
	}
	
	@Override
	public void run() {
		while (!this.isEnd) {
			try {
				Thread.sleep(5000);
				try {
					updateFireRepo();
				}
				catch(Exception e) {}
					
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}	
	}

	public void stop() {
		this.isEnd = true;
	}

}
