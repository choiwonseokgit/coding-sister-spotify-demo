import axios from "axios";
import { GetCategoriesResponse } from "../models/category";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getCategories = async (
  clientCredentialToken: string
): Promise<GetCategoriesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
