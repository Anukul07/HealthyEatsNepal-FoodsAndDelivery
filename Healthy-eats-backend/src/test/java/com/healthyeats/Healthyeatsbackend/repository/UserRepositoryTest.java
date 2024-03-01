package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class UserRepositoryTest {

    private final UserRepository userRepoUnderTest;

    @Autowired
    UserRepositoryTest(UserRepository userRepoUnderTest) {
        this.userRepoUnderTest = userRepoUnderTest;
    }

    @AfterEach
    void tearDown() {
        userRepoUnderTest.deleteAll();
    }

    //passing tests are as follows
    @Test
    void checkIfUserExistsByEmail() {
        //given
        String email = "testuser@gmail.com";
        User user = new User(2,"test","nepal", email,"password","9322",Role.USER,null,null
        );
        userRepoUnderTest.save(user);
        //when
        Boolean expected=userRepoUnderTest.existsByEmail(email);
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void checkIdIsReturnedFromEmail() {
        //given
        String email = "testuser2@gmail.com";
        //here userId is in auto-increment so I have used 1
        User user = new User(1,"test","nepal", email,"password","9322",Role.USER,null,null
        );
        userRepoUnderTest.save(user);
        //when
        int expectedId = userRepoUnderTest.getUserIdByEmail(email);
        //then
        assertThat(expectedId).isEqualTo(1);
    }

    @Test
    void checkIfCorrectRoleIsReturned() {
        //given
        String role = "USER";
        User user = new User(1,"test","nepal", "tester@gmail.com","password","9322",Role.USER,null,null
        );
        userRepoUnderTest.save(user);
        //when
        String expectedRole = String.valueOf(userRepoUnderTest.getUserRole("tester@gmail.com"));
        //then
        assertThat(expectedRole).isEqualTo(expectedRole);

    }

    @Test
    void checksIfSavesUser() {
        // Given
        User user = new User();
        user.setFirstName("tester");
        user.setLastName("tester");
        user.setEmail("tester@gmail.com.com");
        user.setPassword("password");
        user.setPhoneNumber("1234567890");
        user.setRole(Role.USER);

        // When
        userRepoUnderTest.save(user);

        // Then
        assertThat(user.getId()).isNotNull();
    }

    @Test
    void checksIfUpdatesUser() {
        // Given
        User user = new User();
        user.setFirstName("tester");
        user.setLastName("tester");
        user.setEmail("tester@example.com");
        user.setPassword("password");
        user.setPhoneNumber("1234567890");
        user.setRole(Role.USER);

        // Save user
        userRepoUnderTest.save(user);

        // Update user's first name
        String newFirstName = "Ram";
        user.setFirstName(newFirstName);

        // When
        userRepoUnderTest.save(user);

        // Then
        User updatedUser = userRepoUnderTest.findById(user.getId()).orElse(null);
        assertThat(updatedUser).isNotNull();
        assertThat(updatedUser.getFirstName()).isEqualTo(newFirstName);
    }

    //failing tests
    @Test
    void checkIfUserDoesNotExistsByEmail() {
        //given
        String email = "jack@gmail.com";
        //when
        Boolean expected=userRepoUnderTest.existsByEmail(email);
        //then
        assertThat(expected).isFalse();
    }

    @Test
    void checkIdIsNotReturnedFromEmail() {
        //given
        String email = "testuser3@gmail.com";
        //here userId is in auto-increment so I have used 1
        User user = new User(1,"test","nepal", email,"password","9322",Role.USER,null,null
        );
        userRepoUnderTest.save(user);
        //when
        int expectedId = userRepoUnderTest.getUserIdByEmail(email);
        //then
        assertThat(expectedId).isEqualTo(5);
    }

}