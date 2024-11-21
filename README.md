# Online Charity Management
The local charity Organizations are among the most adversely affected groups by the Covid 19 Pandemic. Majority of the donors are losing their ability to support these organizations because of the economic impact left behind by the pandemic. Furthermore, finding new donors is also an enormous challenge, leaving the thousands of beneficiaries impoverished. Charity is an act of kindness where someone donates what they have to the less fortunate.


## Problem Statement
The drop of donors and well-wishers has left many of the charity organizations in a very dire state, with some even on the verge of closure because of lack of basic needs. These organizations directly support a huge number of beneficiaries positively impacting their lives. 

Your task is to create an online charity management system that will help these charity organizations get funding and donors easily. The project should implement all the best practices. It will have three modules: Admin, NGOs and Donors. Only an admin can approve the request made by the NGOs. NGOs can register and request donations on what they need by submitting a form capturing all the details. They should also be able to view previous and donation reports. 
Donors can register and login using their credentials and will see a list of requests for donations on the home page. They should be able to filter by category and also view single details of donation requests. They should also be able to donate whatever they have and a report on donation history


### Minimum Viable Product
The first version of work that is expected must meet the following metrics:
* Allow for user authentication
* Classify users on whether they are Admin, NGOs or Donors.
* Give the right to add, update, or remove data only to the right people based on their classification.
* Admins can create the different categories of donations.
* Only Admins can approve an NGO’s donation request.
* Admins can view all the donation requests.
* NGOs can create a request for donation stating a reason and under which category.
* NGOs Can view their previous requests and donations.
* Donors can view all the approved donation requests
* Donors can view a list of their donations in the profiles.
* Donors can be able to donate the amount they have.
* Donors should be able to filter by category.
* All data must be stored in a central location


### Technical Objectives
* All commits must be descriptive
Before a commit is accepted, it must be reviewed by 2 members and the project lead
* Each feature must have its own branch
* All feature branches are to be deleted once the pull request is accepted.
* The project must have unit tests, UI tests, and must maintain a  test coverage of above 85% for both UI and Unit tests.
* The code should be in a modular format such that if one module of the project fails it does not affect other modules that are not related to it.

### Technologies
Backend: Flask
Database: PostgreSQL
Wireframes: Figma (Should be mobile friendly)
Testing Framework: ​Jest & Minitests
Frontend: ReactJs & Redux Toolkit(state management)



# Flask Donation/Charity Management API
## Backend

A RESTful API built with Flask for managing donations, categories, donation requests, and users. This API allows donors to make donations, admins to approve donation requests, and provides reporting features. It also integrates with an external service for generating access tokens.

## Features

- User management with JWT authentication
- Role-based access control (Admin, Donor, NGO)
- Manage donation categories
- Admins can approve donation requests
- Donation tracking for donors
- Reporting on donations and requests
- Mpesa API integration for payment processing

## Models

### User

Represents a user in the system (Admin, Donor, or NGO).

| Field       | Type        | Description                              |
|-------------|-------------|------------------------------------------|
| id          | Integer     | Unique identifier for the user          |
| first_name  | String      | User's first name                        |
| last_name   | String      | User's last name                         |
| email       | String      | Unique email address for the user       |
| phone       | String      | Phone number of the user                |
| role        | String      | Role of the user (Admin, Donor, NGO)    |
| password    | String      | Hashed password for user authentication |
| created_at  | DateTime    | Timestamp of user account creation      |

**Relationships:**
- `donations`: A user (Donor) can make multiple donations.
- `organization`: NGOs have a related organization (for `role='ngo'`).

---

### Category

Represents a category for donation requests.

| Field       | Type        | Description                              |
|-------------|-------------|------------------------------------------|
| id          | Integer     | Unique identifier for the category      |
| name        | String      | Name of the category                    |
| description | String      | Description of the category             |

**Relationships:**
- `donation_requests`: A category can have multiple donation requests.

---

### DonationRequest

Represents a donation request from an NGO.

