package YNprojects.NotesApp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NoteDto {
    private Long id;
    private String title;
    private String content;
}
