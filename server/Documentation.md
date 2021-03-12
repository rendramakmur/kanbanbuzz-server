# KanbanBuzz Documentation

  KanbanBuzz is an app to manage bunch of your tasks and prioritize the tasks based on their status.
  
  This REST API has:
  - RESTful endpoint for CRUD operations.
  - JSON formatted response.

  Tech to build this REST API:
  - NodeJS
  - Sequelize
  - PostgreSQL

  ## RESTful endpoints
    POST /register
    POST /login
    POST /google-login
    POST /tasks
    GET /tasks
    GET /tasks/:id
    PUT /tasks/:id
    PATCH /tasks/:id
    DELETE /tasks/:id

----

# 1. POST /register
**This end point let you creat your own account.**

* ## URL:

  /register

* ## Method:

  `POST`

*  ## URL Params

  None

*  ## Request Header

  None

* ## Request Body

  **Required:**

  ```
  {
    "full_name": "<full_name to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "full_name": "<posted first_name>",
      "email": "<posted email>"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      {
          "message": "Name is required"
      },
      {
          "message": "Email is required"
      },
      {
          "message": "Password is required"
      },
      {
          "message": "Password length must be between 6 to 20 characters"
      },
      {
          "message": "Must be in email format"
      }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 2. POST /login
**This is login end-point**

* ## URL:

  /login

* ## Method:

  `POST`

*  ## URL Params

  None

*  ## Request Header

  None

* ## Request Body

  **Required:**

  ```
  {
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      access_token: <generated access token>,
      name: <user full_name>,
      email: <user email>
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    {
      "message": "Email/password is invalid"
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 3. POST /google-login
**This endpoint will create user if user didn't exist on database and logged in user if the user already in the database using Google OAuth2**

* ## URL:

  /google-login

* ## Method:

  `POST`

*  ## URL Params

   None

*  ## Request Header

   None

* ## Request Body

  **Required:**

  ```
  {
    "token_id": "<token_id generted by Google>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      access_token: <generated access token>,
      name: <user full name from Google Account>,
      email: <user email from Google Account>
    }
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 4. POST /tasks
**The function of this route is to create a new task for user.**

* ## URL:

  /tasks

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "category": "<category to get insert into>",
    "priority": "<priority to get insert into>",
    "UserId": "<current user logged in id>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
      "id": <given id by system>,
      "title": "<posted title>",
      "description": "<posted description>",
      "category": "<posted category>",
      "priority": "<posted priority>",
      "UserId": "<posted UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 5. GET /tasks
**This route will show all the tasks from database.**

* ## URL:

  /tasks

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
      {
        "id": 1,
        "title": "<tasks title>",
        "description": "<tasks description>",
        "category": "<tasks category>",
        "priority": "<tasks priority>",
        "UserId": "<tasks UserId>"
        "User": {
            "id": <user id>,
            "full_name": <user full_name>,
            "email": <user email>
        }
      },
      {
        "id": 2,
        "title": "<tasks title>",
        "description": "<tasks description>",
        "category": "<tasks category>",
        "priority": "<tasks priority>",
        "UserId": "<tasks UserId>"
        "User": {
            "id": <user id>,
            "full_name": <user full_name>,
            "email": <user email>
        }
      },
      ...
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 6. GET /tasks/:id
**Main function of this route is getting a spesific task from a user by task id.**

* ## URL:

  /tasks/:id

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "title": "<tasks title>",
      "description": "<tasks description>",
      "category": "<tasks category>",
      "priority": "<tasks priority>",
      "UserId": "<tasks UserId>",
      "createdAt": "2021-03-20T16:08:30.149Z",
      "updatedAt": "2021-03-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 404 Not Found <br />
    **Output:** 
    ```
    [
      { "message": "Task not found not found!" }
    ]
    ```

<br />

# 7. PUT /tasks/:id
**The function of this route is updating all the record of the task title, description, category, and priority.**

* ## URL:

  /tasks/:id

* ## Method:

  `PUT`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
    "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "category": "<category to get insert into>",
    "priority": "<priority to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "title": "<updated tasks title>",
      "description": "<updated tasks description>",
      "category": "<updated tasks category>",
      "priority": "<updated tasks priority>",
      "createdAt": "2021-02-20T16:08:30.149Z",
      "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:
  
  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Task not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { message : "Internal Server Error" }
    ```

<br />

# 8. PATCH /tasks/:id
**This route main function is updating spesific record of the task.**

* ## URL:

  /tasks/:id

* ## Method:

  `PATCH`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
    "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
    "category": "<category to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
      "id": 1,
      "title": "<tasks title>",
      "description": "<tasks description>",
      "category": "<updated tasks category>",
      "priority": "<tasks priority>",
      "createdAt": "2021-02-20T16:08:30.149Z",
      "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:
  
  * **Code:** 400 Bad Request <br />
    **Output:**
    ```
    [
      { "message" : "<validation requirement message>" }
    ]
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Task not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "message" : "Internal Server Error" }
    ```

<br />

# 9. DELETE /tasks/:id
**This route will delete the task by task id.**

* ## URL:

  /tasks/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
      "headers": "access_token"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    { message: 'Success. Task has been deleted.'}
    ```

* ## Error Response:

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "message": "Task not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { message : "Internal Server Error" }
    ```

<br />