| Field             | Type        | Description                                     |
|-------------------|-------------|-------------------------------------------------|
| id                | Integer     | Unique identifier for the donation request      |
| ngo_id            | Integer     | Foreign key referencing the NGO (Organization)  |
| category_id       | Integer     | Foreign key referencing the category            |
| description       | String      | Description of the donation request             |
| approved          | Boolean     | Whether the request is approved (Admin only)    |
| created_at        | DateTime    | Timestamp of donation request creation          |

**Relationships:**
- `ngo`: A donation request belongs to a specific NGO.
- `category`: A donation request belongs to a specific category.

---

### Donation

Represents a donation made by a donor.

| Field            | Type        | Description                                     |
|------------------|-------------|-------------------------------------------------|
| id               | Integer     | Unique identifier for the donation              |
| user_id          | Integer     | Foreign key referencing the donor               |
| amount           | Float       | Amount of the donation                          |
| donation_request_id | Integer   | Foreign key referencing the donation request    |
| created_at       | DateTime    | Timestamp of the donation                       |

**Relationships:**
- `user`: A donation is made by a user (Donor).
- `donation_request`: A donation is linked to a donation request.

---

### TokenBlacklist

Represents blacklisted JWT tokens used for logging out.

| Field       | Type        | Description                                     |
|-------------|-------------|-------------------------------------------------|
| jti         | String      | JWT token identifier for blacklisting          |



## Role-based Access Control

### Decorators

To manage role-based access control, the following decorators are defined:

#### `donor_required`

This decorator ensures that the user making a request has the **Donor** role. It is used to protect routes that should only be accessed by donors.

