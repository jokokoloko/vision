import React from 'react';
import Parent from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { contentify } from '../../function';
import Image from '../unit/Image';

const CarouselSlide = ({ container, height, align, space, tint, color, id, source, fade, controls, indicators, interval, pauseOnHover, slides }) => {
    const loopSlide = slides.edges.map(({ node: slide }) => (
        <Parent.Item key={slide.id} className={`slide-${slide.order} color-4`}>
            {slide.image && <Image className="image" source={slide.image.fluid} alternate={contentify(slide.title)} />}
        </Parent.Item>
    ));
    return (
        <Parent
            as="aside"
            className={`block height-${height} align-${align} background-${source ? 'image' : 'none'} color-${color}`}
            id={id}
            fade={fade}
            controls={controls}
            indicators={indicators}
            interval={interval}
            pauseOnHover={pauseOnHover}
        >
            {loopSlide}
        </Parent>
    );
};

CarouselSlide.propTypes = {
    container: PropTypes.string,
    height: PropTypes.string,
    align: PropTypes.string,
    space: PropTypes.string,
    tint: PropTypes.string,
    color: PropTypes.number,
    id: PropTypes.string,
    source: PropTypes.string,
    fade: PropTypes.bool,
    controls: PropTypes.bool,
    indicators: PropTypes.bool,
    interval: PropTypes.number,
    pauseOnHover: PropTypes.bool,
    slides: PropTypes.object.isRequired,
};

CarouselSlide.defaultProps = {
    container: 'container',
    height: 'standard',
    align: 'left',
    space: 'space-xs-50',
    tint: 'tint-none',
    color: 0,
    id: undefined,
    source: undefined,
    fade: undefined,
    controls: undefined,
    indicators: undefined,
    interval: undefined,
    pauseOnHover: undefined,
};

export default CarouselSlide;
