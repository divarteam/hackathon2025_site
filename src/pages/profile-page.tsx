'use client'
import { Navbar } from "@/src/shared/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Card, CardContent } from "@/src/shared/ui/card";
import { Button } from "@/src/shared/ui/button";
import LinkNext from "next/link";
import { Footer } from "@/src/shared/ui/footer";
import { useEffect, useState } from "react";
import { UserType } from "@/src/entities/user/schemas";
import { apiUser } from "@/src/entities/user/api";
import { SignOut } from "@/src/shared/ui/sign-out";
import { Skeleton } from "@/src/shared/ui/skeleton";

export default function ProfilePage() {
    const [currentUser, setCurrentUser] = useState<UserType | undefined>()
    const [loadingCurrentUser, setLoadingCurrentUser] = useState<boolean>(true)

    async function getCurrentUser() {
        setLoadingCurrentUser(true)
        const currentUser = await apiUser.getCurrentUser()
        setCurrentUser(currentUser)
        setLoadingCurrentUser(false)
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="pt-[74px] space-y-[25px] md:p-[40px] p-[12px]">
                <h1 className="text-[32px] font-bold">Профиль</h1>
                <p className="text-[18px] font-bold">Учётная запись</p>
                {!loadingCurrentUser && <Card>
                    <CardContent className="space-y-[40px]">
                        <div className="flex items-center gap-x-[16px]">
                            <Avatar className="w-[56px] h-[56px]">
                                <AvatarImage src='#'/>
                                <AvatarFallback>ИИ</AvatarFallback>
                            </Avatar>
                            <div>
                                {/* <h2 className="text-[20px] font-bold">ИВАНОВ ИВАН ИВАНОВИЧ</h2> */}
                                <h2 className="text-[20px] font-bold uppercase">{currentUser?.fullname}</h2>
                                <p className="opacity-80">Подтверждённая учётная запись</p>
                            </div>
                        </div>
                        {/* <p className="font-bold">+7 (800) 555-35-35</p> */}
                        <p className="font-bold">{currentUser?.phone}</p>
                    {/* <p className="font-bold">sample@mail.ru</p> */}
                    <p className="font-bold">{currentUser?.email}</p>
                    <SignOut />
                    </CardContent>
                </Card>}
                {loadingCurrentUser && <Skeleton className="w-full h-[50px]" />}
                <p className="text-[18px] font-bold">Доверенные лица</p>
                <Card>
                    <CardContent className="flex items-center justify-between gap-x-[16px]">
                        <p>Управление доверенными лицами</p>
                        <LinkNext href='/confidant'>
                            <Button variant='ghost'>Перейти</Button>
                        </LinkNext>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
}