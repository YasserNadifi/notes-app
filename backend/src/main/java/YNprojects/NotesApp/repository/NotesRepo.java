package YNprojects.NotesApp.repository;

import YNprojects.NotesApp.Entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotesRepo extends JpaRepository<Note, Long> {

    @Query(value = """
    SELECT * FROM notes 
    WHERE LOWER(title) LIKE LOWER(CONCAT('%', :keyword, '%')) 
       OR LOWER(CAST(content AS CHAR)) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """, nativeQuery = true)
    public List<Note> findByKeyword(String keyword);

}
