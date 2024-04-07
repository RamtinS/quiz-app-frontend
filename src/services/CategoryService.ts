import axios from "axios";
import type { AxiosResponse } from "axios";

/**
 * This class provides methods to interact with the category management part of the API.
 */
export class CategoryService {
  private static readonly CATEGORY_API_URL =
    "http://localhost:8080/api/v1/category-management";

  public static async getCategoriesPaginated(
    page: number,
    pageSize: number,
  ): Promise<String[]> {
    const url =
      CategoryService.CATEGORY_API_URL +
      "/categories?page=" +
      page +
      "&size=" +
      pageSize;
    console.log("url: " + url);
    try {
      const response: AxiosResponse<String[]> = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log("error in category service: " + err);
      throw err;
    }
  }
}
