import axios from "axios";
import type {AxiosResponse} from "axios";
import type {TagDTO} from "@/models/quiz/TagDTO";

export class TagService {
  private static readonly TAG_API_URL = "http://localhost:8080/api/v1/tag-management"

  public static async getTagsPaginated(page: number, pageSize: number) :Promise<TagDTO[]> {
    const url = TagService.TAG_API_URL + "/tags?page" + page + "&size=" + pageSize;
    try {
      const response: AxiosResponse<TagDTO[]> = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log('error in tag service: ' + err);
      throw err;
    }
  }
}