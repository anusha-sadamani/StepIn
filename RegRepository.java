package com.stepIn.demo.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.stepIn.demo.model.User;

import jakarta.transaction.Transactional;

@Repository
public interface RegRepository  extends JpaRepository<User,Integer> {
	Optional<User> findByEmail(String email);
	@Query(value = "SELECT u.* FROM user u JOIN user_programs up ON u.id = up.user_id WHERE up.program_id = :programId", nativeQuery = true)
	List<User> findUsersByProgramId(@Param("programId") int programId);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_programs WHERE program_id = :programId", nativeQuery = true)
    void removeProgramReferences(@Param("programId") Integer programId);
}

