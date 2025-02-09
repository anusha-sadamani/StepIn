package com.stepIn.demo.model;

import jakarta.persistence.Column;

//import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.ManyToMany;

@Entity
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    private String date;
    private String time;
    private String venue;
    private String organizer;
    @Column(nullable = false)
    private boolean isConducted = false;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public String getOrganizer() {
		return organizer;
	}
	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}
	public boolean isConducted() {
		return isConducted;
	}
	public void setConducted(boolean isConducted) {
		this.isConducted = isConducted;
	}
	@Override
	public String toString() {
		return "Program [id=" + id + ", title=" + title + ", description=" + description + ", date=" + date + ", time="
				+ time + ", venue=" + venue + ", organizer=" + organizer + ", isConducted=" + isConducted + "]";
	}
	public Program(Integer id, String title, String description, String date, String time, String venue,
			String organizer, boolean isConducted) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.time = time;
		this.venue = venue;
		this.organizer = organizer;
		this.isConducted = isConducted;
	}
	public Program() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
