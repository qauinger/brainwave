import gif1 from '@gif/pepo-party-celebrate.gif';
import gif2 from '@gif/chubbicorns-chubbicorn.gif';
import gif3 from '@gif/dancing-blob.gif';
import gif4 from '@gif/dinosandcomics-dinosaur.gif'
import gif5 from '@gif/funderparty-happy.gif'
import gif6 from '@gif/oh-yeah-pikachu.gif'
import gif7 from '@gif/oh-yeah.gif'
import gif8 from '@gif/party-popper-confetti.gif'
import gif9 from '@gif/puglie-puglie-pug.gif'
import gif10 from '@gif/party-popper-congratulation.gif'
import Image from 'next/image';

export default function RandomGif() {
    switch(Math.floor(Math.random() * 10)) {
        case 0: return(<Image src={gif1} className='correct-gif' alt='Correct GIF' />);
        case 1: return(<Image src={gif2} className='correct-gif' alt='Correct GIF' />);
        case 2: return(<Image src={gif3} className='correct-gif' alt='Correct GIF' />);
        case 3: return(<Image src={gif4} className='correct-gif' alt='Correct GIF' />);
        case 4: return(<Image src={gif5} className='correct-gif' alt='Correct GIF' />);
        case 5: return(<Image src={gif6} className='correct-gif' alt='Correct GIF' />);
        case 6: return(<Image src={gif7} className='correct-gif' alt='Correct GIF' />);
        case 7: return(<Image src={gif8} className='correct-gif' alt='Correct GIF' />);
        case 8: return(<Image src={gif9} className='correct-gif' alt='Correct GIF' />);
        case 9: return(<Image src={gif10} className='correct-gif' alt='Correct GIF' />);
        default: return(<Image src={gif1} className='correct-gif' alt='Correct GIF' />);
    }
}
