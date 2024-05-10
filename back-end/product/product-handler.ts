import { RequestHandler } from "express";
import { StandardResponse } from "../other_helpers/standard_response";
import { Product, ProductModel } from './product-schema';
import { CustomErrorHandler } from "../error_helpers/response_error";
import { RequestBodyProduct } from "../other_helpers/types";


export const add_product_handler: RequestHandler<unknown, StandardResponse<string>, RequestBodyProduct> = async (req, res, next) => {

    try {

        const token = req.token;

        if (!token) throw new CustomErrorHandler("Token is required to add a product", 404);

        const { _id: user_id, fullname, email, role } = token;

        if (role !== 'ADMIN') throw new CustomErrorHandler("Unauthorized user", 403);

        const product = req.body;
        const { productname, price, owner, product_copies_number } = req.body;

        if (!productname || !price || !owner || product_copies_number < 1) {
            throw new CustomErrorHandler(
                "Product name, price, owner and copies are required",
                401
            );
        }

        const findproduct = await ProductModel.findOne({ productname: productname });

        if (findproduct) throw new CustomErrorHandler("Product already exists", 400);

        const addproduct = await ProductModel.create({
            ...product,
            added_by: { user_id, fullname, email }
        });


        res.status(201).json({ success: true, data: `Product successfully added: ${addproduct._id.toString()}` });

    } catch (error) {

        next(error);
    }
}

export const getone_productname_handler: RequestHandler<{ product_name: string }, StandardResponse<Product>, Product> = async (req, res, next) => {

    try {
        const { product_name } = req.params;

        const token = req.token;
        const { role } = token;

        if (!token) throw new CustomErrorHandler("Authorization is required.", 400);

        if (role !== "ADMIN") throw new CustomErrorHandler("Unauthorized user", 403);

        const findproduct = await ProductModel.findOne({ productname: product_name });

        if (!findproduct) throw new CustomErrorHandler("Could not find product with name", 404);

        res.status(200).json({ success: true, data: findproduct });

    } catch (error) {

        next(error);
    }

}

export const getone_productId_handler: RequestHandler<{ product_id: string }, StandardResponse<Product>, Product> = async (req, res, next) => {

    try {
        const { product_id } = req.params;

        const token = req.token;
        const { role } = token;

        if (!token) throw new CustomErrorHandler("Authorization is required.", 400);

        if (role !== "ADMIN") throw new CustomErrorHandler("Unauthorized user", 403);

        const findproduct = await ProductModel.findOne({ _id: product_id });

        if (!findproduct) throw new CustomErrorHandler("Could not find product with name", 404);

        res.status(200).json({ success: true, data: findproduct });

    } catch (error) {

        next(error);
    }

}

export const delete_product_handler: RequestHandler<{ product_id: string }, StandardResponse<string>, Product> = async (req, res, next) => {

    try {
        const { product_id } = req.params;

        const token = req.token;

        const findproduct = await ProductModel.findOne({ _id: product_id });

        if (!findproduct) throw new CustomErrorHandler("Product not found", 404);

        let productStatus = findproduct.status;

        let role = token.role;

        if (role !== "ADMIN") throw new CustomErrorHandler("Unauthorized user", 403);

        if (productStatus === "In-Cart") throw new CustomErrorHandler("Product is unavailable", 400);

        const deleteproduct = await ProductModel.deleteOne({ _id: product_id });

        res.status(200).json({ success: true, data: "Product successfully deleted." })

    } catch (error) {
        next(error);
    }
}

export const put_product_handler: RequestHandler<{ product_id: string }, StandardResponse<number>> = async (req, res, next) => {

    try {
        const { product_id } = req.params;

        const product = req.body;

        const token = req.token;

        const findproduct = await ProductModel.findOne({ _id: product_id });

        if (!findproduct) throw new CustomErrorHandler("Produt not found", 404);

        if (!token || token.role !== "ADMIN") throw new CustomErrorHandler("Unauthorized user", 403);

        const updateproduct = await ProductModel.updateOne({ _id: product_id }, { $set: {...product} });

        if (updateproduct.modifiedCount === 0) {
            throw new CustomErrorHandler("Book not found", 404);
        }

        res.status(201).json({ success: true, data: updateproduct.modifiedCount });

    } catch (error) {
        next(error);
    }
}