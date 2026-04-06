const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API documentation for the School Management System",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
  components: {
    securitySchemas: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
      },
    },
  },
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
