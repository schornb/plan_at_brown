import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar } from "@mui/material";
import React from "react";
import IUser from "../types/IUser";
import { handleLoginClick, handleLogoutClick } from "../utils/auth";
import RequirementComponent from "./RequirementComponent";

interface DegreeSelectionProps {
  user: IUser | undefined;
}

export default function DegreeRequirementSelection(props: DegreeSelectionProps) {
    
    const { user } = props;
    const degrees = user!.degrees;
    const degreeElement  = degrees.map(degree => {
        return (
            <Button color="inherit" onClick={handleLoginClick}>
                {degree.degree.name}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                   <RequirementComponent requirement={degree.satisfactions} />
                </Box>
            </Button>
        );
    })
    return (
        <Box sx={{ flexGrow: 1 }}>
            {degreeElement}
        </Box>
    );
}