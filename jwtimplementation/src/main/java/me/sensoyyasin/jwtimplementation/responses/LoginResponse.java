package me.sensoyyasin.jwtimplementation.responses;

public class LoginResponse {
    private String token;
    private long expiresIn;

    // Getter ve Setter metotları
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }
}
