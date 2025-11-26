package controller;

import model.AqiResponse;
import service.AqiService;
import jakarta.validation.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AqiController {

    private static final Logger log = LoggerFactory.getLogger(AqiController.class);
    
    private final AqiService aqiService;

    public AqiController(AqiService aqiService) {
        this.aqiService = aqiService;
    }

    @GetMapping("/api/city/{cityName}")
    public ResponseEntity<?> getAqiByCityName(
            @PathVariable @NotBlank(message = "City name is required") String cityName) {
        
        log.info("Received AQI request for city: {}", cityName);
        
        try {
            AqiResponse aqiResponse = aqiService.getAqiByCity(cityName.trim());
            return ResponseEntity.ok(aqiResponse);
        } catch (Exception e) {
            log.error("Error processing request for city {}: {}", cityName, e.getMessage());
            return ResponseEntity.badRequest().body(
                new ErrorResponse(e.getMessage())
            );
        }
    }

    @GetMapping("/api/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AQI Service is running");
    }

    public record ErrorResponse(String error) {}
}