'use client';

import AddingNum from '@activity/addingNum';
import AdditionFactsOfNum from '@activity/additionFactsOfNum';
import SubtractingNum from '@activity/subtractingNum';
import SubtractionFactsOfNum from '@activity/subtractionFactsOfNum';

interface Props {
    data: {
        title: string
        [key: string]: any;
    }
}

export default function Activity(params: Props): JSX.Element {
    const properties = params.data;
    switch (params.data['activity']) {
        case 'addingNum': return(<AddingNum properties={properties}/>)
        case 'additionFactsOfNum': return(<AdditionFactsOfNum properties={properties}/>)
        case 'subtractingNum': return(<SubtractingNum properties={properties}/>)
        case 'subtractionFactsOfNum': return(<SubtractionFactsOfNum properties={properties}/>)
        default: return(<></>);
    }
}