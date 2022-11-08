import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

const theme = responsiveFontSizes(
  createMuiTheme({
    spacing: 12,
    typography: {
      fontSize: 15,
      fontFamily: "Work Sans",
    },
    shape: {
      borderRadius: 0,
    },
    palette: {
      background: {
        default: "#eee",
      },
    },
    shadows: [...new Array(25)].map(() => "none"),
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
  })
)

export default theme
