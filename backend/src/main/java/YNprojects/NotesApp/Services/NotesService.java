package YNprojects.NotesApp.Services;

import YNprojects.NotesApp.Entities.Note;
import YNprojects.NotesApp.Entities.User;
import YNprojects.NotesApp.Exception.ResourceNotFound;
import YNprojects.NotesApp.Exception.UnvalidOwnershipException;
import YNprojects.NotesApp.dto.NoteDto;
import YNprojects.NotesApp.mapper.NoteMapper;
import YNprojects.NotesApp.repository.NotesRepo;
import YNprojects.NotesApp.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class NotesService {

    private final UserRepo userRepo;
    NotesRepo notesRepo;

    public NoteDto createNote(NoteDto noteDto) {
        Note note = NoteMapper.mapToNote(noteDto);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        user.addNote(note);
        Note savedNote = notesRepo.save(note);
        return NoteMapper.mapToNoteDto(savedNote);
    }

    public List<NoteDto> getAllNotes() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        List<Note> notes = user.getNotes();
        List<NoteDto> noteDtos = new ArrayList<>();
        notes.forEach(note -> noteDtos.add(NoteMapper.mapToNoteDto(note)));
        return noteDtos;
    }

    public NoteDto getNoteById(long noteId) {
        System.out.println("getNoteById service method : 1");
        Note note = notesRepo.findById(noteId)
                .orElseThrow(()->new ResourceNotFound("Note not found : NoteId = " + noteId));
        System.out.println("getNoteById service method : 2");
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("getNoteById service method : 3");
        User user = userRepo.findByUsername(username).orElseThrow();
        System.out.println("getNoteById service method : 4");
        validateOwnership(note,user);
        System.out.println("getNoteById service method : 5");
        return NoteMapper.mapToNoteDto(note);
    }

    private void validateOwnership(  Note note, User user) {
        if(!note.getUser().getUsername().equals(user.getUsername())){
            throw new UnvalidOwnershipException("you don't own this note. NoteId = "+note.getNote_id());
        }
    }

    public NoteDto updateNote(Long noteId, NoteDto newNoteDto) {
        Note note = notesRepo.findById(noteId)
                .orElseThrow(()->new ResourceNotFound("Note not found : NoteId = " + noteId));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        validateOwnership(note,user);

        note.setTitle(newNoteDto.getTitle());
        note.setContent(newNoteDto.getContent());
        Note updatedNote = notesRepo.save(note);
        return NoteMapper.mapToNoteDto(updatedNote);
    }

    public void deleteNoteById(long noteId) {
        Note note = notesRepo.findById(noteId)
                .orElseThrow(()->new ResourceNotFound("Note not found : NoteId = " + noteId));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        validateOwnership(note,user);

        notesRepo.deleteById(noteId);
    }

    public List<NoteDto> findByKeyword(String keyword) {
        List<Note> result = notesRepo.findByKeyword(keyword);
        if(result.size() == 0){
            System.out.println("result is empty");
        } else {
            System.out.println("result is not empty");
        }

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username).orElseThrow();

        List<Note> filteredResult = result.stream().filter(note -> note.getUser().getUsername().equals(username)).toList();

        List<NoteDto> noteDtos = new ArrayList<>();
        filteredResult.forEach(note -> noteDtos.add(NoteMapper.mapToNoteDto(note)));

        return noteDtos;
    }

}
