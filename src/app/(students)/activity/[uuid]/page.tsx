'use client';

import { useEffect, useState } from "react";

import Activity from "@activity/Activity";

interface Props {
    params: {
        uuid: string;
    }
}

export default function ActivityHolder({params}: Props) {
    const [isLoading, setLoading] = useState(true);
    const [title, setTitle] = useState('Brainwave Activity');
    const [activityProperties, setActivityProperties] = useState({title: 'Activity'});
    
    useEffect(() => {
        fetch(`https://qauinger.com/brainwave/api/${params.uuid}`)
        .then((res) => res.json())
        .then((data) => {
            setActivityProperties(data);
            setTitle(data.title);
            document.title = title;
            setLoading(false);
        })
        .catch(() => {
            setTitle('Invalid Activity');
            document.title = title;
            setLoading(false);
        })
    }, []);

    if (isLoading) return <h1>Loading...</h1>;

    return(
        <div>
            <h3>{title}</h3>
            <Activity data={activityProperties}/>
        </div>
    );
}
