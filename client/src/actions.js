import { Platform } from "react-native";
import axios from "axios";

export const proxy = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const updateProfile = (fields) => axios.patch(`${proxy}/profile/update`, { draft: fields });
