import React from 'react';

import './footer.styles.scss';

const Footer = () => (
    <div className="footer-wrapper">
        <div className="footer">
            <div className="copyright">@2020 Urban Dragon Wear</div>
            <div className="contact-info">
                A Portfolio Project<br/>
                2020 React Street<br/>
                Mount Webdev, NY 11111<br/>
                212-111-1111<br/>
            </div>
            <div className="extra-info">No dragons were harmed in the making of this website.</div>
        </div>
    </div>
);

export default Footer;