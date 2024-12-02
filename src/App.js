import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography, Container, Paper } from "@mui/material";
import { MathJaxContext } from "better-react-mathjax";
import BitolasDeFio from "./components/BitolasDeFio";
import IndutoresComuns from "./components/IndutoresComuns";
import IndutoresToroidais from "./components/IndutoresToroidais";
import TransformadoresComuns from "./components/TransformadoresComuns";
import TransformadoresToroidais from "./components/TransformadoresToroidais";
import ExplicacoesFormulas from "./components/ExplicacoesFormulas";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MathJaxContext>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ overflow: "hidden" }}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              centered
            >
              <Tab label="Bitolas de Fios" />
              <Tab label="Indutores Comuns" />
              <Tab label="Indutores Toroidais" />
              <Tab label="Transformadores Comuns" />
              <Tab label="Transformadores Toroidais" />
              <Tab label="Explicações e Fórmulas" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <BitolasDeFio />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <IndutoresComuns />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <IndutoresToroidais />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TransformadoresComuns />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <TransformadoresToroidais />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <ExplicacoesFormulas />
          </TabPanel>
        </Paper>
      </Container>
    </MathJaxContext>
  );
}

export default App;
