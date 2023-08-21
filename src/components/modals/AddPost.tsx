import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./modals.css";

function AddPost({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      className={`modal add-post-modal`}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={""}
    >
      <form>
        <DialogTitle id="">Ask Your Question</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            className="title-input"
            id=""
            label="Post Title"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="name-input"
            id=""
            label="Your Name"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="email-input"
            id=""
            label="Your Email"
            type="email"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="image-input"
            id=""
            label="Game Image Link"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="links-input"
            id=""
            label="Other Links (seprate by ' , ')"
            variant="outlined"
          />
          <TextField
            color="primary"
            className="description-input"
            id=""
            label="Description"
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
