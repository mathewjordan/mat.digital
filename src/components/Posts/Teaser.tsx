import UILink from "../UI/Link";

// @ts-ignore
const PostsTeaser = ({ slug }) => {
  return (
    <>
      <div>
        <UILink href={`/posts/${slug}`}>{slug}</UILink>
      </div>
    </>
  );
};

export default PostsTeaser;
