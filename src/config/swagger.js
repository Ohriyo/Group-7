import swaggerJsdoc from "swagger-jsdoc";

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Group 7 API",
      version: "1.0.0",
      description:
        "API for the Group 7 student management backend, with JWT-based authentication. " +
        "All `/student` endpoints require a valid Bearer token — register or log in via " +
        "the `/auth` endpoints below to obtain one.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local development server",
      },
    ],
    tags: [
      { name: "Auth", description: "Registration, login, logout, and the current user" },
      { name: "Students", description: "CRUD operations on student records (all protected)" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            'Paste just the token (no "Bearer " prefix — Swagger UI adds that automatically). ' +
            "Obtain one from POST /auth/login.",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Rio Pana" },
            email: { type: "string", format: "email", example: "rio@example.com" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Student: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Rio Pana" },
            age: { type: "integer", example: 20 },
            course: { type: "string", example: "BS Computer Science" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  example: "INVALID_CREDENTIALS",
                  description: "Stable, machine-readable identifier — safe to branch on in client code",
                },
                message: { type: "string", example: "Invalid email or password" },
                details: {
                  type: "array",
                  nullable: true,
                  description: "Present on validation errors — one entry per invalid field",
                  items: {
                    type: "object",
                    properties: {
                      field: { type: "string", example: "email" },
                      message: { type: "string", example: "Email is required" },
                    },
                  },
                },
                timestamp: { type: "string", format: "date-time" },
                path: { type: "string", example: "/auth/login" },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
