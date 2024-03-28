import axios from "axios";
import type {ContactRequestDTO} from "@/models/contact/ContactRequestDTO";

export class FeedbackService {
  private static readonly api_url = "http://localhost:8080/api/v1/feedback"

  public static async sendFeedback(feedback: ContactRequestDTO): Promise<void> {
    try {
      await axios.post(this.api_url + "/submit", feedback);
    } catch (err) {
      throw err;
    }
  }
}

