import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='footer'>
            <p className="footer__text">Developed by Chris Fairbanks</p>
            <p className="footer__text_year">© {currentYear}</p>
        </footer>
    );
}

export default Footer;