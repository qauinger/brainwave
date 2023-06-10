'use client';

import AddingNum from '@activity/addingNum';
import AdditionFactsOfNum from '@activity/additionFactsOfNum';
import SubtractingNum from '@activity/subtractingNum';
import AddingDoubles from '@activity/addingDoubles';
import AddingDoublesPlusNum from '@activity/addingDoublesPlusNum';
import MultiplyingDoubles from '@activity/MultiplyingDoubles';

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
        case 'addingDoubles': return(<AddingDoubles properties={properties}/>)
        case 'addingDoublesPlusNum': return(<AddingDoublesPlusNum properties={properties}/>)
        case 'multiplyingDoubles': return(<MultiplyingDoubles properties={properties}/>)
        default: return(<>Invalid activity</>);
    }
}
