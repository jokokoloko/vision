import React from 'react';
import PropTypes from 'prop-types';
import { slugify } from '../../function';
import { logicDescription } from '../../logic';
import * as path from '../../path';
import Image from '../unit/Image';
import Link from '../unit/Link';

const ArticlePost = ({ post }) => (
    <article id={post.slug} className="post">
        <figure>
            <Image className="image" source={post.image.fluid} alternate={post.title} />
            {post.type && <div className={`flag flag-${slugify(post.type)}`}>{post.type}</div>}
        </figure>
        <header>
            <h3>
                <Link className="stretched-link" to={path.POST === '/' ? `/${post.slug}` : `${path.POST}/${post.slug}`}>
                    {post.title}
                </Link>
            </h3>
            <p className="date">{post.published || post.createdAt}</p>
        </header>
        <section>
            <p className="excerpt read-more more" dangerouslySetInnerHTML={{ __html: logicDescription(post) }} />
        </section>
    </article>
);

ArticlePost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default ArticlePost;
