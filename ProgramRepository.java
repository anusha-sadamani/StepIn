package com.stepIn.demo.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stepIn.demo.model.Program;

public interface ProgramRepository extends JpaRepository<Program,Integer>{
	List<Program> findByIsConductedTrue(); // Fetch only conducted programs
}
