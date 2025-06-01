import { Navbar } from "@/src/shared/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../shared/ui/avatar";
import { Card, CardContent } from "../shared/ui/card";
import { Button } from "../shared/ui/button";
import LinkNext from "next/link";

export default function ProfilePage() {
    return (
        <div>
            <Navbar />
            <div className="pt-[74px] space-y-[25px]">
                <h1 className="text-[32px] font-bold">Профиль</h1>
                <p className="text-[18px] font-bold">Учётная запись</p>
                <Card>
                    <CardContent className="space-y-[40px]">
                        <div className="flex items-center gap-x-[16px]">
                            <Avatar className="w-[56px] h-[56px]">
                                <AvatarImage src='#'/>
                                <AvatarFallback>ИИ</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-[20px] font-bold">ИВАНОВ ИВАН ИВАНОВИЧ</h2>
                                <p className="opacity-80">Подтверждённая учётная запись</p>
                            </div>
                        </div>
                        <p className="font-bold">+7 (800) 555-35-35</p>
                    <p className="font-bold">sample@mail.ru</p>
                    </CardContent>
                </Card>
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
        </div>
    )
}