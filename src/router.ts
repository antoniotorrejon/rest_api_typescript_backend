import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components: 
 *      schemas: 
 *          Product: 
 *              type: object
 *              properties: 
 *                  id: 
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availabilty:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of product
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing
router.get('/', getProduct)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags: 
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters: 
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID      
 *              404:
 *                  description: Not found
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 40 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid input data
 */

router.post('/', 
        //Validación
        body ('name').notEmpty().withMessage("El nombre del producto no puede ir vacío"),
        body ('price')
                    .isNumeric().withMessage("El precio del producto debe ser un número")
                    .notEmpty().withMessage("El precio del producto no puede ir vacío")
                    .custom (value => value>0).withMessage("El precio del producto debe ser mayor de 0"),
        handleInputErrors, 
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input
 *          tags:
 *              - Products
 *          description: Return the update product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 40 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product not found
 */

router.put('/:id', 
        param('id').isInt().withMessage('ID no válido'),
        body ('name').notEmpty().withMessage("El nombre del producto no puede ir vacío"),
        body ('price')
                .isNumeric().withMessage("El precio del producto debe ser un número")
                .notEmpty().withMessage("El precio del producto no puede ir vacío")
                .custom (value => value>0).withMessage("El precio del producto debe ser mayor de 0"),
        body ('availability')
                .isBoolean().withMessage("Valor para disponibilidad no válido"),       
    handleInputErrors,  
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Return the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              desciption: The ID of the products to retrieve
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Product'                
 *              400:
 *                  description: Bad request - Invalid Id
 *              404:
 *                  description: Not found
 */

router.patch('/:id', 
        param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,  
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags:
 *              - Products
 *          description: Return a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              desciption: The ID of the products to delete
 *              required: true
 *              schema: 
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: string
 *                              value: "Producto eliminado"      
 *              400:
 *                  description: Bad request - Invalid Id
 *              404:
 *                  description: Not found
 */

router.delete('/:id', 
        param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,  
    deleteProduct)

export default router