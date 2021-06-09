package com.project.model.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class FireDto implements Comparable<FireDto>{
	@Id
	@GeneratedValue
	private Integer id;
	private Integer idRemote;
	private String type;
	private float intensity;
	private float range;
	private double lon;
	private double lat;

	public FireDto() {
	}
	
	//Voir si possiblité de modifier le modèle afin d'impélémenter CompareTo ou Compare
	//Préférable d'utiliser CompareTo
	public FireDto(Integer id, String type, float intensity, float range, double lon, double lat) {
		super();
		this.id = id;
		this.type = type;
		this.intensity = intensity;
		this.range = range;
		this.lon = lon;
		this.lat = lat;
	}
	
	@Override
    public int compareTo(FireDto comparefire) {
        return this.id-comparefire.id;
    }
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public float getIntensity() {
		return intensity;
	}
	public void setIntensity(float intensity) {
		this.intensity = intensity;
	}
	public float getRange() {
		return range;
	}
	public void setRange(float range) {
		this.range = range;
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public Integer getIdRemote() {
		return idRemote;
	}

	public void setIdRemote(Integer idRemote) {
		this.idRemote = idRemote;
	}
}
