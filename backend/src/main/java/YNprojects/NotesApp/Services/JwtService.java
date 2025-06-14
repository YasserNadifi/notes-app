package YNprojects.NotesApp.Services;

import YNprojects.NotesApp.Entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    public final String SECRET_KEY="3fa0810a85f348ca1a81280e68fa74f0b41480dc4de9fb7c27416bc9398a24ca64d50e380fa04936b8770af6f84554a161d274a751adf40b6d590fc7b25934dafc0289a51a267bde2c64323b472b69b8da136abcf24c0e3ec93a7243f6c4b6c43bf45b61203b81e748b2d70192fe609d13a9bf386e13377ed3fdd3b45ee31820f122534e89c0e0761f83e162b8cc2be2e688385f058d32d0b0f9a7de9fa598c944a385423ce99ac03435677e0b93fa0ed0d63dffcf43e1e95af32ee518ec1926e0027ec54199a9d17cf4a84a26f3f956ca722228f68e53a455cce01e55af81ad6aafb0ec6ace663b47562493bb18580a887d1aabc141c32ec320d97856ef90bb";

    public boolean isValid(String token, UserDetails user) {
        String username=extractUsername(token) ;
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    };

    public String generateToken(User user) {
        String token = Jwts
                .builder()
                .subject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ (24 * 60 * 60 * 1000)) )
                .signWith(getSigningKey())
                .compact();
        return token;

    }

    private SecretKey getSigningKey() {
        // if SECRET_KEY is plain text
//        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);

        // if SECRET_KEY is Base64-encoded
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}
