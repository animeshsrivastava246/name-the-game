import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./modals.css";
import { useRef, useState } from "react";
import { AddReplyRequestType } from "@/models/apiTypes";

function AddReply({
  postId,
  isOpen,
  onClose,
  refresh,
}: {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const [description, setDescription] = useState("");
  const formRef = useRef<HTMLFormElement>(null!);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: AddReplyRequestType = {
      name: formRef.current.author_name.value,
      email: formRef.current.author_name.value,
      description: formRef.current.reply_description.value,
    };
    const resp = await fetch(`/api/posts/${postId}/replies`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    if (resp) {
      refresh();
      onClose();
    }
  };
  const handleDescriptionChange = (value: string): void => {
    setDescription(value.slice(0, 200));
  };

  return (
    <Dialog
      className={`modal add-reply-modal`}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={""}
    >
      <form ref={formRef} onSubmit={handlePostSubmit}>
        <DialogTitle id="">Give Answer</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            className="name-input"
            id=""
            label="Your Name"
            name="author_name"
            variant="outlined"
            required
          />
          <TextField
            color="primary"
            className="email-input"
            id=""
            label="Your Email"
            name="author_email"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            color="primary"
            className="description-input"
            id=""
            label="Description"
            name="reply_description"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Help The Fellow Gamer!</Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddReply;
