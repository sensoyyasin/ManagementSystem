package me.sensoyyasin.jwtbackend.services;

import me.sensoyyasin.jwtbackend.configs.AdminConfiguration;
import me.sensoyyasin.jwtbackend.dtos.LoginUserDto;
import me.sensoyyasin.jwtbackend.dtos.RegisterUserDto;
import me.sensoyyasin.jwtbackend.entities.Roles;
import me.sensoyyasin.jwtbackend.entities.User;
import me.sensoyyasin.jwtbackend.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AdminConfiguration adminConfiguration;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            AdminConfiguration adminConfiguration) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.adminConfiguration = adminConfiguration;
    }

    public User signup(RegisterUserDto input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setFullName(input.getFullName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        Set<Roles> roles = new HashSet<>();

        if (input.getEmail().equals(adminConfiguration.getAdminEmail()) &&
                input.getPassword().equals(adminConfiguration.getAdminPassword())) {
            roles.add(Roles.ROLE_ADMIN);
        } else {
            roles.add(Roles.ROLE_USER);
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + input.getEmail()));
    }
}