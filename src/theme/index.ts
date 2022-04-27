import { extendTheme } from "@chakra-ui/react";


export const theme = extendTheme({
  colors: {
    card: {
      "transparent": "transparent",
      "cyan": "#50B2C0",
      "salmon": "#FAAA8D",
      "gray": "#201E1F",
      "red": "#FF4000",
      "green": "#20525A",
      "purple": "#502D64",
      "black": "#000",
      "bege": "#FEEFDD",
      "softPurple": "#887695",
      "deepPurple": "#3D2B4E",
    }
  },
  styles: {
    global: {
      body: {
        bg: "#FEEFDD",
        color: "black"
      }
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto', 
    }
  }
});
