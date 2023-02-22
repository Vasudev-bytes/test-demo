import React, { forwardRef } from "react";

interface IData {
    userID: string | number;
    displayName: string;
    picture: string;
    score: number;
}

type Props = {
    user: IData,
    id: number
}

const Item = forwardRef(({ user, id }: Props, ref: any) => {
    return (
        <>
            <tr ref={ref}>
                <td>
                    <div className='profile-outer'>
                        <div className='profile-wrapper'>
                            <span className='img-wrapper'><img src={user?.picture} alt='user-profile' /></span>
                            <span className={`rank-count top-three-${id}`}>
                                {id}
                            </span>
                        </div>
                        <div className='name-wrapper name-score-wrapper'>{user?.displayName}</div>
                    </div>
                </td>
                <td>
                    <span className='name-score-wrapper'>{user?.score}</span>
                    <span className='points-wrapper'>points</span>
                </td>
            </tr>
        </>
    )
});

export default Item;
