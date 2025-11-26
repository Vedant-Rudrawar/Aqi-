package model;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import java.util.LinkedHashMap;
import java.util.Map;

public class AqiResponse {
    private Map<String, Object> properties = new LinkedHashMap<>();
    
    @JsonAnySetter
    public void setProperty(String key, Object value) {
        properties.put(key, value);
    }
    
    public Map<String, Object> getProperties() {
        return properties;
    }
    
    public Object get(String key) {
        return properties.get(key);
    }
    
    public String getStatus() {
        return properties.get("status") != null ? properties.get("status").toString() : null;
    }
    
    public Object getData() {
        return properties.get("data");
    }
}