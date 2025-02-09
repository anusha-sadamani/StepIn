package com.stepIn.demo.controller;

import java.util.List;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stepIn.demo.model.Program;

import com.stepIn.demo.service.ProgramService;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
@RestController
@RequestMapping("/api/programs") // Base URL for all program-related endpoints
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @GetMapping
    public List<Program> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable Integer id) {
        Program program = programService.getProgramById(id);
        return ResponseEntity.ok(program);
    }

    @PostMapping
    public Program createProgram(@RequestBody Program program) {
        return programService.createProgram(program);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Program> updateProgram(@PathVariable Integer id, @RequestBody Program programDetails) {
        Program updatedProgram = programService.updateProgram(id, programDetails);
        return ResponseEntity.ok(updatedProgram);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProgram(@PathVariable Integer id) {
        programService.deleteProgram(id);
        return ResponseEntity.ok("Program and related enrollments deleted successfully!");
    }


    @PostMapping("/join")  
    public ResponseEntity<String> joinProgram(@RequestBody Map<String, Integer> requestBody) {
    	//System.out.print("Inside Join");
        Integer userId = requestBody.get("userId");
        Integer programId = requestBody.get("programId");
        
        if (userId == null || programId == null) {
            return ResponseEntity.badRequest().body("User ID and Program ID are required");
        }

        String result = programService.joinProgram(userId, programId);
        System.out.print(result);
        return ResponseEntity.ok(result);
    	
  }

    // Mark a program as conducted
    @PutMapping("/{id}/conducted")
    public ResponseEntity<String> markAsConducted(@PathVariable Integer id) {
        programService.markProgramAsConducted(id);
        return ResponseEntity.ok("Program marked as conducted successfully!");
    }

    // Get all conducted programs
    @GetMapping("/conducted")
    public ResponseEntity<List<Program>> getConductedPrograms() {
        return ResponseEntity.ok(programService.getConductedPrograms());
    }
    
      
    }
