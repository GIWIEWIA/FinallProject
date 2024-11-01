package com.example.smart.VDEG.repository;

import com.example.smart.VDEG.entity.ParticipantDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ParticipantDetailRepository extends JpaRepository<ParticipantDetail, Long> {
    List<ParticipantDetail> findByActivity_ActivityId(Long activityId);

     @Query("SELECT p.id, p.firstName, p.lastName, p.phoneNumber, p.emergencyContact FROM ParticipantDetail p WHERE p.activity.activityId = :activityId")
    List<Object[]> findPartialParticipantDetailsByActivityId(Long activityId);
}
