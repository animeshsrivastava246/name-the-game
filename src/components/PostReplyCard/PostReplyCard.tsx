import { PostReplyType } from "../../types/postType";
import { Typography } from "@mui/material";
import styles from "./card.module.css";

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
        10 mins ago | July 14, 2023
      </Typography>
    </div>
  );
}

export default PostReplyCard;
