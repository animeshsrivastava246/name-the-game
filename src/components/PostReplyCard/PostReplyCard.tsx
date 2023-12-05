import { Typography } from "@mui/material";
import styles from "./card.module.css";
import { PostReplyType } from "@/models/reply";

function PostReplyCard({ reply }: { reply: PostReplyType }) {
	return (
		<div className={styles.reply_card}>
			<Typography variant="body2" className={styles.reply_text}>
				{reply.description}
			</Typography>
			<Typography variant="subtitle2" className={styles.reply_from}>
				From: <span>{reply.name}</span>
			</Typography>
			<Typography variant="caption" className={styles.reply_time}>
				<span>{reply.created_at}</span>
			</Typography>
		</div>
	);
}

export default PostReplyCard;
