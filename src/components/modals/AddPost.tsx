import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./modals.css";
import { useRef } from "react";
import { AddPostRequestType } from "@/models/apiTypes";

function AddPost({
  isOpen,
  onClose,
  refresh,
}: {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null!);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: AddPostRequestType = {
      title: formRef.current.post_title.value,
      name: formRef.current.author_name.value,
      email: formRef.current.author_email.value,
      image: formRef.current.image_link.value,
      links: formRef.current.other_links.value,
      description: formRef.current.post_description.value,
    };

    const resp = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());
    if (resp) {
      refresh();
      onClose();
    }
  };

  return (
    <Dialog
      className={`modal add-post-modal`}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={""}
    >
      <form ref={formRef} onSubmit={handlePostSubmit}>
        <DialogTitle id="">Ask Your Question</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            className="title-input"
            id=""
            label="Post Title"
            name="post_title"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="name-input"
            id=""
            label="Your Name"
            name="author_name"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="email-input"
            id=""
            label="Your Email"
            name="author_email"
            type="email"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="image-input"
            id=""
            label="Game Image Link"
            name="image_link"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="links-input"
            id=""
            label="Other Links (seprate by ' , ')"
            name="other_links"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="description-input"
            id=""
            label="Description"
            name="post_description"
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">{"Let's Find Your Game!"}</Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddPost;
