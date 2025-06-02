import LinkNext from "next/link";
import { Button } from "./button";


export function AndroidDownload() {
    return (
        <LinkNext href='/app.apk' target='_blank'>
            <Button className='bg-[#32DE84] hover:bg-[#32DE84]/80'>
                <div className="flex gap-x-3">
                    <span>Android-приложение</span>
                </div>
            </Button>
        </LinkNext>
    )
}