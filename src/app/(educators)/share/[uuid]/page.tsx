'use client';

import Image from 'next/image';

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
            <span style={{float:'right'}}><Image src={'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' + link} alt='QR Code' width={500} height={500}/></span>
            <p title='Click to Copy' className="fs36 cursor-copy" onClick={() => navigator.clipboard.writeText(link)}>{link}</p>
            <h2><span className="bwgradient-hover cursor-pointer" onClick={() => navigator.clipboard.writeText(link)}>Copy link</span> ~ <a href={"https://qauinger.com/brainwave/activity/" + uuid} className="bwgradient-hover" target="_blank">Preview</a></h2>
        </div>
    );
}
