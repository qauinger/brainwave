import Image from 'next/image';
import icon from '@img/icon.svg';

function Header() {
    return(
        <div id="header">
            <a href="https://qauinger.com/brainwave">
                <Image
                    src={icon}
                    alt="Brainwave logo"
                    priority={true}
                />
                Brainwave
            </a>
        </div>
    );
}

function UnlinkedHeader() {
    return(
        <div id="header">
            <a>
                <Image
                    src={icon}
                    alt="Brainwave logo"
                    priority={true}
                />
                Brainwave
            </a>
        </div>
    );
}

export {Header, UnlinkedHeader}; 
