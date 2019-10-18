import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';
import Scroll from '../widget/Scroll';

const Hero = ({ container, height, align, space, opacity, tint, color, id, source, alternate, scroll, children }) => (
    <section id={id} className={`hero block height-${height} align-${align} background-${source ? 'image' : 'none'} color-${color}`}>
        {source && <Image className="fit exact-center absolute" source={source} alternate={alternate} />}
        {children && (
            <div className={`display-table relative ${space} ${tint}`}>
                <div className="display-cell">
                    <div className="zone">
                        <div className={container}>{children}</div>
                    </div>
                </div>
            </div>
        )}
        {scroll && (height === 'fill' || height === 'full') && <Scroll to={scroll} offset={-80} />}
    </section>
);

Hero.propTypes = {
    container: PropTypes.string,
    height: PropTypes.string,
    align: PropTypes.string,
    space: PropTypes.string,
    opacity: PropTypes.string,
    tint: PropTypes.string,
    color: PropTypes.number,
    id: PropTypes.string,
    source: PropTypes.any,
    alternate: PropTypes.string,
    scroll: PropTypes.string,
    children: PropTypes.node,
};

Hero.defaultProps = {
    container: 'container',
    height: 'standard',
    align: 'left',
    space: 'space-xs-50',
    opacity: 'opacity-one',
    tint: 'tint-none',
    color: 0,
    id: undefined,
    source: undefined,
    alternate: undefined,
    scroll: undefined,
    children: undefined,
};

export default Hero;
