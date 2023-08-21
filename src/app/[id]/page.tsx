"use client";
import { useState, useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { PostType } from "./../../models/post";
import { PostReplyType } from "./../../models/reply";
import AddReply from "./../../components/modals/AddReply";
import PostReplyCard from "./../../components/PostReplyCard/PostReplyCard";
import { POSTS } from "../page";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Header from "./../../components/Header/Header";

const REPLIES: PostReplyType[] = [
  {
    id: "1",
    name: "Kushagra Agnihotri",
    email: "kushagra@gmail.com",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis modi minus distinctio nihil quaerat beatae perferendis nulla aliabss vooluptatum.",
  },
  {
    id: "2",
    name: "Kushagra Agnihotri",
    email: "kushagra@gmail.com",
    description: "Lorem ipsum.",
  },
  {
    id: "3",
    name: "Kushagra Agnihotri",
    email: "kushagra@gmail.com",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
];

function PostPage() {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [post, setPost] = useState<PostType>();
  const params = useParams();

  useEffect(() => {
    if (POSTS) setPost(POSTS.find((p) => p.id === params.id));
  }, [params.id]);

  return post ? (
    <>
      <AddReply
        isOpen={isAddPostOpen}
        onClose={() => {
          setIsAddPostOpen(false);
        }}
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
            replies <span>({REPLIES.length})</span>
          </Typography>
          <Button onClick={() => setIsAddPostOpen(true)} variant="text">
            Help The Fellow Gamer!
          </Button>
        </div>
        <div className={styles.replies_container}>
          {REPLIES.map((reply) => (
            <PostReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      </div>
    </>
  ) : null;
}

export default PostPage;
