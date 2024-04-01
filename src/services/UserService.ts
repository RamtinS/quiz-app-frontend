import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import axios from "axios";
import type {AxiosResponse} from 'axios';


export class UserService {
  private static readonly api_url = "http://localhost:8080/api/v1/users"


  public static async searchUserByUsername(username: string, page: number,
                                           pageSize: number): Promise<PublicUserInformationDTO[]> {

    const url = this.api_url + "?" + "search=" + username + "&page=" + page + "&size=" + pageSize;
    console.log("url: " + url);
    try {
      const response: AxiosResponse<PublicUserInformationDTO[]> = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log('error in search service: ' + err);
      throw err;
    }
  }

}