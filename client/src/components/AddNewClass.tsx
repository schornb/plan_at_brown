import Button from "@mui/material/Button";

export default function AddNewClassCard() {
  return (
    <Button
      variant="outlined"
      onClick={handleAddingCourse}
      sx={{ border: "dashed", background: "linear-gradient(#26c3eb, #6dd5ed)" }}
    />
  );
}
