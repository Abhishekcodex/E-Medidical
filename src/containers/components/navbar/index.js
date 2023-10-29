import { Autocomplete, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import './index.css'
import CloseIcon from '@mui/icons-material/Close';
import { Nav } from 'react-bootstrap-v5'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';
import { GetCustomerLogin, GetCustomerLogout } from '../../services/apis/customer';
import { SessionStorage } from '../../utility';
const Navbar = () => {
    debugger;
    let sessionData=SessionStorage.getSessionData();
    let fromvalue = {
        search: '',
        email: '',
        password: "",
        passwordType: 'password',
        singInOpen: false,
        singUpOpen: false,
        menuFlag: sessionData===undefined?"N":"Y",
        userData: sessionData===undefined?[]:sessionData,
    }
    const [fromvalueObj, setFromValueObj] = useState(fromvalue)
    const [open, setOpen] = useState(false)
    const OnChangeText = (e) => {
        debugger;
        setFromValueObj((pre) => {
            return ({
                ...pre,
                [e.target.name]: e.target.value
            })
        })
    }
    const handleClose = () => {
        setOpen(false)
        setFromValueObj((pre) => {
            return ({
                ...pre,
                singInOpen: false,
                singUpOpen: false
            })
        })
    }
    const onClickSignIn = () => {
        setFromValueObj((pre) => {
            return ({
                ...pre,
                singInOpen: true
            })
        })
        setOpen(true)
    }
    const onClickSignUp = () => {
        setFromValueObj((pre) => {
            return ({
                ...pre,
                singUpOpen: true
            })
        })
        setOpen(true)
    }
    const onChangeType = () => {
        if (fromvalueObj?.passwordType === "password") {
            setFromValueObj((pre) => {
                return ({
                    ...pre,
                    passwordType: "text"
                })
            })
        } else {
            setFromValueObj((pre) => {
                return ({
                    ...pre,
                    passwordType: "password"
                })
            })
        }
    }
    const onClearFrom = (value) => {
        if (value === "L") {
            setFromValueObj((pre) => {
                return ({
                    ...pre,
                    email: "",
                    password: ""
                })
            })
        }
    }
    const onSignIn = () => {
        GetCustomerLogin(fromvalueObj?.email, fromvalueObj?.password).then((response) => {
            if (response) {
                debugger;
                if (response?.data?.error !== '') {
                    alert(response?.data?.error)
                } else {
                    if (response?.data?.data.length > 0) {
                        SessionStorage.saveSession(response?.data)
                        alert("Login Successfully !")
                        setOpen(false)
                        setFromValueObj((pre) => {
                            return ({
                                ...pre,
                                singInOpen: false,
                                menuFlag: "Y",
                                userData: response?.data,
                                email:'',
                                password:'',
                            })
                        })
                    }
                }
            }
        })
    }
    const onClickLogOut = () => {
        debugger;
        let email = fromvalueObj?.userData?.data[0]?.cust_email;
        let userId = fromvalueObj?.userData?.data[0]?.cust_id;
        GetCustomerLogout(email, userId).then((response) => {
            if (response) {
                debugger
                if (response?.data!=='') {
                    if (response?.data?.data?.affectedRows > 0) {
                        SessionStorage.clearSession();
                        SessionStorage.clearAll();
                        setFromValueObj((pre) => {
                            return ({
                                ...pre,
                                menuFlag: "N"
                            })
                        })
                    }
                }
            }
        })
    }
    const searchOption = [{ label: "Move" }]
    return (
        <>
            <Dialog open={open}
                maxWidth="sm"
                fullWidth
            >
                <Stack
                    direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                    justifyContent={"right"}
                    spacing={1}
                >
                    <Button
                        color='error'
                        variant='contained'
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Button>
                </Stack>
                <DialogTitle>
                    <Stack
                        direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                        justifyContent={"center"}
                        spacing={1}
                    >
                        Sing In
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Stack
                            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                            justifyContent={"center"}
                            className='mt-2'
                            spacing={1}
                        >
                            <TextField
                                size='small'
                                label="Email"
                                type='email'
                                name='email'
                                value={fromvalueObj?.email}
                                onChange={OnChangeText}
                                fullWidth
                            />

                        </Stack>
                        <Stack
                            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                            justifyContent={"center"}
                            className='mt-2'
                            spacing={1}
                        >
                            <TextField
                                size='small'
                                label="Password"
                                type={fromvalueObj?.passwordType}
                                name='password'
                                value={fromvalueObj?.password}
                                onChange={OnChangeText}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {fromvalueObj?.passwordType === "password" ? (
                                                <VisibilityIcon onClick={onChangeType} className="Nav" />
                                            ) : null}
                                            {fromvalueObj?.passwordType === "text" ? (
                                                <VisibilityOffIcon onClick={onChangeType} className="Nav" />
                                            ) : null}
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Stack>
                    </DialogContentText>
                </DialogContent>
                <Stack
                    direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                    justifyContent={"center"}
                    spacing={1}
                    className='mb-5'
                >
                    <Button variant='contained' color="success" onClick={onSignIn}>Sing In</Button>
                    <Button variant='contained' color="error" onClick={() => onClearFrom("L")}>Clear</Button>
                </Stack>
            </Dialog>
            <Stack
                direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                justifyContent={"center"}
                spacing={10}
                className='Navbar'
            >
                <Box sx={{ width: { lg: "10%", md: "10%" } }}>
                    <img src='../logo/logo (1).png' alt='Logo' height={"80%"} width={'80%'} />
                </Box>
                <Stack
                    direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                    justifyContent={"right"}
                    spacing={4}
                >
                    <Nav className='Nav'>Home</Nav>
                    <Nav className='Nav'>About</Nav>
                    <Nav className='Nav'>Product</Nav>
                    <Nav className='Nav'>Contact Us</Nav>
                    {fromvalueObj?.menuFlag === "N" ?
                        <>
                            <Nav className='Nav' onClick={onClickSignIn}>Sing In</Nav>
                            <Nav className='Nav' onClick={onClickSignUp}>Sing Up</Nav>
                        </> : <Nav className='Nav' onClick={onClickLogOut}>Logout</Nav>}
                </Stack>
                <Autocomplete
                    size='small'
                    name='search'
                    options={searchOption}
                    value={fromvalueObj?.search}
                    onChange={OnChangeText}
                    freeSolo
                    className='me-3'
                    sx={{ width: { lg: "40%", md: "40%" } }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            placeholder='Search Item .....'
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& > :not(style)": {
                                    fontSize: "11px",
                                    color: "black",
                                    height: "40px",
                                },
                            }}
                        />
                    }
                />
            </Stack>
        </>
    )
}

export default Navbar
