import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RandomGif() {
    const [gifUrl, setGifUrl] = useState('');

    const fetchRandomGif = () => {
        fetch('https://qauinger.com/brainwave/api/gif')
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Error fetching random GIF');
        })
        .then(data => {
            const url = URL.createObjectURL(data);
            setGifUrl(url);
        })
        .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchRandomGif();
    }, []);

    return (
        <div>
            <Image className='correct-gif' src={gifUrl} alt="Celebratory GIF" width={100} height={100} placeholder='empty' loading='eager'/>
        </div>
    );
}
