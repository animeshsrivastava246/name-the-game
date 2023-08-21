import { PostType } from "../../types/postType";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./card.module.css";

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
        subheader="10 mins ago | July 14, 2023"
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
          image={post.image}
        />
      ) : null}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography
          style={{
            display: "inline-block",
            width: "100%",
            maxHeight: post.image && post.image.length > 0 ? "4rem" : "10rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "break-spaces",
          }}
          variant="caption"
        >
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;
