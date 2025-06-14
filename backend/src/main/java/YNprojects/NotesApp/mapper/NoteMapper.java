package YNprojects.NotesApp.mapper;

import YNprojects.NotesApp.Entities.Note;
import YNprojects.NotesApp.dto.NoteDto;

public class NoteMapper {
    public static NoteDto mapToNoteDto(Note note) {
        return new NoteDto(
                note.getNote_id(),
                note.getTitle(),
                note.getContent()
        );
    }
    public static Note mapToNote(NoteDto noteDto) {
        Note note = new Note();
        note.setNote_id(noteDto.getId());
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
        return note;
    }
}
