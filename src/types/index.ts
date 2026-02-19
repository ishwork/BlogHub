export type BlogPost = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  imageCredit?: string;
  publishedAt: string;
  body: Array<
    | {
        _type: 'block';
        children: Array<{
          text: string;
          marks?: string[];
        }>;
      }
    | {
        _type: 'image';
        asset: {
          _ref: string;
        };
        alt?: string;
        caption?: string;
        imageCredit?: string;
      }
  >;
};
