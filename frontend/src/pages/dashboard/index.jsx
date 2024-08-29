import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Header from "../../components/Header.jsx";
import { tokens } from "../../theme";


const Dashboard = ({ isCollapsed }) => {
  // Access the current theme (light/dark mode)
  const theme = useTheme();
  // Retrieve color tokens based on the current theme mode
  const colors = tokens(theme.palette.mode);

  // Calendar widget
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const isLightMode = theme.palette.mode === 'light';

  const months = ["January", "February", "March", "April", "May", "June", "July",
                   "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const currYear = date.getFullYear();
    const currMonth = date.getMonth();
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = [];
    for (let i = firstDayofMonth; i > 0; i--) {
      liTag.push({ date: lastDateofLastMonth - i + 1, className: 'inactive' });
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      liTag.push({
        date: i,
        className: (i === new Date().getDate() && currMonth === new Date().getMonth() &&
                    currYear === new Date().getFullYear()) ? 'active' : ''
      });
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      liTag.push({ date: i - lastDayofMonth + 1, className: 'inactive' });
    }
    setDays(liTag);
    setCurrentDate(`${months[currMonth]} ${currYear}`);
  };

  useEffect(() => {
    renderCalendar();
  }, [date]);

  const handleIconClick = (direction) => {
    const currMonth = date.getMonth();
    const newDate = direction === 'prev'
      ? new Date(date.getFullYear(), currMonth - 1, 1)
      : new Date(date.getFullYear(), currMonth + 1, 1);

    if (newDate.getMonth() < 0 || newDate.getMonth() > 11) {
      setDate(new Date(date.getFullYear() + (direction === 'prev' ? -1 : 1), direction === 'prev' ? 11 : 0, 1));
    } else {
      setDate(newDate);
    }
  };

  return (
    
    <Box
    
      sx={{
        minHeight: "55vh", // Set the minimum height to 100% of the viewport height
        minWidth: "85vw",  // Set the minimum width to 100% of the viewport width
        overflow: "hidden", // Prevent content overflow
        display: "flex",
        flexDirection: "column", // Flexbox for vertical layout
        padding: "20px",
      }}
    >
      {/* HEADER SECTION */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        {/* Custom Header Component with Title and Subtitle */}
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* MAIN GRID SECTION */}
      <Box
        flex="1" // Ensure the grid takes up remaining vertical space
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)" // 12-column grid system
        gridAutoRows="minmax(110px, auto)"   // Dynamic row height
        gap="20px"   
        
                               // Spacing between grid items
      >
        <Box
          gridColumn="span 5"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: "5px",background: isLightMode 
            ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' 
            : `${colors.primary[400]} !important`  }} // Add rounded corners
        >
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: "5px", background: isLightMode 
            ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' 
            : `${colors.primary[400]} !important` }} // Add rounded corners
        >
          {/* StatBox Component will go here */}
        </Box>

        {/* Calendar/ Goals */}
        <Box
            gridColumn="span 3" // The box spans 3 columns in the grid layout
            gridRow="span 6"    // The box spans 6 rows in the grid layout
            backgroundColor={colors.primary[400]} // Background color from theme's primary color palette
            display="flex" // Use flexbox layout
            alignItems="center" // Align items vertically to the center
            justifyContent="center" // Align items horizontally to the center
            sx={{ borderRadius: "5px" , background: isLightMode 
              ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' 
              : `${colors.primary[400]} !important`}} // Add rounded corners with 5px radius
          >
            <Box
              sx={{
                height: '280px', // Set fixed height of the inner box
                width: '370px', // Set fixed width of the inner box
                backgroundColor: theme.palette.background.paper, // Background color for the inner box
                borderRadius: '5px', // Rounded corners for the inner box
                boxShadow: `0 0px 20px ${theme.palette.grey[600]}`, // Shadow effect with color from theme's grey palette
                padding: '10px', // Padding inside the inner box
                boxSizing: 'border-box', // Include padding and border in element's total width and height
                position: 'relative', // Position relative to allow positioning of child elements
                top: '-232px' // Move the box upwards by 232px
              }}
            >
              <Box
                sx={{
                  display: 'flex', // Use flexbox layout
                  alignItems: 'center', // Align items vertically to the center
                  padding: '10px 20px', // Padding inside the header box
                  justifyContent: 'space-between', // Space out children to the ends
                  marginTop: '-10px' // Move the header box upwards by 10px
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.2rem', // Set font size for the date text
                    fontWeight: 500, // Set font weight
                    color: theme.palette.text.primary // Text color from the theme's primary color palette
                  }}
                >
                  {currentDate} 
                </Typography>
                <Box
                  sx={{
                    display: 'flex' // Use flexbox layout
                  }}
                >
                  <IconButton
                    onClick={() => handleIconClick('prev')} // Handle previous month navigation
                    sx={{
                      height: '30px', // Set height of the icon button
                      width: '30px', // Set width of the icon button
                      margin: '0 1px', // Margin between icon buttons
                      color: theme.palette.text.primary, // Icon color from the theme's primary color palette
                      '&:hover': {
                        background: theme.palette.action.hover // Background color on hover effect
                      }
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleIconClick('next')} // Handle next month navigation
                    sx={{
                      height: '30px', // Set height of the icon button
                      width: '30px', // Set width of the icon button
                      margin: '0 1px', // Margin between icon buttons
                      color: theme.palette.text.primary, // Icon color from the theme's primary color palette
                      '&:hover': {
                        background: theme.palette.action.hover // Background color on hover effect
                      }
                    }}
                  >
                    <ChevronRightIcon /> 
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  padding: '9px' // Padding inside the calendar box
                }}
              >
                <Box
                  component="ul" // Use unordered list for days of the week
                  sx={{
                    display: 'flex', // Use flexbox layout
                    flexWrap: 'wrap', // Wrap list items if necessary
                    listStyle: 'none', // Remove default list style
                    textAlign: 'center', // Center align text
                    padding: 0, // Remove default padding
                    margin: 0 // Remove default margin
                  }}
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                    <Box
                      key={index} // Unique key for each list item
                      component="li" // List item element
                      sx={{
                        color: theme.palette.text.primary, // Text color from the theme's primary color palette
                        width: 'calc(100% / 7)', // Each day takes up 1/7th of the container's width
                        fontSize: '0.9rem', // Set font size for day names
                        fontWeight: 500, // Set font weight
                        cursor: 'default' // Default cursor
                      }}
                    >
                      {day} 
                    </Box>
                  ))}
                </Box>
                <Box
                  component="ul" // Use unordered list for calendar days
                  sx={{
                    display: 'flex', // Use flexbox layout
                    flexWrap: 'wrap', // Wrap list items if necessary
                    listStyle: 'none', // Remove default list style
                    textAlign: 'center', // Center align text
                    padding: 0, // Remove default padding
                    margin: 0 // Remove default margin
                  }}
                >
                  {days.map((day, index) => (
                    <Box
                      key={index} // Unique key for each list item
                      component="li" // List item element
                      sx={{
                        color: day.className === 'inactive' ? theme.palette.grey[500] : theme.palette.text.primary, // Color based on day status
                        width: 'calc(100% / 7)', // Each day takes up 1/7th of the container's width
                        fontSize: '0.9rem', // Set font size for day numbers
                        cursor: 'pointer', // Pointer cursor for clickable days
                        position: 'relative', // Position relative to allow positioning of pseudo-elements
                        marginTop: '15px', // Margin above each day
                        zIndex: day.className === 'active' ? 1 : 'auto', // Bring active day to the front
                        '&.inactive': {
                          color: theme.palette.grey[500] // Color for inactive days
                        },
                        '&.active': {
                          color: theme.palette.text.primary, // Color for active day
                          '&::before': {
                            content: '""', // Empty content for pseudo-element
                            position: 'absolute', // Position absolute for the pseudo-element
                            left: '50%', // Center horizontally
                            top: '50%', // Center vertically
                            height: '30px', // Height of the highlight circle
                            width: '30px', // Width of the highlight circle
                            zIndex: -1, // Place the highlight circle behind the day number
                            borderRadius: '50%', // Make the highlight circle round
                            background: theme.palette.background.default, // Background color for the highlight circle
                            transform: 'translate(-50%, -50%)' // Center the highlight circle
                          }
                        },
                        '&:hover': {
                          color: theme.palette.text.primary, // Color change on hover
                          '&::before': {
                            background: theme.palette.action.hover // Change background color on hover
                          }
                        }
                      }}
                      className={day.className} // Assign class for styling purposes
                    >
                      {day.date} 
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

        <Box
          gridColumn="span 9"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: "5px", background: isLightMode 
            ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' 
            : `${colors.primary[400]} !important` }} // Add rounded corners
        >
          {/* Content for Revenue Generated */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;