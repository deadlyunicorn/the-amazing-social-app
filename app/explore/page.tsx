import { redirect } from "next/navigation";
import { getPosts, userPost } from "../(mongodb)/getPosts";
import { SubmitButtonClient } from "../(components)/SubmitButtonClient";
import { MultipleRowsWrapper } from "../(components)/FormWrapper";
import { ErrorSection } from "../(components)/ErrorSection";
import { handleCreatePost } from "./createPost";
import { formatDate } from "../(lib)/formatDate";

const ExplorePage = async ({ searchParams }: { searchParams: { page: number, error?: string } }) => {

  const page = searchParams.page;

  if (!(+page) || (+page < 1)) {
    redirect(`/explore?page=1`);
  }

  const posts = await getPosts({page:1});

  return (
    <MultipleRowsWrapper>

      {searchParams.error &&
        <ErrorSection>
          {searchParams.error}
        </ErrorSection>
      }

      <section>

        <CreatePost />


      </section>

      <section>

        {posts
          ? <PostsMap posts={posts} />
          : <p className="text-center">It seems no one has posted anything yet.</p>
        }
      </section>



    </MultipleRowsWrapper>

  )
}

const PostsMap = ({ posts }: { posts: userPost[] }) => {

  return (

    <ul>

      {
        posts.map(
          (post, key) => (
            <li
              className="border border-dashed text-center" 
              key={key}>
              {post.content?.textContent}
              <br/>
              By: {post.created_by}@{formatDate(new Date(post.created_at))}
            </li>
          )
        )
      }
    </ul>
  )
}

const CreatePost = () => {

  return (
    <section>
      <h2>Create a post!</h2>
      {/* add images as well !? */}

      <form
        action={handleCreatePost}
        className="
        my-2
        flex flex-col 
        items-center gap-y-4">

        <textarea
          required
          minLength={6}
          maxLength={200}
          placeholder="Today on my way to work.."
          className="
          px-2 py-1 rounded-sm
          bg-white bg-opacity-30
          w-full h-36 resize-none"
          name="post" />

        <SubmitButtonClient />
      </form>


    </section>
  )
}

export default ExplorePage;
