import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "./modals.css";
import { useRef, useState } from "react";
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
	const [description, setDescription] = useState("");
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

	const handleDescriptionChange = (value: string): void => {
		setDescription(value.slice(0, 500));
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
						fullWidth
						margin="dense"
						color="primary"
						className="title-input"
						label="Post Title"
						name="post_title"
						variant="outlined"
						required
					/>
					<TextField
						fullWidth
						margin="dense"
						color="primary"
						className="name-input"
						label="Your Name"
						name="author_name"
						variant="outlined"
						required
					/>
					<TextField
						fullWidth
						margin="dense"
						color="primary"
						className="email-input"
						label="Your Email"
						name="author_email"
						type="email"
						variant="outlined"
						required
					/>
					<TextField
						fullWidth
						margin="dense"
						color="primary"
						className="image-input"
						label="Game Image Link"
						name="image_link"
						variant="outlined"
					/>
					<TextField
						fullWidth
						margin="dense"
						color="primary"
						className="links-input"
						label="Other Links (separate by ',')"
						name="other_links"
						variant="outlined"
					/>
					<TextField
						fullWidth
						margin="dense"
						color="primary"
						className="description-input"
						label="Description"
						name="post_description"
						multiline
						rows={4}
						value={description}
						onChange={(e) => handleDescriptionChange(e.target.value)}
						variant="outlined"
						required
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
