import React, { useEffect, useState, FC } from "react";
import "./Home.css";
import logo from "./react.svg";

import {
  Container,
  Typography,
  TextField,
  TableRow,
  TableCell,
  Box,
  Button,
  Table,
  TableBody,
  styled,
  TableHead,
  Grid
} from "@material-ui/core";

import axios from "axios";

const Home: FC = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState<string[]>([]);

  const submit = async () => {
    if (!text) return;

    const { data } = await axios.post<string[]>("/api/guest-list", {
      text
    });

    setText("");
    setList(data);
  };

  const deleteList = async () => {
    await axios.delete<string[]>("/api/guest-list");

    setText("");
    setList([]);
  };

  useEffect(() => {
    axios.get("/api/guest-list").then(({ data }) => setList(data));
  }, []);

  return (
    <>
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>
            Welcome to <del>NGRX</del> Docker.Party!
          </h2>
        </div>
        <Container>
          <Typography style={{ marginTop: "16px" }} variant="h6">
            Sign Our guest book! Prove you were here, then show it to your MC!
          </Typography>
          <Grid style={{ marginTop: "16px" }} container>
            <Grid item xs={4} />
            <Grid
              style={{ display: "flex", justifyContent: "space-between" }}
              item
              xs={4}
            >
              <TextField
                autoFocus
                label="Name"
                value={text}
                onKeyPress={evt => {
                  if (evt.key === "Enter") {
                    submit();
                  }
                }}
                onChange={evt => setText(evt.target.value)}
              />
              <Button
                color="primary"
                variant="outlined"
                onClick={() => submit()}
              >
                Add Name
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "16px" }} container>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledCell>Guest List</StyledCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((guest, idx) => (
                    <TableRow key={`${guest}-${idx}`}>
                      <TableCell>{guest}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "16px" }} container>
            <Grid item xs={4} />
            <Grid
              style={{ display: "flex", justifyContent: "flex-end" }}
              item
              xs={4}
            >
              {list.length > 0 && (
                <Button
                  onClick={() => deleteList()}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

const StyledCell = styled(TableCell)({
  backgroundColor: "black",
  color: "white"
});

export default Home;
