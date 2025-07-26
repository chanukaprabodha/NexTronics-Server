import Product from "../model/product.model";
import {ProductDto} from "../dto/product.dto";

export const getAllProducts = async (): Promise<ProductDto[]> => {
    return Product.find()
}

// Save a new product service logic
export const saveProduct = async (product: ProductDto): Promise<ProductDto> => {
    return await Product.create(product);
}

export const getProductById = async (id: string): Promise<any> => {
    const product = await Product.findOne({id: id});
    if (!product) {
        return null;
    }
    return product;
}

export const updateProduct = async (id: string, data: ProductDto) => {
    const product = await Product.findOneAndUpdate({id: id}, data, {new: true});

    if (!product) {
        return null;
    }

    return product;
}

export const deleteProduct = async (id: string) => {
    await Product.deleteOne({id: id});
    return true;
}

export const validateProduct = (product: ProductDto) => {
    if (!product.id || !product.name || !product.price || !product.currency || !product.image) {
        return "All fields are required.";
    }
    return null;
}

export const processUploadedFile = (file: Express.Multer.File | undefined): string | null => {
    if (!file) {
        return null;
    }
    return `/uploads/${file.filename}`;
}