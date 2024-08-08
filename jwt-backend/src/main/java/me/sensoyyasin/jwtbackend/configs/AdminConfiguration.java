package me.sensoyyasin.jwtbackend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminConfiguration {

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    public String getAdminEmail() {
        return adminEmail;
    }

    public String getAdminPassword() {
        return adminPassword;
    }
}