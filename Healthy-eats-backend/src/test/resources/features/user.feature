Feature: user
  Scenario Outline: fetching all datas
    Given find all list of user
    And find the user by id

    Examples:
      | user_id | email            | first_name | last_name | password   | phone_number | role | otp |
      | 1       | anukul@gmail.com| anukul     | nepal     | Random@1234 | 9809933211   | USER |     |


  Scenario Outline: for saving user
    Given save data
    And authenticate
    Then finally

    Examples:
      | user_id | email            | first_name | last_name | password   | phone_number | role | otp |
      | 1       | anukul@gmail.com| anukul     | nepal     | Random@1234 | 9809933211   | USER |     |

