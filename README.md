
# Resume analyzer / parser using AI

This project is a Resume Parsing API that extracts structured information from resumes in PDF format. It leverages Ollama AI for intelligent text extraction and processing.


## Features

- Securely extract text from a resume PDF

- Use AI to format extracted data into JSON

- Store structured data in MongoDB

- Encryption and Decrpytion of data such as Username , email

- Searches for resume from the database

## Installation

## Prerequisites

- Node.js installed

- MongoDB instance running

- Ollama AI server set up locally

steps
 
 1. Clone repository
```bash
 
git clone https://github.com/aricction/neobuild-assignment.git
```
2. Navigate to project folder
```bash
cd neobuild-assignment
```

3. Install dependencies
```bash
npm install
```
4. Start the server
```bash
node server.js
```
    
## Tech Stack

**Server:** 
- NodeJS & expressJS
- MongoDB
- JWT
- Ollama LLM
- 

## API endpoints

## 1. POST / Login
- Endpoint allows users to log in securly using encrypted credentials
- verifes the user's identity and returns a JWT token for authentication

Run the test file to and Copy the Output for Postman
```bash
 node testLogin.js
```
Request Body
```bash
 {
    "encryptedUserName": {
        "iv": "e54f4d6327802ac8726a2bfe65fe1ff3",
        "encryptedData": "9d1ec13fd676a96365bb0590a19d",
        "authTag": "fc8bd24beca73bd515e5fd3b71c4ac3b"
    },
    "encryptedEmail": {
        "iv": "336c16c59afd3a1706766b93ea4a2e07",
        "encryptedData": "91ae4445229eaea448f5949a2c7ef84914",
        "authTag": "a547e97e49dea14ba68b70a0f5c27cbf"
    },
    "password": "0511174"
}
```
Response 
```bash
  {
   "message":"login successfull",
   "token": "<JWT_TOKEN>"
  }
```




## 2.  POST / extractText
- endpoint for extracting raw text from pdf file
- returns structured JSON data
- return 401 if token is invalid

Request headers:
- Content-Type: application/JSON
- Authorization: Bearer <JWT_TOKEN>
 


Request Body

```bash
  {
   "url" : "https://dhli.in/uploaded_files/resumes/resume_404.pdf"
  }
```
- url (string) - the publicly accessible URL of the resume pdf

Response 

```bash
{
  "msg": "Text extracted and structured successfully",
  "data": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "education": {
      "degree": "B.Tech",
      "branch": "Computer Science",
      "institution": "XYZ University",
      "year": "2023"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "ABC Corp",
      "start_date": "2021",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "React", "Node.js"],
    "summary": "Experienced Software Engineer specializing in full-stack development."
  }
}
```

## 3. GET / searchUsers
- searches for applicants by name in the database and returns matching results

Headers
```bash
  {
    Authorization : "Bearer <JWT_TOKEN>"
  }
```
- A valid JWT token is required for authentication

Request Query parameters
```bash
  {
    name : "john"
  }
```
- name (string) - The name of the applicant to search for.

Response
```bash
{
  "msg": "Text extracted and structured successfully",
  "data": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "education": {
      "degree": "B.Tech",
      "branch": "Computer Science",
      "institution": "XYZ University",
      "year": "2023"
    },
    "experience": {
      "job_title": "Software Engineer",
      "company": "ABC Corp",
      "start_date": "2021",
      "end_date": "Present"
    },
    "skills": ["JavaScript", "React", "Node.js"],
    "summary": "Experienced Software Engineer specializing in full-stack development."
  }
}
```
