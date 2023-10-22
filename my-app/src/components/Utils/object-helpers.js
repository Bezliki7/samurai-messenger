export const userToFollowUnfollow = (item, uId, uIdFromAction, objFollowed) => 
    item.map(u => {
        if (u[uId] === uIdFromAction) {
            return { ...u, ...objFollowed }
        }
        return u
    })