python code example:
   def donor_required(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            user_id = get_jwt_identity()
            user = Users.query.get(user_id)
            if not user or user.role != 'user':
                return {"message": "Access forbidden: user role required"}, 403
            return fn(*args, **kwargs)
        return decorator
    Represents a donation made by a donor.

| Field            | Type        | Description                                     |
|------------------|-------------|-------------------------------------------------|
| id               | Integer     | Unique identifier for the donation              |
| user_id          | Integer     | Foreign key referencing the donor               |
| amount           | Float       | Amount of the donation                          |
| donation_request_id | Integer   | Foreign key referencing the donation request    |
| created_at       | DateTime    | Timestamp of the donation                       |

**Relationships:**
- `user`: A donation is made by a user (Donor).
- `donation_request`: A donation is linked to a donation request.

---

### TokenBlacklist

Represents blacklisted JWT tokens used for logging out.

| Field       | Type        | Description                                     |
|-------------|-------------|-------------------------------------------------|
| jti         | String      | JWT token identifier for blacklisting          |

## Authentication & Authorization

The API uses JWT-based authentication to secure endpoints. The roles within the application are defined as follows:

- **Admin**: Has full access to approve donation requests and manage users.
- **Donor**: Can make donations to specific donation requests.
- **NGO**: Can create donation requests.

## Role-based Access Control

### Role & Functionality

| Role      | Function |
| --------- | -------------------------------------------------------------- |
| **Admin** | - Use the following Minimum Viable Product (MVP):               |
|           |   - User authentication (login, logout, registration).         |
|           |   - Classification of users into Admin, NGOs, and Donors.      |
|           |   - Control over adding, updating, or removing data based on roles. |
|           |   - Can create donation categories.                            |
|           |   - Can approve an NGO’s donation request.                     |
|           |   - Can view all donation requests.                            |
|           |   - Can view donation reports.                                 |
|           |   - Manage all user-related activities (CRUD operations).      |
| **NGO**   | - Create donation requests specifying category and reason.     |
|           | - View their own previous donation requests and donations.     |
|           | - Can only view the donation requests they have created.       |
| **Donor** | - View all approved donation requests.                         |
|           | - Can view their list of donations in their profiles.          |
|           | - Donate to approved requests based on category.               |
|           | - Filter donation requests by category.                        |
|           | - Can make donations to multiple categories.                   |

### MVP (Minimum Viable Product)

The roles.py file is expected to meet the mvps below where the decorators throughout the code base:

1. **User Authentication**:  
   - The application must allow users to authenticate using JWT tokens.
   - The user must be classified as either **Admin**, **NGO**, or **Donor**.
   
2. **Role-Based Data Access**:  
   - **Admin**: Has full rights to create categories, approve donation requests, and view all requests and donations.
   - **NGO**: Can create donation requests, view their donation requests, and track their donations.
   - **Donor**: Can view all approved donation requests, view their donations, and donate to categories.

3. **Donation Requests**:  
   - **Admins** can approve requests, view requests from all users, and manage donation categories.
   - **NGOs** can create donation requests (including specifying the category) and view their donation requests and previous donations.
   - **Donors** can view only approved requests and donate to the causes they feel passionate about. Donors must also be able to filter donation requests by category.

4. **Donation Tracking**:  
   - **Donors** can see a record of their donations in their profile.
   - **NGOs** can track donations made to their requests.

## API Endpoints

### User Resources

- **POST `/users`**: Create a new user (Admin, NGO, Donor).
  - Roles: Admin, NGO, Donor
  - Payload:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "phone": "123456789",
      "role": "donor",
      "password": "password123",
      "confirm_password": "password123",
      "organization_name": "NGO Example", (optional for NGO)
      "organization_description": "Help the poor", (optional for NGO)
      "organization_address": "123 Street, City" (optional for NGO)
    }
    ```

- **GET `/users`**: Retrieve a list of all users (Admin only).
- **GET `/users/{user_id}`**: Retrieve a specific user by ID (Admin only).
- **DELETE `/users/{user_id}`**: Delete a user (Admin only).

### Login and Logout

- **POST `/login`**: User login.
  - Payload:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Returns a JWT access token for authentication.

- **POST `/logout`**: Log out by blacklisting the JWT token.

### Admin-Only Resource

- **GET `/admin-only`**: Access to resources only available to admins (protected by role-based access control).

# Organization Management API

This is a RESTful API for managing organizations. It allows users to perform CRUD (Create, Read, Update, Delete) operations on organizations. The API is built using Flask and Flask-RESTful.

## API Endpoints

### 1. **Get all organizations**
   - **URL**: `/organizations`
   - **Method**: `GET`
   - **Description**: Fetches a list of all organizations in the database.
   - **Response**:
     ```json
     [
       {
         "organization_id": 1,
         "name": "Organization Name",
         "description": "Organization Description",
         "address": "Organization Address"
       },
       ...
     ]
     ```

### 2. **Get a specific organization by ID**
   - **URL**: `/organizations/{id}`
   - **Method**: `GET`
   - **Description**: Fetches a single organization by its ID.
   - **Parameters**:
     - `id`: The unique identifier of the organization.
   - **Response**:
     ```json
     {
       "organization_id": 1,
       "name": "Organization Name",
       "description": "Organization Description",
       "address": "Organization Address"
     }
     ```
   - **Error Response** (if organization not found):
     ```json
     {
       "message": "Organization not found"
     }
     ```

### 3. **Create a new organization**
   - **URL**: `/organizations`
   - **Method**: `POST`
   - **Description**: Creates a new organization in the database.
   - **Request Body**:
     ```json
     {
       "name": "Organization Name",
       "description": "Organization Description",
       "address": "Organization Address"
     }
     ```
   - **Response**:
     ```json
     {
       "organization_id": 1,
       "name": "Organization Name",
       "description": "Organization Description",
       "address": "Organization Address"
     }
     ```
   - **Error Response** (if organization already exists):
     ```json
     {
       "message": "Organization already exists"
     }
     ```

### 4. **Update an organization**
   - **URL**: `/organizations/{id}`
   - **Method**: `PATCH`
   - **Description**: Updates an existing organization by its ID. You can update the `name`, `description`, or `address`.
   - **Parameters**:
     - `id`: The unique identifier of the organization.
   - **Request Body**:
     ```json
     {
       "name": "Updated Organization Name",
       "description": "Updated Description",
       "address": "Updated Address"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Organization updated successfully",
       "details": ["Name updated successfully", "Description updated successfully", "Address updated successfully"],
       "organization": {
         "organization_id": 1,
         "name": "Updated Organization Name",
         "description": "Updated Description",
         "address": "Updated Address"
       }
     }
     ```
   - **Error Response** (if organization not found):
     ```json
     {
       "message": "Organization not found"
     }
     ```

### 5. **Delete an organization**
   - **URL**: `/organizations/{id}`
   - **Method**: `DELETE`
   - **Description**: Deletes an organization by its ID.
   - **Parameters**:
     - `id`: The unique identifier of the organization.
   - **Response**:
     ```json
     {
       "message": "Organization deleted successfully",
       "organization": {
         "organization_id": 1,
         "name": "Organization Name",
         "description": "Organization Description",
         "address": "Organization Address"
       }
     }
     ```
   - **Error Response** (if organization not found):
     ```json
     {
       "message": "Organization not found"
     }
     ```

## Error Handling

In case of errors, the API responds with a relevant error message and status code. Example:

```json
{
  "message": "Organization already exists", "error code"

}
```
# Donation Request API

This is a RESTful API that allows users to manage donation requests for NGOs (Non-Governmental Organizations). The API supports CRUD (Create, Read, Update, Delete) operations on donation requests. It is built using Flask, Flask-RESTful, and Flask-JWT-Extended for authentication.

## API Endpoints

### 1. **Get all donation requests**
   - **URL**: `/donation_requests`
   - **Method**: `GET`
   - **Description**: Fetches a list of all donation requests.
   - **Response**:
     ```json
     [
       {
         "request_id": 1,
         "title": "Donation for Hospital",
         "description": "Donating for hospital construction",
         "status": "Active",
         "target_amount": 10000.00,
         "category_name": "Health"
       },
       ...
     ]
     ```

### 2. **Get a specific donation request by ID**
   - **URL**: `/donation_requests/{id}`
   - **Method**: `GET`
   - **Description**: Fetches a specific donation request by its ID.
   - **Parameters**:
     - `id`: The unique identifier of the donation request.
   - **Response**:
     ```json
     {
       "request_id": 1,
       "title": "Donation for Hospital",
       "description": "Donating for hospital construction",
       "status": "Active",
       "target_amount": 10000.00,
       "category_name": "Health"
     }
     ```
   - **Error Response** (if request not found):
     ```json
     {
       "message": "Request not found"
     }
     ```

### 3. **Create a new donation request**
   - **URL**: `/donation_requests`
   - **Method**: `POST`
   - **Description**: Creates a new donation request for an organization. This operation requires the user to be logged in as an NGO.
   - **Request Body**:
     ```json
     {
       "title": "Donation for Animal Shelter",
       "description": "A donation to build an animal shelter",
       "status": "Active",
       "target_amount": 5000.00,
       "category_name": "Animals"
     }
     ```
   - **Response**:
     ```json
     {
       "request_id": 1,
       "title": "Donation for Animal Shelter",
       "description": "A donation to build an animal shelter",
       "status": "Active",
       "target_amount": 5000.00,
       "category_name": "Animals"
     }
     ```
   - **Error Responses**:
     - If the user is not associated with any organization:
       ```json
       {
         "message": "User is not associated with any organization."
       }
       ```
     - If the category is invalid:
       ```json
       {
         "message": "Invalid category selected"
       }
       ```
     - If a similar donation request already exists:
       ```json
       {
         "message": "Donation request already exists"
       }
       ```

### 4. **Update a donation request**
   - **URL**: `/donation_requests/{id}`
   - **Method**: `PATCH`
   - **Description**: Updates an existing donation request by its ID. This operation requires the user to be logged in as an NGO.
   - **Parameters**:
     - `id`: The unique identifier of the donation request.
   - **Request Body**:
     ```json
     {
       "title": "Updated Donation for Animal Shelter",
       "description": "Updated description",
       "status": "Active",
       "target_amount": 6000.00
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Donation request updated successfully",
       "message": ["Title updated successfully", "Description updated successfully", "Target amount updated successfully"],
       "donation_request": {
         "request_id": 1,
         "title": "Updated Donation for Animal Shelter",
         "description": "Updated description",
         "status": "Active",
         "target_amount": 6000.00,
         "category_name": "Animals"
       }
     }
     ```
   - **Error Response** (if request not found):
     json
     {
       "message": "Request not found"
     }
     

### 5. **Delete a donation request**
   - **URL**: `/donation_requests/{id}`
   - **Method**: `DELETE`
   - **Description**: Deletes a donation request by its ID. This operation requires the user to be logged in as an NGO.
   - **Parameters**:
     - `id`: The unique identifier of the donation request.
   - **Response**:
     ```json
     {
       "message": "Donation request deleted successfully",
       "request": {
         "request_id": 1,
         "title": "Donation for Animal Shelter",
         "description": "A donation to build an animal shelter",
         "status": "Active",
         "target_amount": 5000.00,
         "category_name": "Animals"
       }
     }
     ```
   - **Error Response** (if request not found):
     ```json
     {
       "message": "Request not found"
     }
     ```

## Authentication

To create, update, or delete donation requests, users must be logged in and authenticated as NGOs. The API uses **JWT (JSON Web Tokens)** for authentication. Use the token in the `Authorization` header with the `Bearer` prefix.

# Donation Request Approval API

This API allows administrators and authorized users to manage donation requests within the system. It includes features for approving donation requests, viewing pending requests, and retrieving approved requests based on user roles (NGO or other users).

## Endpoints

### 1. **Approve a Donation Request**
   - **URL**: `/donation_approval/{request_id}`
   - **Method**: `PATCH`
   - **Description**: Approves a donation request by its ID. This operation can only be performed by an admin.
   - **Request Parameters**:
     - `request_id`: The ID of the donation request to approve.
   - **Response**:
     - Success:
       ```json
       {
         "message": "Donation request approved successfully",
         "donation_request": { ... }
       }
       ```
     - Error (Request not found):
       ```json
       {
         "message": "Donation request not found"
       }
       ```
     - Error (Already approved):
       ```json
       {
         "message": "Donation request already approved"
       }
       ```

### 2. **Get Pending Donation Requests**
   - **URL**: `/donation_approval`
   - **Method**: `GET`
   - **Description**: Fetches a list of pending donation requests. This endpoint can only be accessed by an admin.
   - **Response**:
     - Success:
       ```json
       {
         "pending_donations": [
           { ... },
           { ... }
         ]
       }
       ```
     - Error (No pending requests):
       ```json
       {
         "message": "No pending donation requests were found"
       }
       ```

### 3. **Get Approved Donation Requests**
   - **URL**: `/approved_donations`
   - **Method**: `GET`
   - **Description**: Fetches a list of approved donation requests. The response depends on the user's role:
     - If the user is an NGO, only their organization's approved requests will be returned.
     - If the user is not an NGO, all approved requests will be returned.
   - **Response**:
     - Success:
       ```json
       {
         "approved_donations": [
           { ... },
           { ... }
         ]
       }
       ```
     - Error (No approved requests):
       ```json
       {
         "message": "No approved donation requests found"
       }
       ```

## Authentication

The API requires JWT-based authentication for certain endpoints. The following role-based access control is implemented:
- **Admin**: Can approve donation requests and view all pending requests.
- **NGO**: Can view approved donation requests related to their organization.
- **Other Users (Donors)**: Can view all approved donation requests.

JWT tokens should be included in the `Authorization` header in the format `Bearer <token>`.

## Error Handling

The API provides the following error responses:
- **404 Not Found**: Resource not found (e.g., donation request not found).
- **400 Bad Request**: Invalid request or missing fields.
- **500 Internal Server Error**: Server errors during data operations.

## Example Usage

### Approve a Donation Request:
```bash
PATCH /donation_approval/1
Authorization: Bearer <your_jwt_token>
```
# Donation Management API

This API enables donors to make donations, view donation records, and update or delete their donations. It also provides functionality for NGOs and admins to view and manage donations. The API integrates with an external M-Pesa STK Push service to handle donation payments.

## Endpoints

### 1. **Get Donation Details**
   - **URL**: `/donation/{id}`
   - **Method**: `GET`
   - **Description**: Fetches donation details. Can be used by:
     - **Admin**: View all donations or a specific donation by ID.
     - **Donor**: View their donations or a specific donation by ID.
     - **NGO**: View donations related to their approved donation requests or a specific donation.
   - **Response**:
     - Success:
       ```json
       {
         "donation_id": 1,
         "amount": 100.0,
         "user_id": 123,
         "donation_request_id": 456,
         ...
       }
       ```
     - Error (Donation not found):
       ```json
       {
         "message": "Donation not found"
       }
       ```

### 2. **Create a Donation**
   - **URL**: `/donation`
   - **Method**: `POST`
   - **Description**: Creates a new donation. Only accessible to **donors**. The donation is linked to a donation request, and a payment is initiated via M-Pesa STK Push.
   - **Request Body**:
     ```json
     {
       "amount": 100.0,
       "donation_request_id": 123
     }
     ```
   - **Response**:
     - Success (Donation and STK Push initiated):
       ```json
       {
         "message": "Donation successful. STK Push initiated",
         "donation": { ... },
         "stk_details": { ... }
       }
       ```
     - Error (Donation request not found or status not approved):
       ```json
       {
         "message": "Donation request must be approved first"
       }
       ```

### 3. **Update a Donation**
   - **URL**: `/donation/{id}`
   - **Method**: `PATCH`
   - **Description**: Allows a donor to update the donation amount. Only accessible to **donors**.
   - **Request Body**:
     ```json
     {
       "amount": 150.0
     }
     ```
   - **Response**:
     - Success (Donation updated):
       ```json
       {
         "message": "Donation updated successfully",
         "donation": { ... },
         "details": ["Amount updated successfully"]
       }
       ```
     - Error (Donation not found):
       ```json
       {
         "message": "Donation not found"
       }
       ```

### 4. **Delete a Donation**
   - **URL**: `/donation/{id}`
   - **Method**: `DELETE`
   - **Description**: Deletes a donation record. Only accessible to **donors** who made the donation.
   - **Response**:
     - Success (Donation deleted):
       ```json
       {
         "message": "Donation deleted successfully",
         "donation": { ... }
       }
       ```
     - Error (Donation not found):
       ```json
       {
         "message": "Donation not found"
       }
       ```

## Authentication

The API uses **JWT-based authentication** for access control. The following roles are implemented:
- **Admin**: Can view all donations and manage them.
- **Donor**: Can make donations, view their own donations, update or delete their donations.
- **NGO**: Can view donations related to their approved donation requests.

JWT tokens must be included in the `Authorization` header in the format `Bearer <token>`.

## External Integration

This API integrates with **M-Pesa STK Push** for processing donations. When a donor makes a donation, the API triggers an STK push request to initiate the payment process.

## Example Usage

### Create a Donation:
```bash
POST /donation
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "amount": 100.0,
  "donation_request_id": 1
}
```
# M-Pesa STK Push Integration

This script integrates with Safaricom's M-Pesa API to initiate an STK (Sim Toolkit) Push request. The STK Push allows users to pay for goods or services through their mobile phones by sending a payment request to Safaricom's system. This example leverages the M-Pesa sandbox environment, making it ideal for testing the integration before going live.

## Overview of the Code

The code provides a function `initiate_stk_push()` which handles the process of initiating a payment request through M-Pesa's STK Push API. It consists of the following key steps:

1. **Fetching an Access Token**: Using the `consumer_key` and `consumer_secret` from M-Pesa's API, an access token is generated which is required to authorize further requests.
2. **Creating the STK Push Payload**: A request payload is prepared with all the required parameters (amount, phone number, business short code, etc.) to send to M-Pesa's system.
3. **Sending the Request**: The STK Push request is sent to the M-Pesa API using the access token and the prepared payload.
4. **Handling the Response**: The response from M-Pesa is processed, and the success or failure of the transaction is handled.

## Key Functions

### `initiate_stk_push(amount, phone, account_reference, transaction_desc)`

This is the core function that initiates the STK Push request.

#### Parameters:
- **amount** (float): The amount of money the user intends to pay.
- **phone** (str): The phone number of the customer who will make the payment.
- **account_reference** (str): A reference for the transaction (e.g., order number, donation reference).
- **transaction_desc** (str): A short description of the transaction (e.g., "Donation", "Payment for goods").

#### Function Workflow:
1. **Fetch Credentials**: The function first loads the M-Pesa API credentials (`MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, etc.) from environment variables.
2. **Get Access Token**: It makes an HTTP request to Safaricom's OAuth endpoint to fetch an access token using the consumer key and secret.
3. **Prepare STK Push Payload**: It generates a password using the business short code, passkey, and a timestamp. The payload is prepared with details like the phone number, amount, transaction description, and more.
4. **Send Request to M-Pesa API**: The payload is sent to M-Pesa's STK Push API endpoint via a POST request.
5. **Handle Response**: The response is processed. If the transaction is successful, it returns the `CheckoutRequestID` and a success message. If it fails, it returns an error message.

