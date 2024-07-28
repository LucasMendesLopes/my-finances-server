import { CategorySchema } from "../models/index.js";
import { defaultInternalErrorMessage } from "../constant/index.js";

export const categoriesController = {
    register: async (req, resp) => {
        try {
            const { name, color, type, userId } = req.body;

            await CategorySchema.create({
                name,
                color,
                type,
                userId
            });

            return resp
                .status(201)
                .send({ message: "Categoria cadastrada com sucesso" });
        } catch (error) {
            resp.status(500).send({
                message: defaultInternalErrorMessage,
            });
        }
    },
    getCategories: async (req, resp) => {
        try {
            const { userId } = req.params;
            const { page } = req.query;
            const itemsPerPage = 10;

            const categories = await CategorySchema.find({
                userId
            });

            const totalItems = categories.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const currentPage = parseInt(page) || 1;

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedCategories = categories.slice(startIndex, endIndex);

            resp.status(200).send({
                categories: paginatedCategories,
                currentPage,
                totalPages,
                itemsPerPage,
            });
        } catch (error) {
            resp.status(500).send({
                message: defaultInternalErrorMessage,
            });
        }
    },
    deleteCategory: async (req, resp) => {
        try {
            const { categoryId } = req.params;

            const _id = categoryId;

            await CategorySchema.deleteOne({ _id });

            resp.status(200).send({
                message: "Categoria deletada com sucesso",
            });
        } catch (error) {
            resp.status(500).send({
                message: defaultInternalErrorMessage,
            });
        }
    },
};
