import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#48A6A7",
        },
        secondary: {
            main: "#9ACBD0",
        },
        text: {
            main: "#000000",
            light: "#ffffff",
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#16404D",
        },
        secondary: {
            main: "#DDA853",
        },
        text: {
            main: "#ffffff",
            light: "#ffffff",
        },
    },
});
