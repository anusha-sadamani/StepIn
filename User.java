package com.stepIn.demo.model;

import java.util.List;


import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fullname;
    private String lastname;
    private String batch;
    private String course;
    private String email;
    private String PhNo;
    private String role;
    private String position;
    private String password;

    @ManyToMany
    @JoinTable(
        name = "user_programs",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "program_id")
    )
    private List<Program> joinedPrograms;

    @ElementCollection
    private List<String> skills;  // Store multiple skills here

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhNo() {
        return PhNo;
    }

    public void setPhNo(String phNo) {
        PhNo = phNo;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Program> getJoinedPrograms() {
        return joinedPrograms;
    }

    public void setJoinedPrograms(List<Program> joinedPrograms) {
        this.joinedPrograms = joinedPrograms;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", fullname=" + fullname + ", lastname=" + lastname + ", batch=" + batch + ", course="
                + course + ", email=" + email + ", PhNo=" + PhNo + ", role=" + role + ", position=" + position
                + ", password=" + password + ", joinedPrograms=" + joinedPrograms + ", skills=" + skills + "]";
    }

    public User(int id, String fullname, String lastname, String batch, String course, String email, String phNo,
                String role, String position, String password, List<Program> joinedPrograms, List<String> skills) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.lastname = lastname;
        this.batch = batch;
        this.course = course;
        this.email = email;
        PhNo = phNo;
        this.role = role;
        this.position = position;
        this.password = password;
        this.joinedPrograms = joinedPrograms;
        this.skills = skills;
    }

    public User() {
        super();
    }
}
