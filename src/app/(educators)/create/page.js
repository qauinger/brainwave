import '../../../../public/css/create.css';
import topics from '../../../../public/curriculum/topics.json';
import activities from '../../../../public/curriculum/activities.json';

function Create() {
    return(
        <div>
            <h1><span className="bwgradient">Create</span> an activity</h1>
            <List />
        </div>
    );
}

function List() {
    var activitesByTopic = {};
    Object.keys(activities).forEach((activity) => {
        var topic = activities[activity]['topic'];
        if(!Object.keys(activitesByTopic).includes(topic))
            activitesByTopic[topic] = [];
        activitesByTopic[topic].push(activity);
    });
    const curriculum = Object.keys(topics).map((topic) =>
        <div key={topic} className="activity-topic">
            <h2 className="activity-topic-title" style={{color: topics[topic]['color']}}>{topics[topic]['name']}</h2>
            <div style={{color: topics[topic]['color']}}>
                {activitesByTopic[topic] == null ? null : activitesByTopic[topic].map((activity) =>
                    <h2 key={activity}><a className="color-hover" style={{"--data-color-hover": topics[topic]['color']}} href={'/create/' + activity}>{activities[activity]['name']}</a></h2>
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
