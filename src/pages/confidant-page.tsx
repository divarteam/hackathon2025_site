'use client'
import { Navbar } from "@/src/shared/components/navbar";
import { Card, CardContent } from "../shared/ui/card";
import { Button } from "../shared/ui/button";
import { CopyButton } from "../shared/components/copy-button";
import { Footer } from "../shared/ui/footer";
import { useEffect, useState } from "react";
import { GetMyIncomingTrusterInVerificationCodeSOutType, UserType } from "../entities/user/schemas";
import { apiUser } from "../entities/user/api";
import { Skeleton } from "../shared/ui/skeleton";

export default function ConfidantPage() {
    const [confidants, setConfidants] = useState<UserType[]>([])
    const [currentUser, setCurrentUser] = useState<UserType | undefined>()
    const [getMyIncomingTrusterInVerificationCodeSOuts, setGetMyIncomingTrusterInVerificationCodeSOuts] = useState<GetMyIncomingTrusterInVerificationCodeSOutType[]>([])

    const [loadingConfidants, setLoadingConfidants] = useState<boolean>(true)
    const [loadingCurrentUser, setLoadingCurrentUser] = useState<boolean>(true)
    const [loadingGetMyIncomingTrusterInVerificationCodeSOuts, setLoadingGetMyIncomingTrusterInVerificationCodeSOuts] = useState<boolean>(true)

    async function getCurrentUser() {
        setLoadingCurrentUser(true)
        const currentUser = await apiUser.getCurrentUser()
        setCurrentUser(currentUser)
        setLoadingCurrentUser(false)
    }

    async function getTrusters() {
        setLoadingConfidants(true)
        const confidants = await apiUser.getMyTrusters()
        setConfidants(confidants)
        setLoadingConfidants(false)
    }

    async function getX() {
        setLoadingGetMyIncomingTrusterInVerificationCodeSOuts(true)
        const getMyIncomingTrusterInVerificationCodeSOuts = await apiUser.getMyIncomingTrusterInVerificationCodeS({filter_status: 'waiting_for_confirmation'})
        setGetMyIncomingTrusterInVerificationCodeSOuts(getMyIncomingTrusterInVerificationCodeSOuts)
        setLoadingGetMyIncomingTrusterInVerificationCodeSOuts(false)
    }

    async function handleUpdateTrustCode() {
        // setLoadingCurrentUser(true)
        const currentUser = await apiUser.updateMyTrustInviteCode()
        setCurrentUser(currentUser)
        // setLoadingCurrentUser(false)
    }

    async function handleRequest(vc_id: number, status: string) { // g.verification_code_id, 'closed'
        await apiUser.updateTrusterInVerificationCodeStatus({
            status,
            truster_in_verification_code_id: vc_id
        })
        getX()
    }

    useEffect(() => {
        getCurrentUser()
        getTrusters()

        getX()
    }, [])
    
    return (
        <div>
            <Navbar />
            <div className="pt-[74px] space-y-[25px] md:p-[40px] p-[12px]">
                <h1 className="text-[32px] font-bold">Управление доверенными лицами</h1>

                <p className="text-[18px] font-bold">Пригласительный код</p>
                {!loadingCurrentUser && <Card>
                    <CardContent className="flex items-center justify-between gap-x-[16px]">
                        <div onClick={handleUpdateTrustCode}>
                            <CopyButton value={currentUser?.trust_invite_code || ''} placeholder={'XXXXX_XXXXX_XXXXX'} />
                        </div>
                        <Button variant={'ghost'} onClick={handleUpdateTrustCode}>Обновить код</Button>
                    </CardContent>
                </Card>}
                {loadingCurrentUser && <Skeleton className="w-full h-[50px]" />}
                {/* placeholder={'XXXXX_XXXXX_XXXXX'} */}
                {/* <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Запросы на становление доверенным лицом</p>
                    <Button variant='ghost'>Обновить</Button>
                </div> */}

                <p className="text-[18px] font-bold">Список доверенных лиц</p>
                {!loadingConfidants && <Card>
                    <CardContent className="space-y-[42px]">
                        {confidants.map(c => (
                            <p key={c.id}>
                                {c.fullname}
                            </p>
                        ))}
                        {confidants.length === 0 && <p>Нет доверенных лиц</p>}
                    </CardContent>
                </Card>}
                {loadingConfidants && <Skeleton className="w-full h-[50px]" />}
                
                <p className="text-[18px] font-bold">Запросы на подтверждение входа</p>
                {!loadingGetMyIncomingTrusterInVerificationCodeSOuts && <Card>
                    <CardContent className="flex flex-col gap-y-[25px]">
                        {getMyIncomingTrusterInVerificationCodeSOuts.map(g => (
                            <div key={g.id} className="space-y-[15px]">
                                <p className="font-bold text-[18px]">{g.truster.fullname}</p>
                                <p>Просит вас стать его доверенным лицом.<br /> После принятия соглашения вход в его аккаунт будет доступен только после вашего подтверждения.</p>
                                <div className="flex gap-x-[16px]">
                                    {/* <ConfidantRequestDialog getMyIncomingTrusterInVerificationCodeSOut={g} cb={getX} /> */}
                                    <Button onClick={() => handleRequest(g.id, 'confirmed')}>Подтвердить вход</Button>
                                    <Button variant={'outline'} onClick={() => handleRequest(g.id, 'closed')}>Отменить</Button>
                                </div>
                            </div>
                        ))}
                        {getMyIncomingTrusterInVerificationCodeSOuts.length === 0 && <p>Нет запросов</p>}
                    </CardContent>
                </Card>}
                {loadingGetMyIncomingTrusterInVerificationCodeSOuts && <Skeleton className="w-full h-[50px]" />}

                <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Добавление доверенного лица</p>
                    <Button variant='ghost'>Перейти</Button>
                </div>

                <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Удаление доверенного лица</p>
                    <Button variant='ghost'>Перейти</Button>
                </div>

                <p className="text-[18px] font-bold">История запросов на подтверждение входа</p>
                <Card>
                    <CardContent className="space-y-[42px]">
                        <div>
                            <p className="text-[18px] font-bold">Юрьев Юрий Юрьевич</p>
                            <p>Вход подтверждён</p>
                        </div>
                        <div>
                            <p className="text-[18px] font-bold">Иванов Иван Иванович</p>
                            <p>Вход подтверждён</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
}