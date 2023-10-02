import { PostReplyType } from "./reply";

export type PostType = {
  id: string;
  name: string;
  email: string;
  title: string;
  description: string;
  image: string;
  links: string;
  created_at: string;
  replies?: PostReplyType[];
};
