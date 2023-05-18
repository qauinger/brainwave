import './create.css';
import Link from 'next/link';
import topicsFile from '@curriculum/topics.json';
import activitiesFile from '@curriculum/activities.json';

function Create() {
    return(
        <div>
            <h1><span className="bwgradient">Create</span> an activity</h1>
            <List />
        </div>
    );
}

type Topics = {
    [id: string]: {name: string, color: string}
};

type Activities = {
    [id: string]: {name: string, topic: string, properties: any}
};

const topics = topicsFile as Topics;
const activities = activitiesFile as Activities;

function List() {
    var activitesByTopic: any = [];
    Object.keys(activities).forEach((activity: string) => {
        var topic: string = activities[activity]['topic'];
        if(!Object.keys(activitesByTopic).includes(topic))
            activitesByTopic[topic] = [];
        activitesByTopic[topic].push(activity);
    });
    const curriculum = Object.keys(topics).map((topic: string) =>
        <div key={topic} className="activity-topic">
            <h2 className="activity-topic-title" style={{color: topics[topic]['color']}}>{topics[topic]['name']}</h2>
            <div style={{color: topics[topic]['color']}}>
                {activitesByTopic[topic] == null ? null : activitesByTopic[topic].map((activity: string) =>
                    <h2 key={activity}><Link className="color-hover" style={{'--data-color-hover': topics[topic]['color']} as React.CSSProperties} href={`https://qauinger.com/brainwave/create/${activity}`}>{activities[activity]['name']}</Link></h2>
                )}
            </div>
        </div>
    );                   
    return (
        <div className='indent'>
            <h4># = Any number</h4>
            <div id='activity-container'>
                {curriculum}
            </div>
        </div>
    );
}

export default Create;
