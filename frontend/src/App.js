import { useState } from "react";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar";
import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from "./scenes/global/Navbar";
import Dashboard from './pages/dashboard';
import Sidebar from "./scenes/global/Sidebar";
import GeminiBot from "./scenes/GeminiBot";



function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
          <div className="app">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main className="content" style={{ flex: 1, padding: '5px', transition: 'margin-left 0.3s'}}>
            <Navbar isCollapsed={isCollapsed} />
              <Routes>
                <Route path='/' element={<Dashboard isCollapsed={isCollapsed} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/calendar' element={<Calendar isCollapsed={isCollapsed} />} />
                {<Route path='/GeminiBot' element={<GeminiBot />} />}
                {/* <Route path='/contacts' element={<Contacts />} /> */}
                {/* <Route path='/form' element={<Form />} /> */}
                {/* <Route path='/bar' element={<Bar />} /> */}
                {/* <Route path='/pie' element={<Pie />} /> */}
                {/* <Route path='/line' element={<Line />} /> */}
                {/* <Route path='/faq' element={<Faq />} /> */}
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;