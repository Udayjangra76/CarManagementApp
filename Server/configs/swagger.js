import swaggerJSDoc from 'swagger-jsdoc';
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Management API',
            description: 'API for managing cars',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                // Define the Car schema here
                Car: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Title of the car',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the car',
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Tags related to the car',
                        },
                        carType: {
                            type: 'string',
                            description: 'The type of the car (e.g., Sedan, SUV)',
                        },
                        company: {
                            type: 'string',
                            description: 'Car manufacturing company',
                        },
                        dealer: {
                            type: 'string',
                            description: 'Car dealer name',
                        },
                        images: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uri',
                            },
                            description: 'Array of car image URLs',
                        },
                    },
                    required: ['title', 'description', 'tags', 'carType', 'company', 'dealer', 'images'], // Required fields
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'https://car-management-app-one.vercel.app/',
            },
        ],
    },
    apis: ['./routes/authRoutes.js', './routes/carRoutes.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;