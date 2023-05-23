'use client';

interface Props {
    params: {
        uuid: string;
    };
}

export default function Share({ params }: Props) {
    const uuid: string = params.uuid;

    const link = "https://qauinger.com/brainwave/activity/" + uuid

    return (
        <div>
            <h1><span className="bwgradient">Share</span> your activity</h1>
            <p title='Click to Copy' className="fs36 cursor-copy" onClick={() => navigator.clipboard.writeText(link)}>{link}</p>
            <h2><span className="bwgradient-hover cursor-pointer" onClick={() => navigator.clipboard.writeText(link)}>Copy link</span> ~ <a href={"https://qauinger.com/brainwave/activity/" + uuid} className="bwgradient-hover" target="_blank">Preview</a></h2>
        </div>
    );
}
