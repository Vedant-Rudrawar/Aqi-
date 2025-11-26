package service;

import model.AqiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AqiService {

    private static final Logger log = LoggerFactory.getLogger(AqiService.class);

    @Value("${aqi.api.token:b70f6e028f475f421c345510d20582f60e69dc7c}")
    private String apiToken;

    @Value("${aqi.api.url:https://api.waqi.info/feed}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public AqiService() {
        this.restTemplate = new RestTemplate();
    }

    @Cacheable(value = "aqiCache", key = "#city.toLowerCase()")
    public AqiResponse getAqiByCity(String city) {
        log.info("Fetching AQI data for city: {}", city);
        
        try {
            String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/" + city + "/")
                    .queryParam("token", apiToken)
                    .encode()
                    .toUriString();

            log.info("API URL: {}", url.replace(apiToken, "***"));
            
            // This will work with the new flexible model
            ResponseEntity<AqiResponse> response = restTemplate.getForEntity(url, AqiResponse.class);
            AqiResponse aqiResponse = response.getBody();
            
            if (aqiResponse != null && "ok".equals(aqiResponse.getStatus())) {
                log.info("Successfully fetched AQI for {}: {}", city, aqiResponse.getProperties());
                return aqiResponse;
            } else {
                throw new RuntimeException("API returned error status for city: " + city);
            }
            
        } catch (Exception e) {
            log.error("Error fetching AQI data for {}: {}", city, e.getMessage(), e);
            throw new RuntimeException("Error fetching AQI data: " + e.getMessage());
        }
    }
}