import { Navbar } from "@/src/shared/components/navbar";
import { Card, CardContent } from "../shared/ui/card";
import { Button } from "../shared/ui/button";
import { CopyButton } from "../shared/components/copy-button";
import { ConfidantRequestDialog } from "../features/confidant/confidant-request-dialog";

export default function ConfidantPage() {
    return (
        <div>
            <Navbar />
            <div className="pt-[74px] space-y-[25px]">
                <h1 className="text-[32px] font-bold">Управление доверенными лицами</h1>
                <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Запросы на становление доверенным лицом</p>
                    <Button variant='ghost'>Обновить</Button>
                </div>
                <div>
                    <Card>
                        <CardContent className="space-y-[40px]">
                            <p className="font-bold text-[18px]">Юрьев Юрий Юрьевич</p>
                            <p>Просит вас стать его доверенным лицом.<br /> После принятия соглашения вход в его аккаунт будет доступен только после вашего подтверждения.</p>
                            <div className="flex gap-x-[16px]">
                                {/* <Button>Принять приглашение</Button> */}
                                <ConfidantRequestDialog />
                                <Button variant={'outline'}>Отменить</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <p className="text-[18px] font-bold">Пригласительный код</p>
                <Card>
                    <CardContent className="flex items-center justify-between gap-x-[16px]">
                        <CopyButton text={"XXXXX_XXXXX_XXXXX"} />
                        <Button variant={'ghost'}>Обновить код</Button>
                    </CardContent>
                </Card>

                <p className="text-[18px] font-bold">Список доверенных лиц</p>
                <Card>
                    <CardContent className="space-y-[42px]">
                        <p>Иванова Илона Ивановна</p>
                        <p>Иванов Илья Иванович</p>
                        <p>Иванов Иннокентий Иванович</p>
                    </CardContent>
                </Card>

                <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Добавление доверенного лица</p>
                    <Button variant='ghost'>Перейти</Button>
                </div>

                <div className="flex justify-between">
                    <p className="text-[18px] font-bold">Удаление доверенного лица</p>
                    <Button variant='ghost'>Перейти</Button>
                </div>
            </div>
        </div>
    )
}