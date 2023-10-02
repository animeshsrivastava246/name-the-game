import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./card.module.css";
import { PostType } from "@/models/post";

function PostCard({ post }: { post: PostType }) {
  const theme = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      }}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={post.name}
        // subheader={`${post.created_at.split('T')[0]} | ${post.created_at.split('T')[1]}`}
        subheader={post.created_at}
        style={{
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />
      {post.image && post.image.length > 0 ? (
        <CardMedia
          component="div"
          sx={{
            pt: "56.25%",
          }}
          className={styles.post_image}
          image={post.image}
        />
      ) : null}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography
          style={{
            height: post.image && post.image.length > 0 ? "4rem" : "10rem",
          }}
          className={styles.post_description}
          variant="caption"
        >
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