### Error Handling:
- **RequestException**: Catches network-related errors (e.g., timeout, connection issues).
- **General Exception**: Catches other errors like incorrect response data or failure to get the access token.

## Steps Involved in the M-Pesa STK Push Process

1. **Get Access Token**: First, the script generates an access token from M-Pesa using the client credentials (consumer key and secret).
2. **Prepare the Request**: The payload for the STK Push request is prepared by encoding the business short code, passkey, and timestamp into a password, and populating other fields like `PhoneNumber`, `Amount`, `AccountReference`, etc.
3. **Send the Request**: A POST request is sent to M-Pesa's sandbox STK Push endpoint (`/mpesa/stkpush/v1/processrequest`).
4. **Handle Response**: M-Pesa responds with a success or failure message, and the function checks the `ResponseCode`. If the response code is "0", the STK Push was successful, and a `CheckoutRequestID` is returned.
5. **Error Handling**: If any step fails (e.g., wrong credentials, network issue), the function catches the error and returns a detailed error message.

## Environment Variables

The following environment variables are required for the script to work:

- **MPESA_CONSUMER_KEY**: The consumer key provided by M-Pesa when registering for their API.
- **MPESA_CONSUMER_SECRET**: The consumer secret provided by M-Pesa when registering for their API.
- **MPESA_PASSKEY**: The passkey for the M-Pesa payment process.
- **MPESA_SHORTCODE**: The business shortcode for your M-Pesa account.
- **CALLBACK_URL**: The URL to which M-Pesa will send transaction status updates.

