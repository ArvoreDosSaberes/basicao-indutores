import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HelmetProvider, Helmet } from "react-helmet-async";

const theme = createTheme({
  palette: {
    mode: "dark", // Ativa o modo escuro
    primary: {
      main: "#bb86fc", // Roxo vibrante
    },
    secondary: {
      main: "#03dac6", // Verde-água suave
    },
    background: {
      default: "#121212", // Preto suave
      paper: "#1e1e1e", // Cinza escuro para elementos
    },
    text: {
      primary: "#ffffff", // Texto branco
      secondary: "#b0b0b0", // Texto secundário cinza claro
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Fonte moderna
    fontSize: 14,
    button: {
      textTransform: "none", // Evita letras maiúsculas automáticas
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // Combina com o fundo
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#03dac6", // Indicador verde-água
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#bb86fc", // Aba ativa em roxo vibrante
            fontWeight: "bold",
          },
          "&:hover": {
            color: "#03dac6", // Cor de hover em verde-água
          },
        },
      },
    },
  },
});

ReactDOM.render(
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Calculadora de Indutâncias e Transformador do Basicão da Eletrônica</title>
        <meta name="description" content="Calculadora de Indutâncias e Transformadores" />
        <meta name="keywords" content="Calculadora, Indutância, Como Fazer Transformadores, Transformadores, Toroidais, Fonte Chaveada, Transformadores para Fonte Chaveada" />
        <script type="text/javascript">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6692034e32dca6db2caeaec2/1i2l5pqpe';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1K2T9GHBCX"></script>
        <script type="text/javascript">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1K2T9GHBCX', {
              page_path: window.location.pathname,
            });
          `}
        </script>
      </Helmet>
      <App />
    </ThemeProvider>
  </HelmetProvider>,
  document.getElementById("root")
);
