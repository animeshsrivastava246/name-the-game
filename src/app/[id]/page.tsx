"use client";
import { useState, useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { PostType } from "./../../models/post";
import AddReply from "./../../components/modals/AddReply";
import PostReplyCard from "./../../components/PostReplyCard/PostReplyCard";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Header from "./../../components/Header/Header";

function PostPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [post, setPost] = useState<PostType>();
  const params = useParams();

  const getPost = async () => {
    const resp = await fetch(`/api/posts/${params.id}`);
    const data = await resp.json();
    setPost(data.data);
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return post ? (
    <>
      <AddReply
        isOpen={isAddPostOpen}
        onClose={() => {
          setIsAddPostOpen(false);
        }}
        refresh={getPost}
        postId={post.id}
      />
      <Header />
      <div className={styles.post_body}>
        {post.image && post.image.length > 0 ? (
          <div className={styles.background_container}>
            <img src={post.image} className={styles.background_image} />
          </div>
        ) : null}
        <Grid className={styles.post_details} container>
          <Grid className={styles.post_info} item flex={1}>
            <Typography variant="h3">{post.title}</Typography>
            <Typography variant="caption">
              10 mins ago | July 14, 2023
            </Typography>
            <Typography variant="h6">
              <span>By:</span> {post.name}
            </Typography>
            <Typography variant="body2">{post.description}</Typography>
            <Typography variant="subtitle2" className={styles.post_links}>
              <span>Links:</span>
              {post.links.split(" , ").map((link) => (
                <a
                  key={link}
                  className={styles.link}
                  href={link}
                  target="_blank"
                >
                  {link}
                </a>
              ))}
            </Typography>
          </Grid>
          <Grid item>
            <img
              src={post.image}
              className={styles.post_image}
              alt={post.title}
            />
          </Grid>
        </Grid>
      </div>
      <div className={styles.post_replies}>
        <div className={styles.replies_header}>
          <Typography variant="h4">
            replies <span>({post.replies ? post.replies.length : 0})</span>
          </Typography>
          <Button onClick={() => setIsAddPostOpen(true)} variant="text">
            Help The Fellow Gamer!
          </Button>
        </div>
        <div className={styles.replies_container}>
          {post.replies && post.replies.length > 0 ? (
            post.replies.map((reply) => (
              <PostReplyCard key={reply.id} reply={reply} />
            ))
          ) : (
            <p>No Replies</p>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default PostPage;