### Example `.env` file:

```env
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_PASSKEY=your_passkey_here
MPESA_SHORTCODE=your_shortcode_here
CALLBACK_URL=http://your_callback_url_here
```

# Donation Management API - Category Management

This API is part of a donation management system built with Flask and Flask-RESTful. It handles the management of donation categories and the retrieval of approved donation requests for specific categories. The API includes functionality for managing categories, including creating, updating, and deleting categories, as well as retrieving approved donation requests for specific categories.

## Overview

The API has two main resources:

1. **CategoryResource**: Manages categories (creating, updating, deleting, and fetching category details).
2. **ApprovedDonationRequestsByCategoryResource**: Fetches approved donation requests filtered by category for donors and users.

## Key Resources

### 1. `CategoryResource`

This resource handles operations related to donation categories, such as retrieving category details, creating new categories, updating existing categories, and deleting categories.

#### GET `/categories`
- **Description**: Fetches all categories in the system.
- **Response**: Returns a list of all categories in JSON format.
  
#### GET `/categories/<id>`
- **Description**: Fetches a specific category by its `category_id`.
- **Response**: Returns the category details if found; otherwise, returns a 404 error.

#### POST `/categories`
- **Description**: Creates a new category in the system.
- **Required fields**:
  - `name`: The name of the category.
  - `description`: A description of the category.
