package YNprojects.NotesApp.controller;

import YNprojects.NotesApp.Services.NotesService;
import YNprojects.NotesApp.dto.NoteDto;
import YNprojects.NotesApp.repository.NotesRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notes")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class NotesController {
    private NotesService notesService;

    @PostMapping
    public ResponseEntity<NoteDto> createNote(@RequestBody NoteDto noteDto) {
        NoteDto savedNoteDto = notesService.createNote(noteDto);
        return ResponseEntity.ok(savedNoteDto);
    }

    @GetMapping
    public ResponseEntity<List<NoteDto>> getNotes() {
        List<NoteDto> noteDtos = notesService.getAllNotes();
        return ResponseEntity.ok(noteDtos);
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<NoteDto> getNote(@PathVariable Long noteId) {
        System.out.println("the right controller method.\nNote Id: " + noteId);
        NoteDto noteDto = notesService.getNoteById(noteId);
        System.out.println("retrieved note :"+noteDto);
        return ResponseEntity.ok(noteDto);
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable Long noteId, @RequestBody NoteDto noteDto) {
        NoteDto savedNoteDto = notesService.updateNote(noteId, noteDto);
        return ResponseEntity.ok(savedNoteDto);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
        notesService.deleteNoteById(noteId);
        return ResponseEntity.ok("Note deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<NoteDto>> searchNote(@RequestParam String keyword) {
        List<NoteDto> result = notesService.findByKeyword(keyword);
        return ResponseEntity.ok(result);
    }

}
