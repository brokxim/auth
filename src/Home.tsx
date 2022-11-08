import { useAuth0 } from "@auth0/auth0-react";

import React, { useState, useRef } from "react";
import "././styles/Home.css";
// import  Button  from "@mui/material/Button";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
// type AppProps = { data: string };

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState<Array<User>>([]);
  type EditType = {
    id: number;
    name: string | undefined;
    email: string | undefined;
  };
  interface User {
    id: number;
    name: string | undefined;
    email: string | undefined;
  }

  const [edit, setEdit] = useState<EditType>({
    id: 0,
    name: "",
    email: "",
  });
  React.useEffect(() => {
    fetchData();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenEdit = (user: EditType) => {
    setOpenEdit(true);
    setEdit(user);
    console.log(user);
  };
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setOpenEdit(false);

  const fetchData = async () => {
    await fetch("https:jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };
  const onAdd = async (name: string, email: string) => {
    await fetch("https:jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // type onEd = {
  //   onEdit: (id: string) => void;
  // };
  // const onEdit: (id: number) => Promise<void>
  // const onEdit = async (id: number) =>
  // const onEdit: (id: number) => Promise<void>{
  const onEdit = async (id: number): Promise<void> => {
    edit.name = nameRef?.current?.value;
    edit.email = emailRef.current?.value;
    // setEdit({ name: nameRef?.current?.value, email: emailRef.current?.value });
    console.log(id);
    await fetch(`https:jsonplaceholder.typicode.com/users/${id}`, {
      method: "PATCH",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              if (user.id == id) {
                user = { ...user, name: edit.name, email: edit.email };
              }
              return user;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = async (id: number) => {
    console.log(id);
    await fetch(`https:jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!isAuthenticated && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleOpen()}
            >
              Add
            </Button>
          </Box>
          <div className="thead">
            {users.map((user) => (
              <div className="home" key={user.id}>
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>
                  <Button
                    type="submit"
                    size="small"
                    color="info"
                    variant="contained"
                    onClick={() => handleOpenEdit(user)}
                  >
                    edit
                  </Button>
                  <Button
                    type="submit"
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => onDelete(user.id)}
                  >
                    delete
                  </Button>
                </span>
              </div>
            ))}
          </div>
          <AddModal open={open} handleClose={handleClose} onAdd={onAdd} />
          <EditModal
            open={openEdit}
            handleClose={handleEditClose}
            onEdit={onEdit}
            edit={edit}
            nameRef={nameRef}
            emailRef={emailRef}
          />
        </Box>
      )}
    </>
  );
};
export default Home;
