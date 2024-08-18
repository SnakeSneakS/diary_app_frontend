import { UserProfileEndpoint } from "../../config/endpoints";

export type UserProfile = {
    id: number,
    email: string,
}

export const getUserProfile = async () => {
    const response = await fetch(UserProfileEndpoint, {
        method: "GET",
        credentials: "include",
    });
    const data: UserProfile = await response.json() as UserProfile;
    return data;
}
