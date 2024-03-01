package com.healthyeats.Healthyeatsbackend;

import com.healthyeats.Healthyeatsbackend.Service.UserService;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import lombok.extern.log4j.Log4j2;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@Log4j2
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UserStepDefinition {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Given("find all list of user")
    public void find_all_list_of_user() {
        List<User> allUser = userService.fetchAll();
        log.info(allUser);
        Assert.assertTrue(!allUser.isEmpty());
    }

    @Given("find the user by id")
    public void find_the_user_by_id() {
                userService.findById(1);

    }

    @Given("save data")
    public void save_data() {
        //logic to save data
    }


    @Given("authenticate")
    public void authenticate() {
       //created data id: find by id
    }
    @Then("finally")
    public void finallyOne() {
       // find by email
    }



}
