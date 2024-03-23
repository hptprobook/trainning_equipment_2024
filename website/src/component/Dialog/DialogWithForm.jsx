import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, setOpen, setTitle, onSubmit }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onSubmit(title);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Title of code snippet</DialogTitle>
        <DialogContent>
          <DialogContentText>What is the title of this code snippet ?</DialogContentText>
          <TextField autoFocus required margin="dense" id="title" name="title" label="Title" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">SUBMIT</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
