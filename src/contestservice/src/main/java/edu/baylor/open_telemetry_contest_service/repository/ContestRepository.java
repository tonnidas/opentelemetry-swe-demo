package edu.baylor.open_telemetry_contest_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.baylor.open_telemetry_contest_service.Contest;

public interface ContestRepository extends JpaRepository<Contest, Long> {

}
