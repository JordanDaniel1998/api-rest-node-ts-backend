import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: The product ID
 *        example: 1
 *      name:
 *        type: string
 *        description: The product name
 *        example: "Monitor 24 Pulgadas"
 *      price:
 *        type: number
 *        description: The product price
 *        example: "300"
 *      availability:
 *        type: boolean
 *        description: The product availability
 *        example: true
 */

// ----------------------- Routing ----------------------------
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor de 24 Pulgadas
 *              price:
 *                type: number
 *                example: "399"
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid input data
 */
router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successfully response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Successfully response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Not found
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Return the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *         type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Monitor de 24 Pulgadas
 *              price:
 *                type: number
 *                example: "399"
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successfully response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Invalid input data
 *      404:
 *        description: Product Not Found
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update Product availability
 *    tags:
 *      - Products
 *    description: Return the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Successfully response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Invalid input data
 *      404:
 *        description: Product Not Found
 */
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  updateProductAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by a given ID
 *    tags:
 *      - Products
 *    description: Return a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      required: true
 *      schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Successfully response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto eliminado'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */
router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no válido"),
  handleInputErrors,
  deleteProductById
);

export default router;
