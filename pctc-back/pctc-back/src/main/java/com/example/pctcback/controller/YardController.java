package com.example.pctcback.controller;

import com.example.pctcback.model.BerthStatus;
import com.example.pctcback.model.PlannedBlock;
import com.example.pctcback.persistence.BerthStatusRepository;
import com.example.pctcback.persistence.PlannedBlockRepository;
import com.example.pctcback.service.CrawlingService;
import com.example.pctcback.service.YCOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class YardController {
    final YCOService ycoservice;
    final CrawlingService crawlingService;
    @Autowired
    BerthStatusRepository berthStatusRepository;
    @Autowired
    PlannedBlockRepository plannedBlockRepository;

    public YardController(YCOService ycoservice, CrawlingService crawlingService) {
        this.ycoservice = ycoservice;
        this.crawlingService = crawlingService;
    }

    @GetMapping("/yard")
    public ResponseEntity<?> YardStatusController(){
        String blockstr =  "1A,1B,1C,1D,1E,1F,1G,1H,1I," +
                "2A,2B,2C,2D,2E,2F,2G,2H,2I," +
                "3A,3B,3C,3D,3E,3F,3G,3H,3I,3J,3K," +
                "4A,4B,4C,4D,4E,4F,4G,4H,4I," +
                "5A,5B,5C,5D,5E,5F,5G,5H," +
                "6A,6B,6C,6D,6E,6F," +
                "7A,7B,7C,7D,7E,7F,7G," +
                "8A,8B,8C,8D,8E,8F,8G," +
                "9A,9B,9C,9D,9E,9F,9G";
        String[] blockarray = blockstr.split(",");
        List<String> blocks = Arrays.asList(blockarray);
        Map<String, Integer> block_number =  ycoservice.ConNumBlock(blocks);
        return ResponseEntity.ok().body(block_number);
    }

    @GetMapping("/init")
    public String YardInit(){
        ycoservice.myMethod("D:/SDH/TeamProject/TeamProject_PCTC/pctc-back/pctc-back/data/YardStatus.csv");
        ycoservice.CreateYCO();
        return "현재 DB 에 정보 넣는중";
    }
    @GetMapping("/port")
    public ResponseEntity<?> PortStatusController(){
        return ResponseEntity.ok().body(crawlingService.PortStatus());

    }
    @GetMapping("/api/berthStatus")
    public ResponseEntity<?> BerthStatus(){
         List<BerthStatus> berth = berthStatusRepository.findAll();

        return ResponseEntity.ok(berth);
    }
    @GetMapping("/api/emptyContainer")
    public ResponseEntity<?> emptyContainer(){
        List<Map<String,Map<String,Integer>>> emptyCon = crawlingService.getEmptyCon();
        System.out.println("emptyCon = " + emptyCon);

        return ResponseEntity.ok().body(emptyCon);


    }
    @GetMapping("/api/SCO")
    public ResponseEntity<?> scheduledContainerOperation(){
        List<PlannedBlock> scheduledContainers = plannedBlockRepository.findAll();
        Map<String, List<Integer>> SCOmap = new HashMap<>();

        for(PlannedBlock pb : scheduledContainers ){
            List<Integer> value = new ArrayList<>();
            value.add(pb.getNowYard());
            value.add(pb.getNowShip());
            value.add(pb.getOneYard());
            value.add(pb.getOneShip());
            value.add(pb.getTwoYard());
            value.add(pb.getTwoShip());
            value.add(pb.getThreeYard());
            value.add(pb.getThreeShip());
            value.add(pb.getFourYard());
            value.add(pb.getFourShip());
            value.add(pb.getFiveYard());
            value.add(pb.getFiveShip());
            SCOmap.put(pb.getBlock(),value);
        }
        return ResponseEntity.ok().body(SCOmap);


    }





}
