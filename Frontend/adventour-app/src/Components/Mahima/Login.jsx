import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, Switch, Center, Stack, Text, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const { theme, currentUser } = useSelector(state => state);

    console.log(currentUser)

    const handleLogin = async (e) => {
        // if (!user.email || !user.password) {
        //     setError(true);
        //     alert("Wrong Credentials !!");
        //     return;
        //   }

        // try {
        //     const res = await signInWithEmailAndPassword(auth, user.email, user.password)
        //     console.log(res);
        //     navigate('/')

        //   } catch (error) {
        //     setError(error.message)
        //     console.log(error);
        //   }

        e.preventDefault()
        axios.post(`http://localhost:5000/login`, user)
            .then((res) => {
                console.log(res.data)
                if (res.data.message === 'Login successful') {
                    localStorage.setItem('token', res.data.token)
                    navigate('/')
                    console.log("Success")

                }
                else if (res.data.error == 'Invalid password') {
                    setError(true)
                    console.log(res.data.error)
                }
                else {
                    setError(true);
                    console.log('User not found');
                }
            })
            .catch((err) => {
                alert('Wrong Credentials')
                console.log(err)
            })
    }

    return (
        <>
            <Box p='30px 0' minH={'100vh'} bg={theme ? '#101214' : 'gray.100'}>

                <Center>
                    <Box borderRadius='20px' my='20px' p='30px' width='350px' bg={theme ? '#191b1d' : 'white'} color={theme ? 'white' : 'black'}>
                        <Box mt='8' mb='25'><Heading><Center>Login</Center></Heading></Box>

                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel >Email</FormLabel>
                                <Input type="email"
                                    name="email" colorScheme='none'
                                    variant='flushed'
                                    placeholder="test@test.com"
                                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                    color={theme ? 'white' : 'black'}
                                />

                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="**********"
                                    name="password" colorScheme='none'
                                    variant='flushed'
                                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                    color={theme ? 'white' : 'black'}
                                />
                            </FormControl>
                            <Flex flexDirection='column' align='center'>
                                <Box pt='1.2rem'>
                                    {error ? <Text color='red'> Login Failed </Text> : ""}
                                </Box>

                                <Button bg='#4086f3' width='85%' h='50px'
                                    fontSize='18px' color='white' colorScheme='none' mt='30px'
                                    type="submit" _hover={{ bg: '#74d4f0' }}
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </Button>

                            </Flex>

                        </Stack>
                    </Box>
                </Center>
            </Box>

        </>
    )
}

export default Login;