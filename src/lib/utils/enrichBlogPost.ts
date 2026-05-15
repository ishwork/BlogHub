import 'server-only';

import { BlogPost } from '@/src/types';
import { urlFor } from '@/src/lib/sanityClient';

export const enrichBlogPost = (post: BlogPost): BlogPost => ({
  ...post,
  mainImageUrl: post.mainImage
    ? urlFor(post.mainImage).width(760).height(428).format('webp').url()
    : undefined,
  mainImageOgUrl: post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined,
  body: post.body.map((block) =>
    block._type === 'image'
      ? {
          ...block,
          imageUrl: urlFor(block).width(760).format('webp').url(),
        }
      : block,
  ),
});
