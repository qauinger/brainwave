'use client';

interface Props {
    params: {
        uuid: string;
    };
}

export default function Activity({ params }: Props) {
    const uuid: string = params.uuid;

    return(
        <div>
            <h1>Activity with UUID: {uuid}</h1>
        </div>
    );
}