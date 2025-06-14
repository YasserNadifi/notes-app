package YNprojects.NotesApp.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class UnvalidOwnershipException extends RuntimeException {
    public UnvalidOwnershipException(String message) {
        super(message);
    }
}
