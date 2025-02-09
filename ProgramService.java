package com.stepIn.demo.service;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stepIn.demo.model.Program;
import com.stepIn.demo.model.User;
//import com.stepIn.demo.model.UserProgram;
import com.stepIn.demo.repository.ProgramRepository;
import com.stepIn.demo.repository.RegRepository;

import jakarta.transaction.Transactional;
@Service
public class ProgramService {

    @Autowired
    private RegRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

//    @Autowired
//   private UserProgramRepository userProgramRepository;
//
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Program getProgramById(Integer id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public Program updateProgram(Integer id, Program programDetails) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));

        program.setTitle(programDetails.getTitle());
        program.setDescription(programDetails.getDescription());
        program.setDate(programDetails.getDate());
        program.setTime(programDetails.getTime());
        program.setVenue(programDetails.getVenue());
        program.setOrganizer(programDetails.getOrganizer());

        return programRepository.save(program);
    }
    
    public String joinProgram(Integer userId, Integer programId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + programId));

        // Check if the program is conducted
        if (program.isConducted()) {
            return "Program has already been conducted";
        }

        List<Program> userPrograms = user.getJoinedPrograms();

        if (userPrograms == null) {
            userPrograms = new ArrayList<>();
            userPrograms.add(program);
        } else {
            for (Program prgs : userPrograms) {
                if (prgs.getId() == programId) {
                    return "Already joined this program";
                }
            }
            userPrograms.add(program);
        }

        user.setJoinedPrograms(userPrograms);
        userRepository.save(user);

        return "Successfully joined the program";
    }
    
    
    public Program getProgramById(int id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
    }
    

    @Transactional
    public void deleteProgram(Integer id) {
        // Ensure the program exists
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));

        // Remove the program reference from users (deleting from user_programs)
        userRepository.removeProgramReferences(id);

        // Now delete the program itself
        programRepository.delete(program);
    }
    
    public void markProgramAsConducted(Integer id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));

        program.setConducted(true); // Mark as conducted
        programRepository.save(program); // Save the change
    }

    public List<Program> getConductedPrograms() {
        return programRepository.findByIsConductedTrue();
    }

}