- **Response**: Returns the newly created category with a 201 status code. If there's an error, returns a 500 status with the error message.

#### PATCH `/categories/<id>`
- **Description**: Updates an existing category by `category_id`.
- **Required fields**:
  - `name`: The new name of the category.
  - `description`: The new description of the category.
- **Response**: Returns the updated category if successful. If no changes were made, it returns a 200 status with a message. If the category is not found, it returns a 404 error. In case of failure, it returns a 500 error.

#### DELETE `/categories/<id>`
- **Description**: Deletes a category by `category_id`.
- **Response**: Returns a success message if the category is deleted. If the category is not found, it returns a 404 error.

### 2. `ApprovedDonationRequestsByCategoryResource`

This resource is used by authenticated donors or users to fetch approved donation requests that belong to a specific category.

#### GET `/approved-donations/category/<category_id>`
- **Description**: Fetches all approved donation requests for a specific category, based on `category_id`. Only users with the role `donor` or `user` can access this endpoint.
- **Response**: Returns a list of approved donation requests in JSON format. If there are no approved requests for the category, it returns a 404 error. If the user does not have the correct role, it returns a 403 error.

### Authentication & Authorization

- **JWT Authentication**: The `ApprovedDonationRequestsByCategoryResource` endpoint requires the user to be authenticated using JWT tokens. The `jwt_required` decorator ensures the user is authenticated before accessing the resource.
- **Role-Based Authorization**: Only users with the `donor` or `user` roles are allowed to access the approved donation requests for a category. The `admin_required` decorator ensures that only admins can create, update, or delete categories.

