import React, { useState } from 'react'
import { Button } from '../button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'


function Header() {

    const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false)

    const handleSignIn = useGoogleLogin({
        onSuccess: (res) => GetUserPofile(res),
        onError: (error) => console.log(error)
    })

    const GetUserPofile = (token) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token?.access_token}`, {
            headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            window.location.reload()
        })
    }

    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <img src='./logo.svg' />
            <div>
                {
                    user ?
                        <div className='flex items-center gap-3'>
                            <a href="/my-trips">
                                <Button variant="outline" className="rounded-full">My Trips</Button>
                            </a>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <img src={user?.picture} className='cursor-pointer h-[35px] w-[35px] rounded-full' />
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <h2 className='cursor-pointer' onClick={() => {
                                        googleLogout()
                                        localStorage.clear()
                                        window.location.href = "/";
                                    }}>Logout</h2>
                                </PopoverContent>
                            </Popover>
                        </div> :
                        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                }
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="rounded-xl p-6 max-w-md text-center">
                    <DialogHeader>
                        <div className="flex flex-col items-center gap-4">
                            <img src="/logo.svg" alt="App Logo" className="w-16 h-16" />
                            <h2 className="font-bold text-2xl text-gray-800">Sign In With Google</h2>
                            <p className="text-gray-500 text-sm">
                                Sign in to the app with Google Authentication securely.
                            </p>
                            <Button
                                onClick={handleSignIn}
                                className="w-full mt-4 bg-black hover:bg-zinc-900 text-white flex items-center justify-center gap-3 text-base shadow-md">
                                <FcGoogle className="h-5 w-5" />
                                Sign In with Google
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header