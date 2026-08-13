import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"ImageGram API",
            version:"1.0.0",
        },
        servers:[
            {
                url:"http://localhost:4000",
            }
        ],
    },
    apis:["./src/router/*.js"],         
}
export const swaggerSpec=swaggerJSDoc(options);