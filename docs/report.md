# SDK-to-Service Transformation Project Report

# Custom Fernet-Compatible Cryptographic Engine to Dockerized REST Microservice

## Abstract

This project demonstrates the transformation of a custom Fernet-compatible cryptographic Software Development Kit (SDK) into a production-oriented REST microservice. The original implementation was developed entirely using the Node.js native crypto module without relying on any external Fernet libraries. The system supports AES-128-CBC encryption, HMAC-SHA256 authentication, PKCS7 padding, URL-safe Base64 encoding, Fernet token generation and parsing, timestamp encoding, TTL validation, tamper detection, key generation, metadata reporting, and service factory patterns.

The primary objective of this project was to evolve the standalone cryptographic library into a secure, containerized, service-oriented architecture capable of serving multiple clients through standardized REST APIs. The final solution incorporates authentication, validation, logging, automated testing, Docker containerization, Docker Compose deployment, CI/CD automation, and production-readiness considerations.

---

# 1. Introduction

Modern applications increasingly adopt service-oriented architectures where functionality is exposed through network-accessible APIs rather than embedded directly within client applications. Cryptographic operations are particularly suitable for centralization because security policies, key management, auditing, and deployment can be controlled from a single service.

The project began with a fully functional custom Fernet-compatible cryptographic SDK. The goal was to transform this SDK into an independently deployable REST microservice while preserving the original cryptographic implementation as the core security engine.

---

# 2. Original SDK Architecture

The initial implementation followed a traditional library-based architecture.

```text
Application
    │
    ▼
Custom Fernet SDK
    │
    ▼
Node.js Native Crypto Module
```

The SDK exposed the following functionality:

* encrypt()
* decrypt()
* generateKey()
* getSecurityMetadata()
* createService()

Core cryptographic capabilities included:

* AES-128-CBC Encryption
* HMAC-SHA256 Authentication
* PKCS7 Padding
* URL-Safe Base64 Encoding
* Fernet Token Assembly
* Fernet Token Parsing
* Timestamp Encoding
* TTL Validation
* Tamper Detection
* Key Generation

While effective, this architecture required direct integration into every consuming application.

---

# 3. Motivation for SDK-to-Service Transformation

Several limitations motivated the transformation:

### Reusability

Multiple applications can consume a centralized cryptographic service without embedding the SDK.

### Language Independence

Any language capable of making HTTP requests can utilize the service.

### Centralized Security

Authentication, logging, validation, and monitoring are implemented once and shared across all clients.

### Scalability

The service can be containerized and replicated horizontally.

### Maintainability

Updates to cryptographic logic can be deployed centrally without requiring client modifications.

---

# 4. Service-Oriented Architecture

The final architecture follows a layered microservice design.

```text
Client
   │
HTTPS REST
   ▼
Fernet REST Service
   │
   ├── Routes
   ├── Controllers
   ├── Middleware
   ├── Validation
   ├── Logging
   └── Authentication
   │
   ▼
Custom Fernet Engine
```

Production deployment architecture:

```text
Client
   │
HTTPS
   ▼
NGINX / API Gateway
   │
   ▼
Fernet REST Service
   │
   ▼
Custom Fernet Engine
```

---

# 5. REST API Design

The service exposes a versioned REST API.

## Health Check

Endpoint:

```http
GET /api/v1/health
```

Response:

```json
{
  "status": "UP",
  "service": "Fernet REST Service",
  "version": "1.0.0"
}
```

---

## Generate Key

Endpoint:

```http
POST /api/v1/generate-key
```

Response:

```json
{
  "success": true,
  "key": "<generated-key>"
}
```

---

## Encrypt

Endpoint:

```http
POST /api/v1/encrypt
```

Request:

```json
{
  "plaintext": "Hello Fernet"
}
```

Response:

```json
{
  "success": true,
  "ciphertext": "gAAAAA..."
}
```

---

## Decrypt

Endpoint:

```http
POST /api/v1/decrypt
```

Request:

```json
{
  "ciphertext": "gAAAAA..."
}
```

Response:

```json
{
  "success": true,
  "plaintext": "Hello Fernet"
}
```

---

## Metadata

Endpoint:

```http
GET /api/v1/metadata
```

Response:

```json
{
  "library": "Custom Fernet-Compatible Engine",
  "encryptionAlgorithm": "AES-128-CBC",
  "authenticationAlgorithm": "HMAC-SHA256",
  "paddingScheme": "PKCS7",
  "encoding": "URL-Safe Base64",
  "tamperProtection": true,
  "ttlSupport": true
}
```

---

