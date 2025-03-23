import { useAtom } from 'jotai';
import React from 'react';
import { checkPostVisitAtom } from '../../store/PostVisitStore';

type IsVisitedProps = {
    postId: string
}

const IsVisited: React.FC<IsVisitedProps> = ({ postId }) => {


    const [checkPostVisit] = useAtom(checkPostVisitAtom)


    return (<>
        <span className={`${!checkPostVisit(postId) ? 'hidden' : ''}  px-2 py-1 text-xs font-semibold text-green-700 bg-green-200  absolute top-0 right-12`}>
            Viewed
        </span>
    </>)
}

export default IsVisited

