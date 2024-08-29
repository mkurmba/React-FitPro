import {useState} from 'react'
import { Box, Typography, InputBase, Button} from "@mui/material";
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
const  GeminiBot = () => {

    const [error, setError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [chatHistory, setChatHistory] = useState([])

    const clear = () =>{
        setInputValue("")
        setError("")
        setChatHistory([])
    }

    const getResponse = async () => {
        if (!inputValue){
            setError("Error! Please ask a question!")
            return
        }
        try{
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: chatHistory,
                    message: inputValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch('http://locahost:8082/gemini', options)
            const data = await response.text()
            console.log(data)
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: 'user',
                parts: inputValue
            },
                {
                    role: 'model',
                    parts: data
                }
            ])
            setInputValue("")


        } catch (error) {
            console.error(error)
            setError("Something went wrong! Please try again.")
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update inputValue state on change
    };

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    
    return(
        <Box className = "body" sx={{ margin: '0', padding: '0', width:'85vw', display:'flex', justifyContent: 'center' }}> 
          
            <Box className="geminiBot" sx={{ display: 'flex', flexDirection: 'column', height: '70vh', width: '55vw', margin: '10vw'}}>
            <Typography  variant="h3"sx={{textAlign: 'center', marginBottom: '50px',  fontWeight: 'bold'}}>FITBOT</Typography>
                    <Box component="section" className="search-section" sx={{ flex: 1 }}>
                        
                        <Box className="input-container" sx={{
                            backgroundColor: '#fafafa',
                            display: 'flex',
                            width: '100%',
                            border: 'solid 0.5px #cacaca',
                            borderRadius: '6px',
                            boxShadow: 'rgba(0, 0, 82, 1)',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}>
                            <InputBase
                                value={inputValue}
                                placeholder="Give me a full body workout...?"
                                onChange={handleInputChange}
                                sx={{ padding: '12px 13px', width: '90%', color:'#777'}}
                            />
                            <Button
                                onClick={error ? clear : getResponse} 
                                sx={{
                                    minWidth: '10%',
                                    border: 'none',
                                    borderLeft: '1px solid #cacaca',
                                    backgroundColor: '#fff',
                                    color: '#77',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    '&:active': {
                                        backgroundColor: '#cacaca'
                                    }
                                }}
                            >
                                {error ? 'Clear' : 'Ask me'} 
                            </Button>
                        </Box>

                        {error && <Typography color="error">{error}</Typography>}
                        <Box className='search-result' sx={{ marginTop: '10px', overflowY: 'auto' }}>
                            {chatHistory.map((chatItem, _index ) => <Box key={_index} sx={{ padding: '13px 14px', border: '1px solid #cacaca', backgroundColor: '#fff', margin: '15px 0', borderRadius: '6px' }}> 
                                <Typography className="answer" >{chatItem.role} : {chatItem.parts}</Typography>
                            </Box>)}
                        </Box>
                </Box>
            </Box>
        </Box>
)} 
export default GeminiBot;