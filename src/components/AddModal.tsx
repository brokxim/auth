import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "../styles/AddModal.css";
const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type EditType = {
  name: string | undefined;
  email: string | undefined;
};
interface props {
  open: boolean;
  onAdd: (name: string, email: string) => void;
  handleClose: (e: React.FormEvent) => void;
}
type FormElements = {
  name: HTMLInputElement;
  email: HTMLInputElement;
};

const TransitionsModal: React.FC<props> = ({ open, onAdd, handleClose }) => {
  const regEX = /@gmail/;
  const [isEmail, setIsEmail] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      name: { value: string };
    };
    const name = target.name.value; // typechecks!
    const email = target.email.value; // typechecks!
    // console.log("e1", e.target.name.value, "e2", e.target.email.value);
    // let a = regEX.test(e.target.email.value);
    // console.log("a", a, "isEmail", isEmail);
    // if (a) {
    onAdd(name, email);
    //   setIsEmail(a);
    // }
    // setIsEmail(true);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add new user
            </Typography>
            <form
              className="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined"
                label="Name"
                className="textField"
                InputProps={
                  {
                    //   className: "input",
                  }
                }
                name="name"
                type="text"
                size="small"
                autoComplete="off"
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                size="small"
                id="email"
                label={"Email"}
                // helperText={`${isEmail && "Incorrect entry."}`}
                className={`"textField" ${isEmail ? "" : "input"}`}
                InputProps={{
                  className: "input",
                }}
                type="email"
                name="email"
                margin="normal"
              />
              <div className="formButtonWrap">
                <Button size="small" variant="outlined" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  onClick={handleClose}
                >
                  Save
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
