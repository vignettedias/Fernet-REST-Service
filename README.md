# Fernet REST Service

## Overview

Fernet REST Service is a Dockerized REST microservice built around a custom Fernet-compatible cryptographic engine implemented entirely using Node.js native crypto primitives.

The project demonstrates the transformation of a standalone cryptographic SDK into a production-oriented service architecture supporting encryption, decryption, key management, authentication, containerization, automated testing, and CI/CD.

---

## Features

* AES-128-CBC Encryption
* HMAC-SHA256 Authentication
* PKCS7 Padding
* URL-safe Base64 Encoding
* Fernet Token Generation
* Fernet Token Parsing
* Timestamp Encoding
* TTL Validation
* Tamper Detection
* API Key Authentication
* Request Validation
* Structured Logging
* Docker Support
* Docker Compose Deployment
* GitHub Actions CI/CD
* Automated Test Suite

---

## Technology Stack

* Node.js 22
* Express.js
* Native Crypto Module
* Jest
* Supertest
* Docker
* Docker Compose
* GitHub Actions

---

## API Endpoints

GET /api/v1/health

POST /api/v1/generate-key

POST /api/v1/encrypt

POST /api/v1/decrypt

GET /api/v1/metadata

---

## Deployment

docker compose up --build

---

## Testing

npm test

---

## License

MIT
