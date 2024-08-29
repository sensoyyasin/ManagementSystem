package me.sensoyyasin.jwtbackend.repositories;

import me.sensoyyasin.jwtbackend.entities.Student;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RefreshScope
public interface StudentRepository extends JpaRepository<Student, Long> {
    //@JPQL -> Query - HQL -> @NamedQuery
    @Query("SELECT s FROM Student s WHERE s.name = ?1 OR s.surname = ?1 OR s.number = ?2")
    List<Student> findByNameOrSurnameOrNumber(@Param("search") String search, @Param("number") Long number);
    Optional<Student> findById(int id);
}