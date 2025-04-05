package com.levelup.lexinsight.dto;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse {
    private int status;
    private String message;
    private Map<String, Object> data;

    public ApiResponse() {
        this.data = new HashMap<>();
    }

    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.data = new HashMap<>();
    }

    public ApiResponse(int status, String message, Map<String, Object> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getData() {
        return data;
    }
    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void addData(String key, Object value) {
        this.data.put(key, value);
    }
}
