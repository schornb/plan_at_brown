import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// interface ButtonProps {
//   color: string;
//   text: string;
// }

// const Button = (props: ButtonProps) => {
//   return (
//     <button style={{ backgroundColor: props.color }} className="btn">
//       {props.text}
//     </button>
//   );
// };

// export default Button;

export default function ClassCard() {
  return (
    <Card sx={{ background: "linear-gradient(#26c3eb, #6dd5ed)", m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Computer Science
        </Typography>
        <Typography color="#292e30" variant="h5" component="div">
          CSCI0190
        </Typography>
        <Typography color="#292e30" variant="body2">
          Accelerated Introduction to Computer Science
        </Typography>
      </CardContent>
    </Card>
  );
}
