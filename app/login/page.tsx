'use client'
import LoginPage from "@/src/pages/login-page";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            router.push('/profile')
        }
    }, [])

    return <LoginPage />
}