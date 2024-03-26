import axios from "axios";
import type {AxiosResponse} from "axios"
import type {ContactResponseDTO} from "@/models/contact/ContactResponseDTO";
import type {ContactRequestDTO} from "@/models/contact/ContactRequestDTO";

export class FeedbackService {
  private static readonly api_url = "http://localhost:8080/api/v1"

    public static async sendFeedback(feedback: ContactRequestDTO): Promise<ContactResponseDTO> {
        try {
            console.log('Trying to send feedback: ' + feedback);
            const response: AxiosResponse<ContactResponseDTO> = await axios.post(this.api_url + "/feedback", feedback);
            return response.data;
        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }
}