//package com.stepIn.demo.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.stepIn.demo.model.Program;
//import com.stepIn.demo.model.User;
//@Repository
//public interface UserProgramRepository extends JpaRepository<UserProgram, Integer> {
//
//    @Modifying
//    @Query("DELETE FROM UserProgram up WHERE up.program.id = :programId")
//    void deleteByProgramId(@Param("programId") Integer programId);
//}
