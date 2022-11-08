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
  id: number;
  name: string | undefined;
  email: string | undefined;
};

const TransitionsModal: React.FC<{
  open: boolean;
  onEdit: (id: number) => void;
  handleClose: (e: React.FormEvent) => void;
  edit: EditType;
  nameRef: any;
  emailRef: any;
}> = ({ open, onEdit, handleClose, edit, nameRef, emailRef }) => {
  const regEX = /@gmail/;
  const [isEmail, setIsEmail] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("e1", e.target.name.value, "e2", e.target.email.value);
    // let a = regEX.test(e.target.email.value);
    // console.log("a", a, "isEmail", isEmail);
    // if (a) {
    onEdit(edit.id);
    // console.log(nameRef.current.value);
    console.log(e);
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
                defaultValue={edit.name}
                inputRef={nameRef}
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
                inputRef={emailRef}
                defaultValue={edit.email}
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