## Models

### Categories
- **category_id**: Primary key, unique identifier for the category.
- **name**: Name of the category (required).
- **description**: Description of the category (required).

### Users
- **user_id**: Primary key, unique identifier for the user.
- **role**: The role of the user (e.g., `admin`, `donor`, `user`).

### DonationRequest
- **donation_request_id**: Unique identifier for a donation request.
- **category_id**: The category ID linked to the donation request.
- **status**: The status of the donation request (e.g., `approved`, `pending`).

## Endpoints

### Category Management Endpoints

| HTTP Method | Endpoint               | Description                          | Required Role |
|-------------|------------------------|--------------------------------------|---------------|
| GET         | `/categories`           | Get a list of all categories         | Any           |
| GET         | `/categories/<id>`      | Get a specific category by ID        | Any           |
| POST        | `/categories`           | Create a new category                | Admin         |
| PATCH       | `/categories/<id>`      | Update an existing category by ID    | Admin         |
| DELETE      | `/categories/<id>`      | Delete a category by ID              | Admin         |

### Approved Donation Requests Endpoints

| HTTP Method | Endpoint                                | Description                                     | Required Role |
|-------------|-----------------------------------------|-------------------------------------------------|---------------|
| GET         | `/approved-donations/category/<category_id>` | Get approved donation requests by category       | Donor, User   |

