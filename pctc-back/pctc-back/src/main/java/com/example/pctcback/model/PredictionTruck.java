package com.example.pctcback.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "Prediction_truck")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PredictionTruck {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Double actual;
    private Double predict_group;
    private LocalDateTime time;

}
