import React from 'react';

function SlideButtonR(props) {
    if(props.to) {
        return(
            <h2><a href={props.to} className="slide-r-hover"><span className="bwgradient-hover">{props.title}</span></a></h2>
        )
    } else {
        return(
            <h2><span className="slide-r-hover cursor-pointer"><span className="bwgradient-hover">{props.title}</span></span></h2>
        )
    }
}

function SlideButtonL(props) {
    if(props.to) {
        return(
            <h2><a href={props.to} className="slide-l-hover"><span className="bwgradient-hover">{props.title}</span></a></h2>
        )
    } else {
        return(
            <h2><span className="slide-l-hover cursor-pointer"><span className="bwgradient-hover">{props.title}</span></span></h2>
        )
    }
}

export { SlideButtonR, SlideButtonL };