## Example Requests

### 1. Creating a Category

**POST** `/categories`

Request body:
```json
{
  "name": "Health",
  "description": "Donation requests related to health initiatives"
}
```
# Donation Report API

This API provides functionality for generating detailed reports about donations and donation requests. The report includes various statistics such as total donations, pending and approved donation requests, donations by category, and remaining donations needed to meet the targets of each donation request. The API also stores each generated report in a `Reports` table.

## Overview

The core of the API consists of a single resource: `ReportResource`. This resource is used to generate and return a comprehensive donation report, which includes the following data:

1. Total donations amount.
2. Total number of donation requests (pending and approved).
3. Donations summarized by category.
4. Remaining donations required to meet the target for each donation request.
5. Detailed lists of all donation requests (approved, pending).
6. A historical record of generated reports.

## Authentication

This API requires authentication using JSON Web Tokens (JWT). The endpoint to generate reports is secured, meaning only authorized users can access it.

- **JWT Authentication**: The `jwt_required` decorator ensures that the user must be authenticated to access the report generation functionality.
- **Role-based Authorization**: While the `admin_required` decorator is commented out in the current implementation, you can modify the code to restrict access to admin users only if needed.

## Key Resource

### `ReportResource`

The `ReportResource` handles the generation of the summarized donation report. When a GET request is made to this resource, it calculates and returns the following data:

- **Total donations amount**: Sum of all donations made.
- **Total donation requests**: Count of all donation requests.
- **Total approved requests**: Count of donation requests with status "approved".
- **Total pending requests**: Count of donation requests with status "pending".
- **Donations by category**: Total donation amounts grouped by category.
- **Remaining donations for each request**: For each donation request, the report includes the target amount, donated amount, and remaining amount to meet the target.
- **All donation requests**: A complete list of all donation requests, including their status and the donated amount.
- **Approved donation requests**: A filtered list of donation requests that have been approved.

### Endpoint

#### `GET /report`
- **Description**: Generates a donation report with various statistics and details.
- **Authentication**: Requires a valid JWT token.
- **Response**: Returns a JSON object containing the generated report data.

### Example Request

**GET** `/report`

Headers:
```http
Authorization: Bearer <your_jwt_token>
```




     

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flask-charity-management-api.git
   cd flask-charity-management-api
