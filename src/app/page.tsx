"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";
import PostCard from "./../components/PostCard/PostCard";
import { PostType } from "./../models/post";
import { useTheme } from "@mui/material";
import AddPost from "./../components/modals/AddPost";
import Link from "next/link";

export const POSTS: PostType[] = [
  {
    id: "1",
    title: "Post 1",
    description:
      "a in, assumenda tempore consequatur illum distinctio quis consequuntur autem obcaecati tempora ipsa hic ullam numquam quaerat necessitatibus totam placeat cupiditate dignissimos modi fugiat consectetur? Cumque, amet dignissimos enim inventore atque quia odio corrupti numquam recusandae vel maiores iusto eos ipsa saepe! Doloremque eaque reiciendis architecto, neque debitis, tenetur magni veritatis eius dolor sapiente optio, assumenda modi impedit quasi temporibus ex. Laudantium, doloremque omnis!",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    links:
      "https://fonts.google.com , https://kushagra.com , https://github.com/kushagra-aa , https://fonts.google.com , https://kushagra.com , https://github.com/kushagra-aa",
  },
  {
    id: "2",
    title: "Post 2",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one levelunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one where we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1653597619875-e9db13372101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    links:
      "https://fonts.google.com , https://kushagra.com , https://github.com/kushagra-aa",
  },
  {
    id: "3",
    title: "Post 3",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, unt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onethere were vampire like flying monsters, and multiple stages, I remember there being one level where we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image: "",
    links:
      "https://fonts.google.com , https://kushagra.com , https://github.com/kushagra-aa",
  },
  {
    id: "4",
    title: "Post 4",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1547039996-61c1135690c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1389&q=80",
    links:
      "https://fonts.google.com , https://kushagra.com , https://github.com/kushagra-aa",
  },
  {
    id: "5",
    title: "Post 5",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1507945146573-b204a9bf954f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    links: "",
  },
  {
    id: "6",
    title: "Post 6",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1690669249460-65a76daaf698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=794&q=80",
    links: "",
  },
  {
    id: "7",
    title: "Post 7",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1690369167940-173d3fefc53a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
    links: "",
  },
  {
    id: "8",
    title: "Post 8",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image:
      "https://images.unsplash.com/photo-1690305508319-4758ae8ec05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    links: "",
  },
  {
    id: "9",
    title: "Post 9",
    description:
      "It was a shooting game where we were police, and we used to hunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being one level wherunt monsters, there were vampire like flying monsters, and multiple stages, I remember there being onee we cleared an building from down to top, and a flying villan at top",
    email: "kushagraaagnihotri@gmail.com",
    name: "Kushagra Agnihotri",
    image: "",
    links: "",
  },
];

const Home = () => {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const theme = useTheme();
  const posts = POSTS;

  return (
    <>
      <AddPost
        isOpen={isAddPostOpen}
        onClose={() => {
          setIsAddPostOpen(false);
        }}
      />
      <div className={styles.hero}>
        <h1 className={styles.logo}>
          <span>Name</span>
          <span>The</span>
          <span>Game</span>
        </h1>
        <Typography className={styles.hero_sub} variant="h6">
          {` A community to identify games from photos or description. Seen a game?
          Don't remember the name? Do Not Worry Gamer We'll Tell You!`}
        </Typography>
      </div>
      <div className={styles.main}>
        <div className={styles.actions}>
          <Typography
            style={{
              color: theme.palette.secondary.contrastText,
            }}
            variant="h2"
          >
            Questions:
          </Typography>
          <Button
            onClick={() => setIsAddPostOpen(true)}
            style={{
              background: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              fontWeight: 600,
            }}
          >
            {"Let's Find Your Game!"}
          </Button>
        </div>
        <div className={styles.posts_container}>
          {posts.map((post, i) => (
            <Link
              href={`/${post.id}`}
              key={post.id}
              className={styles.post_card}
            >
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
