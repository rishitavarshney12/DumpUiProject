import axios from "axios";
import { ApiRoutes } from "../app/api-routes";
import { AuthResponse } from "../models/message";

export const AuthenticateUser = async (
  username: string,
  password: string | null
): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
      ApiRoutes.getUsersValidate,
      {
        username,
        password,
      }
    );
    return data;
};
