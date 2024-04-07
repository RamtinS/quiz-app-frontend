import axios from "axios";
import { ExpiredTokenService } from "@/services/ExpiredTokenService";

/**
 * Service class for handling errors during HTTP requests.
 */
export class ErrorHandlingService {
  /**
   * Handles errors occurred during HTTP requests.
   *
   * @param error The error object to handle.
   * @param description Description of the error context.
   * @returns The error message.
   */
  public static async handleRequestError(
    error: any,
    description: string,
  ): Promise<string> {
    let errorMessage: string;

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        errorMessage = "You are not authorized to perform this action.";
        await ExpiredTokenService.refreshAccessToken();
      } else {
        errorMessage = error.response.data.errorMessage;
        console.error(
          description + ": " + error.response.data.errorMessage,
          error,
        );
      }
    } else {
      errorMessage = "Error. Please try again later.";
      console.error(
        description + ": " + error.response.data.errorMessage,
        error,
      );
    }

    return errorMessage;
  }
}
