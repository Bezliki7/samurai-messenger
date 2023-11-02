

export const userToFollowUnfollow = (item: Array<any>, uId: string,
    uIdFromAction: number, objFollowed: { followed: boolean }) =>
        item.map(u => {
            if (u[uId] === uIdFromAction) {
                return { ...u, ...objFollowed }
            }
            return u
        })
