import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { slugify } from '../../function';
import useSocial from '../../queries/useSocial';

const SocialLink = ({ label, to, icon }) => (
    <li className={`social-${slugify(label)} menu-item`}>
        <a className="menu-link" title={label} href={to} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={icon} />
        </a>
    </li>
);

SocialLink.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string,
    icon: PropTypes.object,
};

SocialLink.defaultProps = {
    label: undefined,
    to: undefined,
    icon: undefined,
};

const Social = () => {
    const { facebook, linkedin, youtube, instagram } = useSocial();
    return (
        <ul className="social menu-list d-lg-flex justify-content-lg-end">
            {facebook && <SocialLink label="Facebook" to={facebook} icon={faFacebookF} />}
            {linkedin && <SocialLink label="LinkedIn" to={linkedin} icon={faLinkedinIn} />}
            {youtube && <SocialLink label="YouTube" to={youtube} icon={faYoutube} />}
            {instagram && <SocialLink label="Instagram" to={instagram} icon={faInstagram} />}
        </ul>
    );
};

export default Social;
