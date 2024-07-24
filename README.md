# User Management API
## Overview

The User Management API provides endpoints to create and retrieve user information from the database.

## Endpoints
### Create a User

- **Endpoint:** `POST /user`
- **Description:** Creates a new user in the database.
- **Request Body:**
  ```json
  {
    "name": "john",
    "age": 30
  }

### Fetch Users

- **Endpoint:** `GET /user`
- **Description:** Retrieves users from the database based on query parameters.

#### Query Parameters

- `name` (optional): Filter users by name.
- `page` (optional): Page number for pagination. Default is `1`.
- `limit` (optional): Number of users per page. Default is `5`.
- `sort` (optional): Sorting order. Options are `asc` for ascending and `desc` for descending. Default is `asc`.

#### Request Example

```bash
curl "http://api-url/user?name=Ashutosh&page=1&limit=5&sort=asc"
