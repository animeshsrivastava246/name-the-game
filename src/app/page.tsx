"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./page.module.css";
import {
	Button,
	CircularProgress,
	Typography,
	useTheme,
} from "@mui/material";
import PostCard from "../components/PostCard/PostCard";
import { PostType } from "../models/post";
import AddPost from "../components/modals/AddPost";
import Link from "next/link";

const Home = () => {
	const [isAddPostOpen, setIsAddPostOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<PostType[]>([]);
	const theme = useTheme();

	const getPosts = useCallback(async () => {
		try {
			setIsLoading(true);
			const resp = await fetch("/api/posts");

			if (!resp.ok) {
				throw new Error(`HTTP error! status: ${resp.status}`);
			}

			const data = await resp.json();
			setPosts(data.data || []);
		} catch (error) {
			console.error("Failed to fetch posts", error);
			setPosts([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<>
			<AddPost
				isOpen={isAddPostOpen}
				onClose={() => setIsAddPostOpen(false)}
				refresh={getPosts}
			/>
			<div className={styles.hero}>
				<h1 className={styles.logo}>
					<span>Name</span>
					<span>The</span>
					<span>Game</span>
				</h1>
				<Typography className={styles.hero_sub} variant="h6" component="p">
					{`A community to identify games from photos or description. Seen a game? 
          Don't remember the name? Don't worry, gamer — we'll tell you!`}
				</Typography>
			</div>

			<div className={styles.main}>
				<div className={styles.actions}>
					<Typography
						variant="h2"
						component="h2"
						sx={{ color: theme.palette.secondary.contrastText }}
					>
						Questions:
					</Typography>
					<Button
						onClick={() => setIsAddPostOpen(true)}
						sx={{
							background: theme.palette.secondary.main,
							color: theme.palette.secondary.contrastText,
							fontWeight: 600,
							mt: 1,
							"&:hover": {
								background: theme.palette.secondary.dark,
							},
						}}
					>
						{"Let's Find Your Game!"}
					</Button>
				</div>

				{isLoading ? (
					<div className={styles.loadingContainer}>
						<CircularProgress size={100} color="secondary" />
					</div>
				) : posts.length === 0 ? (
					<Typography variant="h6" sx={{ mt: 4 }}>
						No posts found. Be the first to ask!
					</Typography>
				) : (
					<div className={styles.posts_container}>
						{posts.map((post) => (
							<Link
								href={`/${post.id}`}
								key={post.id}
								className={styles.post_card}
							>
								<PostCard post={post} />
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
