package edu.baylor.open_telemetry_contest_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import edu.baylor.open_telemetry_contest_service.Contest;
import edu.baylor.open_telemetry_contest_service.repository.ContestRepository;
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;

// This annotation is able to create a span for each request,
// it is automatically added for the agent, so we don't need to add it here
// @WithSpan
@RestController
@RequestMapping("/registration")
public class RegistrationController {

    private ContestRepository repo;
    private String teamServiceUrl;

    public RegistrationController(ContestRepository repo) {
        this.repo = repo;
        this.teamServiceUrl = System.getenv("TEAM_SERVICE_URL");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody Contest contest) {
        repo.save(contest);

        RestTemplate restTemplate = new RestTemplate();

        var x = restTemplate.postForObject(teamServiceUrl, contest, Object.class);

        // Manual Instrumentation
        Tracer tracer = GlobalOpenTelemetry.getTracer("contestservice");
        Span span = tracer.spanBuilder("manual-registration").startSpan();
        // Make the span the current span
        try (Scope ignored = span.makeCurrent()) {
            span.setAttribute("newId", contest.getId());
            // In this scope, the span is the current/active span
        } finally {
            span.end();
        }
    }

}