# 6. Security Architecture

Security was a primary consideration throughout the transformation.

## Cryptographic Security

### Encryption

* AES-128-CBC

### Authentication

* HMAC-SHA256

### Integrity Protection

* Tamper Detection

### Expiry Management

* TTL Validation

### Encoding

* URL-Safe Base64

---

## API Security

### API Key Authentication

All protected endpoints require:

```http
x-api-key: <secret>
```

### Helmet

Security headers are automatically applied.

### CORS

Cross-Origin Resource Sharing policies are enforced.

### Environment Variables

Sensitive values are never hardcoded.

```env
PORT=3000
FERNET_SECRET=<secret>
API_KEY=<secret>
NODE_ENV=production
```

### Rate Limiting

Request throttling protects against abuse and denial-of-service attempts.

### Input Validation

Request payloads are validated before cryptographic operations execute.

---

# 7. Logging and Monitoring

Structured logging was implemented using Winston.

Logged information includes:

* Request Method
* Endpoint
* Timestamp
* Client IP Address

Example:

```json
{
  "method": "GET",
  "url": "/api/v1/health",
  "ip": "::1"
}
```

This improves traceability, debugging, and auditability.

---

# 8. Containerization Strategy

Docker was used to package the service.

## Dockerfile

The service uses:

```text
Node.js 22 Alpine
```

Benefits:

* Small image size
* Fast deployment
* Consistent execution environment

Build Process:

```text
Copy package files
Install dependencies
Copy application code
Expose service port
Start application
```

---

## Docker Compose

Docker Compose enables simplified deployment.

Features:

* Container orchestration
* Environment injection
* Port mapping
* Restart policies

Deployment:

```bash
docker compose up --build
```

Shutdown:

```bash
docker compose down
```

---

# 9. Automated Testing Strategy

Automated validation was implemented using Jest.

## Encryption Test

Verifies token generation.

## Decryption Test

Verifies plaintext recovery.

## Tamper Detection Test

Verifies modified tokens are rejected.

## TTL Validation Test

Verifies expired tokens cannot be decrypted.

Results:

```text
PASS encrypt.test.js
PASS decrypt.test.js
PASS tamper.test.js
PASS ttl.test.js
```

This ensures cryptographic correctness and regression protection.

---

# 10. CI/CD Pipeline

GitHub Actions was integrated for continuous integration.

Pipeline Stages:

```text
Git Push
   │
   ▼
Checkout Repository
   │
   ▼
Install Dependencies
   │
   ▼
Run Jest Tests
   │
   ▼
Build Docker Image
   │
   ▼
Success / Failure Report
```

Benefits:

* Automated verification
* Reduced deployment risk
* Continuous quality assurance

---

# 11. Production Readiness Features

The service includes several production-oriented capabilities.

### Graceful Shutdown

Handles:

* SIGTERM
* SIGINT

allowing safe container termination.

### Health Endpoint

Supports:

* Liveness Checks
* Readiness Checks
* Monitoring Integrations

### Environment-Based Configuration

Supports deployment across:

* Development
* Testing
* Production

### Docker Deployment

Enables portability and repeatable deployments.

---

# 12. Challenges Encountered

Several engineering challenges were encountered and resolved.

### Environment Variable Loading

Resolved through dotenv configuration and Jest setup files.

### Docker Engine Connectivity

Resolved by ensuring Docker Desktop and daemon availability.

### Port Allocation Conflicts

Resolved through container lifecycle management.

### GitHub Actions YAML Validation

Resolved through proper workflow indentation and configuration.

### Automated Test Integration

Resolved through dedicated testing setup and environment initialization.

---

# 13. Key Learnings

This project provided practical experience in:

* Cryptography
* Backend Development
* REST API Design
* Secure Software Engineering
* Containerization
* Docker Compose
* Automated Testing
* Continuous Integration
* DevOps Practices
* Production Deployment Concepts

It demonstrated how a standalone SDK can be transformed into a reusable and scalable service while preserving the underlying cryptographic implementation.

---

# 14. Conclusion

The project successfully transformed a custom Fernet-compatible cryptographic SDK into a secure, Dockerized REST microservice. The original cryptographic engine remained unchanged and continued to serve as the core security component. Additional capabilities including authentication, validation, structured logging, automated testing, Docker deployment, Docker Compose orchestration, and GitHub Actions CI/CD were integrated to create a production-oriented solution.

The final system demonstrates the practical application of software engineering, cryptography, microservices architecture, containerization, testing, and DevOps methodologies within a single cohesive project, making it a strong demonstration of modern backend engineering practices.
