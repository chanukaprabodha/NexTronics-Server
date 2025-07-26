import {Request, Response} from 'express';
import * as productService from '../services/product.service';

// Controller function to get all products
export const getAllProducts = async (req: Request,
                                     res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

// Controller function to save a new product
export const saveProduct = async (req: Request,
                                  res: Response) => {
    try {
        const newProduct = req.body;

        const filePath = productService.processUploadedFile(req.file);
        if (filePath) {
            newProduct.image = filePath;
        }

        const validationError = await productService.validateProduct(newProduct);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }

        const savedProduct = await productService.saveProduct(newProduct);
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }

}

// Controller function to update an existing product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            res.status(400).json({
                error: "Invalid product ID"
            });
            return;
        }

        const updatedData = req.body;

        // Process the uploaded file and update the image field if a new file is provided
        const filePath = productService.processUploadedFile(req.file);
        if (filePath) {
            updatedData.image = filePath;
        }

        const updatedProduct = await productService.updateProduct(productId, updatedData);

        if (!updatedProduct) {
            res.status(404).json({
                error: "Product not found"
            });
            return;
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            error: "An error occurred while updating the product"
        });
    }
};
// Controller function to delete a product
export const deleteProduct = (req: Request,
                              res: Response) => {
    const productId = req.params.id;
    if (!productId) {
        res.status(400).json({
            error: "Invalid product ID"
        });
        return;
    }
    const deletedProduct = productService.deleteProduct(productId);
    if (!deletedProduct) {
        res.status(404).json({
            error: "Product Not Found"
        });
        return;
    }
    res.status(200).json({
        message: "Product Deleted Successfully...!"
    })
}

// Controller function to get a product by ID
export const getProductById = async (req: Request,
                               res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        res.status(400).json({
            error: "Invalid product ID"
        });
        return;
    }

    const product = await productService.getProductById(productId);

    if (!product) {
        res.status(404).json({
            error: "Product not found"
        });
        return;
    }

    console.log(`Product found getProductById in controller: ${product}`);
    res.status(200).json(product);

}