import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";

type PartialVote = Pick<Vote, "type">

interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({ subredditName, post, commentAmt, votesAmt, currentVote }) => {
  
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-md shadow border border-dashed border-2">
      
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient postId={post.id} initialVote={currentVote?.type} initialVoteAmt={votesAmt}/>

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs">
            {subredditName ? (
              <>
                <a
                  href={`/r/${subredditName}`}
                  className="underline text-sm underline-offset-2"
                >
                  r/{subredditName}
                </a>
                <span className="px-1">.</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6">
              {post.title}
            </h1>
          </a>
          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content}/>
            
            {pRef.current?.clientHeight === 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-background to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="z-20 text-sm p-4 sm:px-6 bg-secondary">
        <a href={`/r/${subredditName}/post/${post.id}`} className="w-fit flex items-center gap-2">
            <MessageSquare className="h-4 w-4"/>{commentAmt} comments.
        </a>
      </div>
    </div>
  );
};

export default Post;
