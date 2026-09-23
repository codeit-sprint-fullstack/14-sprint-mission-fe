import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Panda Market API",
      version: "1.0.0",
      description: "Panda Market Sprint Mission 9 API documentation",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },

        TokenResponse: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
            },
          },
        },

        Owner: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            nickname: {
              type: "string",
            },
            image: {
              type: "string",
              nullable: true,
            },
          },
        },

        Comment: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            content: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            owner: {
              $ref: "#/components/schemas/Owner",
            },
          },
        },

        CommentPage: {
          type: "object",
          properties: {
            list: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Comment",
              },
            },
            nextCursor: {
              type: "string",
              format: "uuid",
              nullable: true,
            },
          },
        },

        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "integer",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },
            images: {
              type: "array",
              items: {
                type: "string",
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            owner: {
              $ref: "#/components/schemas/Owner",
            },
          },
        },

        ProductWithLike: {
          allOf: [
            {
              $ref: "#/components/schemas/Product",
            },
            {
              type: "object",
              properties: {
                likeCount: {
                  type: "integer",
                },
                isLiked: {
                  type: "boolean",
                },
              },
            },
          ],
        },

        ProductDetail: {
          allOf: [
            {
              $ref: "#/components/schemas/ProductWithLike",
            },
            {
              type: "object",
              properties: {
                comments: {
                  $ref: "#/components/schemas/CommentPage",
                },
              },
            },
          ],
        },

        Article: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
            },
            content: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            owner: {
              $ref: "#/components/schemas/Owner",
            },
          },
        },

        ArticleWithLike: {
          allOf: [
            {
              $ref: "#/components/schemas/Article",
            },
            {
              type: "object",
              properties: {
                likeCount: {
                  type: "integer",
                },
                isLiked: {
                  type: "boolean",
                },
              },
            },
          ],
        },

        ArticleDetail: {
          allOf: [
            {
              $ref: "#/components/schemas/ArticleWithLike",
            },
            {
              type: "object",
              properties: {
                comments: {
                  $ref: "#/components/schemas/CommentPage",
                },
              },
            },
          ],
        },

        LikeResult: {
          type: "object",
          properties: {
            likeCount: {
              type: "integer",
            },
            isLiked: {
              type: "boolean",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            email: {
              type: "string",
              format: "email",
            },
            nickname: {
              type: "string",
            },
            image: {
              type: "string",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  },
  apis: ["./src/docs/*.swagger.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
