import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

const Gallery = ({ gallery }) => {
    const items = gallery.map(({ file }) => {
        return {
            original: file.url,
            thumbnail: file.url,
        };
    });
    return <ImageGallery items={items} showNav={false} showFullscreenButton={false} showPlayButton={false} />;
};

Gallery.propTypes = {
    gallery: PropTypes.array.isRequired,
};

export default Gallery;
