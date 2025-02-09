//package com.stepIn.demo.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "user_program")
//
//public class UserProgram {
//    
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "program_id", nullable = false)
//    private Program program;
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public User getUser() {
//		return user;
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
//
//	public Program getProgram() {
//		return program;
//	}
//
//	public void setProgram(Program program) {
//		this.program = program;
//	}
//
//	@Override
//	public String toString() {
//		return "UserProgram [id=" + id + ", user=" + user + ", program=" + program + "]";
//	}
//
//	public UserProgram(Long id, User user, Program program) {
//		super();
//		this.id = id;
//		this.user = user;
//		this.program = program;
//	}
//
//	public UserProgram() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//    
////    
//}
