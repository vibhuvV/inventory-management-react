import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    h1: {
      fontSize: "4.8rem",
    },
    h2: {
      fontSize: "4rem",
    },
    h3: {
      fontSize: "3.2rem",
    },
    h4: {
      fontSize: "2.4rem",
    },
    h5: {
      fontSize: "1.6rem",
    },
    h6: {
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "1.8rem",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#C0D070",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
        hiddenLabel: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  },
});

export default theme;
