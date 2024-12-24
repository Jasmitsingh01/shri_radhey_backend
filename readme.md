![Shri Radhey Matrimonial Logo](./public/shri_logo.png)

# Shri Radhey Matrimonial Backend Server

Welcome to the backend server for managing the Shri Radhey Matrimonial web application. This project is built using **Node.js**, **Express**, and **TypeScript**, and follows a **microservices architecture**.

## Project Structure

```plaintext
.env
app.ts
index.ts
package.json
src/
    blogs/
        .env
        app.ts
        controllers/
        db/
        index.ts
        middleware/
        models/
    client/
        .env
        app.ts
        controllers/
        db/
        index.ts
        middleware/
        models/
        routes/
    fields/
        .env
        app.ts
        controller/
        db/
        index.ts
        models/
    public/
        images/
        template/
    task/
        .env
        app.ts
        controllers/
        db/
        index.ts
        middleware/
        models/
        routes/
    user/
        .env
        app.ts
        controllers/
        Database/
        index.ts
        middleware/
        models/
    utils/
tsconfig.json
```

## Controllers

### Blogs
- **create.ts**: Handles the creation of new blog posts.
- **delete.ts**: Handles the deletion of blog posts.
- **display.ts**: Handles the display of a single blog post.
- **update.ts**: Handles the updating of blog posts.
- **all.ts**: Handles the retrieval of all blog posts.

### Client
- **create.ts**: Handles the creation of new client profiles.
- **delete.ts**: Handles the deletion of client profiles.
- **update.field.ts**: Handles the updating of specific fields in client profiles.
- **all.ts**: Handles the retrieval of all client profiles.

### Fields

#### Complexion
- **create.ts**: Handles the creation of new complexion entries.
- **delete.ts**: Handles the deletion of complexion entries.
- **update.ts**: Handles the updating of complexion entries.
- **all.ts**: Handles the retrieval of all complexion entries.

#### Ethnicity
- **create.ts**: Handles the creation of new ethnicity entries.
- **delete.ts**: Handles the deletion of ethnicity entries.
- **update.ts**: Handles the updating of ethnicity entries.
- **all.ts**: Handles the retrieval of all ethnicity entries.

#### Location
- **create.ts**: Handles the creation of new location entries.
- **delete.ts**: Handles the deletion of location entries.
- **update.ts**: Handles the updating of location entries.
- **all.ts**: Handles the retrieval of all location entries.

#### Occupation
- **create.ts**: Handles the creation of new occupation entries.
- **delete.ts**: Handles the deletion of occupation entries.
- **update.ts**: Handles the updating of occupation entries.
- **all.ts**: Handles the retrieval of all occupation entries.

#### Qualification
- **create.ts**: Handles the creation of new qualification entries.
- **delete.ts**: Handles the deletion of qualification entries.
- **update.ts**: Handles the updating of qualification entries.
- **all.ts**: Handles the retrieval of all qualification entries.

#### BodyType
- **create.ts**: Handles the creation of new body type entries.
- **delete.ts**: Handles the deletion of body type entries.
- **update.ts**: Handles the updating of body type entries.
- **all.ts**: Handles the retrieval of all body type entries.

### Task
- **create.ts**: Handles the creation of new tasks.
- **delete.ts**: Handles the deletion of tasks.
- **update.field.ts**: Handles the updating of specific fields in tasks.
- **response.ts**: Handles the responses to tasks.
- **all.ts**: Handles the retrieval of all tasks.

### User
- **Register.ts**: Handles user registration.
- **Login.ts**: Handles user login.
- **Forgot-password.ts**: Handles forgot password requests.
- **ResetPassword.ts**: Handles password reset requests.
- **profile.ts**: Handles user profile management.

## Controllers Request and Response Parameters

### Blogs
- **create.ts**: 
    - **Request**: `{ title: string, content: string, author: string }`
    - **Response**: `{ success: boolean, message: string, blogId?: string }`
