import { GetCategoriesResponse } from "../models/category";
import api from "../utils/api";

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  try {
    const response = await api.get("/browse/categories");

    return response.data;
  } catch (err) {
    throw err;
  }
};
