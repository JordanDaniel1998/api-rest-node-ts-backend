import { Request, Response } from "express";
import Product from "../models/Product.model";

export const createProduct = async (request: Request, response: Response) => {
  try {
    // Segunda forma de guardar un producto
    const product = await Product.create(request.body);

    response.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (request: Request, response: Response) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    response.json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({
        error: "Producto no encontrado",
      });
    }
    response.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (request: Request, response: Response) => {
  try {
    // Verificar que exista el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Actualizar el producto
    const updatedProduct = await product.update(request.body);
    await updatedProduct.save();

    response.json({ data: updatedProduct });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductAvailability = async (
  request: Request,
  response: Response
) => {
  try {
    // Verificar que exista el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Actualizar el producto
    product.availability = !product.dataValues.availability;
    await product.save();

    response.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (
  request: Request,
  response: Response
) => {
  try {
    // Verificar que exista el producto
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(404).json({
        error: "Producto no encontrado",
      });
    }

    // Actualizar el producto
    await product.destroy();

    response.json({ data: "Producto eliminado" });
  } catch (error) {
    console.log(error);
  }
};
