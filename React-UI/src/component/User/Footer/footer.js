import React from 'react';
import './footer.css';

function Footer() {

    const portFolioLink = () => {
        window.open('https://tausif40.github.io/Portfolio/', '_blank');
    };
    return (
        <>
            <footer className='footer-section'>
                <div className='footer-text text-center py-5 flex justify-between'>
                    <p className='copyright'>Copyright @ 2024 All Right Reserved By. Patel Automotive</p>
                    <p className='developer'>Developed By <b className='nameLink' onClick={portFolioLink}> Mohd. Tausif</b> </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
