package com.example.smart.VDEG.service;

import com.example.smart.VDEG.entity.ParticipantDetail;
import com.example.smart.VDEG.repository.ParticipantDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParticipantDetailService {

    @Autowired
    private ParticipantDetailRepository participantDetailRepository;

    // Create or Update
    public ParticipantDetail saveOrUpdateParticipantDetail(ParticipantDetail participantDetail) {
        return participantDetailRepository.save(participantDetail);
    }

    // Read (Get by ID)
    public Optional<ParticipantDetail> getParticipantDetailById(Long id) {
        return participantDetailRepository.findById(id);
    }


    public List<ParticipantDetail> getParticipantDetailsByActivityId(Long activityId) {
        List<Object[]> partialDetails = participantDetailRepository.findPartialParticipantDetailsByActivityId(activityId);

        // แปลง Object[] เป็น ParticipantDetail
        return partialDetails.stream().map(obj -> {
            ParticipantDetail participantDetail = new ParticipantDetail();
            participantDetail.setId((Long) obj[0]);
            participantDetail.setFirstName((String) obj[1]);
            participantDetail.setLastName((String) obj[2]);
            participantDetail.setPhoneNumber((String) obj[3]);
            participantDetail.setEmergencyContact((String) obj[4]);
            return participantDetail;
        }).collect(Collectors.toList());
    }

    // Read (Get all)
    public List<ParticipantDetail> getAllParticipantDetails() {
        return participantDetailRepository.findAll();
    }

    // Delete by ID
    public void deleteParticipantDetail(Long id) {
        participantDetailRepository.deleteById(id);
    }
}
