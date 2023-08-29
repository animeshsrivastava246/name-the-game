"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";
import PostCard from "./../components/PostCard/PostCard";
import { PostType } from "./../models/post";
import { useTheme } from "@mui/material";
import AddPost from "./../components/modals/AddPost";
import Link from "next/link";

const Home = () => {
	const [isAddPostOpen, setIsAddPostOpen] = useState(false);
	const [posts, setPosts] = useState<PostType[]>([]);
	const theme = useTheme();

	const getPosts = async () => {
		const resp = await fetch("/api/posts");
		const data = await resp.json();
		setPosts(data.data);
	};

	useEffect(() => {
		getPosts();
	}, []);

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
