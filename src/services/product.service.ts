import Product from "../model/product.model";
import {ProductDto} from "../dto/product.dto";

export const getAllProducts = async (): Promise<ProductDto[]> => {
    return Product.find()
}

// Save a new product service logic
export const saveProduct = async (product: ProductDto): Promise<ProductDto> => {
    return await Product.create(product);
}

export const getProductById = async (id: number): Promise<any> => {
    console.log(`Fetching product with ID: ${id}`);

    const product = await Product.findOne({id: id});

    console.log(`Product found: ${product}`);

    return product;
}

export const updateProduct = async (id: number, data: ProductDto) => {
    const product = await Product.findOneAndUpdate({id: id}, data, {new: true});

    if (!product) {
        return null;
    }

    return product;
}

export const deleteProduct = async (id: number) => {
    /*const index = productList.findIndex(product => product.id === id);

    if (index === -1) {
        return false;
    }

    // Remove the product from the list
    productList.splice(index, 1);
    return true;*/
    await Product.deleteOne({id: id});
    return true;
}

export const validateProduct = (product: ProductDto) => {
    if (!product.id || !product.name || !product.price || !product.currency || !product.image) {
        return "All fields are required.";
    }
    return null;
}