- **delete.ts**: 
    - **Request**: `{ blogId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **display.ts**: 
    - **Request**: `{ blogId: string }`
    - **Response**: `{ success: boolean, blog: object }`
- **update.ts**: 
    - **Request**: `{ blogId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, blogs: array }`

### Client
- **create.ts**: 
    - **Request**: `{ name: string, email: string, password: string }`
    - **Response**: `{ success: boolean, message: string, clientId?: string }`
- **delete.ts**: 
    - **Request**: `{ clientId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.field.ts**: 
    - **Request**: `{ clientId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, clients: array }`

### Fields

#### Complexion
- **create.ts**: 
    - **Request**: `{ type: string }`
    - **Response**: `{ success: boolean, message: string, complexionId?: string }`
- **delete.ts**: 
    - **Request**: `{ complexionId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ complexionId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, complexions: array }`

#### Ethnicity
- **create.ts**: 
    - **Request**: `{ type: string }`
    - **Response**: `{ success: boolean, message: string, ethnicityId?: string }`
- **delete.ts**: 
    - **Request**: `{ ethnicityId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ ethnicityId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, ethnicities: array }`

#### Location
- **create.ts**: 
    - **Request**: `{ name: string }`
    - **Response**: `{ success: boolean, message: string, locationId?: string }`
- **delete.ts**: 
    - **Request**: `{ locationId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ locationId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, locations: array }`

#### Occupation
- **create.ts**: 
    - **Request**: `{ name: string }`
    - **Response**: `{ success: boolean, message: string, occupationId?: string }`
- **delete.ts**: 
    - **Request**: `{ occupationId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ occupationId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, occupations: array }`

#### Qualification
- **create.ts**: 
    - **Request**: `{ name: string }`
    - **Response**: `{ success: boolean, message: string, qualificationId?: string }`
- **delete.ts**: 
    - **Request**: `{ qualificationId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ qualificationId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, qualifications: array }`

#### BodyType
- **create.ts**: 
    - **Request**: `{ type: string }`
    - **Response**: `{ success: boolean, message: string, bodyTypeId?: string }`
- **delete.ts**: 
    - **Request**: `{ bodyTypeId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.ts**: 
    - **Request**: `{ bodyTypeId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, bodyTypes: array }`

### Task
- **create.ts**: 
    - **Request**: `{ title: string, description: string, dueDate: string }`
    - **Response**: `{ success: boolean, message: string, taskId?: string }`
- **delete.ts**: 
    - **Request**: `{ taskId: string }`
    - **Response**: `{ success: boolean, message: string }`
- **update.field.ts**: 
    - **Request**: `{ taskId: string, updates: object }`
    - **Response**: `{ success: boolean, message: string }`
- **response.ts**: 
    - **Request**: `{ taskId: string, response: object }`
    - **Response**: `{ success: boolean, message: string }`
- **all.ts**: 
    - **Request**: `{}`
    - **Response**: `{ success: boolean, tasks: array }`

### User
- **Register.ts**: 
    - **Request**: `{ username: string, email: string, password: string }`
    - **Response**: `{ success: boolean, message: string, userId?: string }`
- **Login.ts**: 
    - **Request**: `{ email: string, password: string }`
    - **Response**: `{ success: boolean, message: string, token?: string }`
- **Forgot-password.ts**: 
    - **Request**: `{ email: string }`
    - **Response**: `{ success: boolean, message: string }`
- **ResetPassword.ts**: 
    - **Request**: `{ token: string, newPassword: string }`
    - **Response**: `{ success: boolean, message: string }`
- **profile.ts**: 
    - **Request**: `{ userId: string }`
    - **Response**: `{ success: boolean, profile: object }`

## Models

### Blogs
- **blogs.model.ts**: Defines the schema for blog posts.

### Client
- **client.model.ts**: Defines the schema for client profiles.

### Fields
- **complexion.model.ts**: Defines the schema for complexion entries.
- **ethnicity.model.ts**: Defines the schema for ethnicity entries.
- **location.model.ts**: Defines the schema for location entries.
- **occupation.model.ts**: Defines the schema for occupation entries.
- **qualification.model.ts**: Defines the schema for qualification entries.
- **bodyType.model.ts**: Defines the schema for body type entries.

### Task
- **task.model.ts**: Defines the schema for tasks.

### User
- **user.model.ts**: Defines the schema for user profiles.

## Routes

### Blogs
- **index.ts**: Defines the routes for blog-related operations.

### Client
- **index.ts**: Defines the routes for client-related operations.

### Task
- **index.ts**: Defines the routes for task-related operations.

### User
- **index.routes.ts**: Defines the routes for user-related operations.
#   s h r i _ r a d h e y _ b a c k e n d  
 