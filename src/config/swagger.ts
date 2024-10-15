import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                descriptions: 'API operations related to products'
            }
        ],
        info: {
            title: 'Rest API node.js / Express / TypeSript',
            version: '1.0.0',
            description: 'API docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://img.freepik.com/vector-premium/diseno-minimo-ejemplo-logotipo-tecnologia-letra-e_608606-271.jpg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar{
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export default swaggerSpec
export {
    swaggerUiOptions
}