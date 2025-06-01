"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";

export function ConfidantDeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>Перейти</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Запрос на удаление доверенного лица</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <p>Для сброса доверенности вам необходимо подтвердить свою личность в ближайшем МФЦ.</p>
        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Хорошо
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
