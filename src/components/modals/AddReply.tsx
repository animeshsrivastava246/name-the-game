import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./modals.css";

function AddReply({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      className={`modal add-reply-modal`}
      open={isOpen}
      onClose={onClose}
      aria-labelledby={""}
    >
      <form>
        <DialogTitle id="">Give Answer</DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            className="title-input"
            id=""
            label="Game Title"
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
            className="description-input"
            id=""
            label="Description"
            multiline
            rows={4}
            variant="outlined"
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
