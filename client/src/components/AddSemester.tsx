import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface AddSemesterProps {
  handleAddSemester: (number: number | undefined, season: string) => Promise<void>;
}

export default function AddSemester(props: AddSemesterProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState<Date | null>(new Date());

  const [season, setSeason] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSeason(event.target.value as string);
  };

  const handleSubmitForm = () => {
    props.handleAddSemester(date?.getFullYear(), season);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Semester</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <Box mb={2} sx={{ display: "flex" }}>
              <InputLabel id="demo-simple-select-label">Season</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={season}
                placeholder="Select a season"
                label="Season"
                onChange={handleChange}
              >
                <MenuItem value={"Spring"}>Spring</MenuItem>
                <MenuItem value={"Fall"}>Fall</MenuItem>
                <MenuItem value={"Winter"}>Winter</MenuItem>
                <MenuItem value={"Summer"}>Summer</MenuItem>
              </Select>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year only"
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </Box>
            <Button onClick={handleSubmitForm}>Add</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
