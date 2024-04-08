import axios from "axios";
import type { ContactRequestDTO } from "@/models/contact/ContactRequestDTO";

/**
 * Service class for feedback operations.
 */
export class FeedbackService {
  private static readonly api_url = "http://localhost:8080/api/v1/feedback";

  /**
   * Sends feedback to the backend.
   * @param feedback The feedback to be sent.
   */
  public static async sendFeedback(feedback: ContactRequestDTO): Promise<void> {
    try {
      await axios.post(this.api_url + "/submit", feedback);
    } catch (err) {
      throw err;
    }
  }
}
