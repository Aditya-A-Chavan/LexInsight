package com.levelup.lexinsight.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, String> backendStatus() {
        return Map.of("success", "BackendRunning");
    }
}
