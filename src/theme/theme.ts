import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    fontFamily: "'Quicksand', sans-serif",
    fontWeightStrong: 700,
    colorPrimary: "#7E1C13",
    colorLink: "#BF0A0D",
    colorSuccess: "#6D9788",
    colorWarning: "#BF0A0D",
    colorError: "#BF0A0D",
    fontSize: 14,
    borderRadius: 8,
  },
  components: {
    Card: {
      colorBgContainer: "#E6E1C2",
      colorTextHeading: "#1E2528",
      colorText: "#1E2528",
      fontWeightStrong: 700,
    },
    Input: {
      colorBgContainer: "#ffffff",
      colorText: "#1E2528",
      colorBorder: "#1E2528",
    },
    Button: {
      colorPrimary: "#7E1C13",
      colorPrimaryHover: "#BF0A0D",
      colorText: "#E6E1C2",
    },
    Form: {
      labelColor: "#1E2528",
    },
  },
};
