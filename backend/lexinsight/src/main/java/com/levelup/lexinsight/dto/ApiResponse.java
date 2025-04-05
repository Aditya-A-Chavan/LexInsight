//SImple API RESPONSE GLOBAL

package com.levelup.lexinsight.dto;

public class ApiResponse {
    private int status;
    private String message;

    public ApiResponse() {}

    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
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
}
