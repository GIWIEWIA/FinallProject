package com.example.smart.VDEG.controller;

import com.example.smart.VDEG.entity.ParticipantDetail;
import com.example.smart.VDEG.service.ParticipantDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/participant-details")
public class ParticipantDetailController {

    @Autowired
    private ParticipantDetailService participantDetailService;

    // Create or Update ParticipantDetail
    @PostMapping
    public ResponseEntity<ParticipantDetail> createOrUpdateParticipantDetail(@RequestBody ParticipantDetail participantDetail) {
        ParticipantDetail savedDetail = participantDetailService.saveOrUpdateParticipantDetail(participantDetail);
        return ResponseEntity.ok(savedDetail);
    }

    // Get ParticipantDetail by ID
    @GetMapping("/{id}")
    public ResponseEntity<ParticipantDetail> getParticipantDetailById(@PathVariable Long id) {
        Optional<ParticipantDetail> participantDetail = participantDetailService.getParticipantDetailById(id);
        return participantDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<ParticipantDetail>> getParticipantDetailsByActivityId(@PathVariable Long activityId) {
        List<ParticipantDetail> participantDetails = participantDetailService.getParticipantDetailsByActivityId(activityId);
        return ResponseEntity.ok(participantDetails);
    }

    // Get all ParticipantDetails
    @GetMapping
    public ResponseEntity<List<ParticipantDetail>> getAllParticipantDetails() {
        List<ParticipantDetail> participantDetails = participantDetailService.getAllParticipantDetails();
        return ResponseEntity.ok(participantDetails);
    }

    // Delete ParticipantDetail by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipantDetail(@PathVariable Long id) {
        participantDetailService.deleteParticipantDetail(id);
        return ResponseEntity.noContent().build();
    }
}
