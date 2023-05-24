import { mockFriendsObject } from "@/constants/enums";

export const getFriends = (friends_status, page, limit) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            friends: friends_status.length > 0 ? 
                            mockFriendsObject.filter((element) => friends_status.includes(element?.friend_state)).slice(page * limit, (page + 1) * limit)
                            : mockFriendsObject.slice(page * limit, (page + 1) * limit)
        }), 1000);
    });
}