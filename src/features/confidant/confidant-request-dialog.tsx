"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNext from 'next/form'     
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/shared/ui/form";
import { FloatingLabelInput } from "@/src/shared/ui/floating-input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/shared/ui/accordion";

const ConfidantRequestDialogFormSchema = z.object({
  inviteCode: z.string().min(2, {
    message: "Введите пригласительный код",
  }),
  accessCode: z.string().min(2, {
    message: "Введите код доступа",
  }),
})

// interface ConfidantRequestDialogProps {
  
// }

export function ConfidantRequestDialog() {
  const confidantRequestDialogForm = useForm<z.infer<typeof ConfidantRequestDialogFormSchema>>({
      resolver: zodResolver(ConfidantRequestDialogFormSchema),
      defaultValues: {
          inviteCode: "",
          accessCode: ""
      },
  })

  function onSubmitConfidantRequestDialogForm() {
    console.log(confidantRequestDialogForm.getValues())
  } 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Принять приглашение</Button>
      </DialogTrigger>
      <DialogContent className="w-[1072px] max-w-[1072px]">
        <DialogHeader>
          <DialogTitle>Запрос на добавление доверенного лица</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...confidantRequestDialogForm}>
          <FormNext
              onSubmit={confidantRequestDialogForm.handleSubmit(onSubmitConfidantRequestDialogForm)}
              className='w-full'
              action={''}
          >
              <FormField
                  control={confidantRequestDialogForm.control}
                  name='inviteCode'
                  render={({ field }) => (
                  <FormItem>
                      <FormControl>
                      <FloatingLabelInput
                          // {...form.register('email', {
                          //   setValueAs: (value: string) => {
                          //     console.log(value)
                          //     return 'test' //value.trim()
                          //   }
                          // })}
                          {...field}
                          id='inviteCode'
                          label={<FormLabel>Пригласительный код</FormLabel>}
                          // {...form.register('email', {
                          // onChange: (e) => {
                          //     const x = e.target.value
                          //     if (x === '') setTimeout(() => form.clearErrors())
                          //     form.setValue(
                          //     'email',
                          //     x.replace(/ /g, '').toLowerCase(),
                          //     )
                          // },
                          // })}
                      />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Где найти пригласительный код?</AccordionTrigger>
                  <AccordionContent>
                    Пригласительный код находится на странице “Управление доверительными лицами”
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <FormField
                  control={confidantRequestDialogForm.control}
                  name='accessCode'
                  render={({ field }) => (
                  <FormItem>
                      <FormControl>
                      <FloatingLabelInput
                          // {...form.register('email', {
                          //   setValueAs: (value: string) => {
                          //     console.log(value)
                          //     return 'test' //value.trim()
                          //   }
                          // })}
                          {...field}
                          id='accessCode'
                          label={<FormLabel>Код доступа</FormLabel>}
                          // {...form.register('email', {
                          // onChange: (e) => {
                          //     const x = e.target.value
                          //     if (x === '') setTimeout(() => form.clearErrors())
                          //     form.setValue(
                          //     'email',
                          //     x.replace(/ /g, '').toLowerCase(),
                          //     )
                          // },
                          // })}
                      />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Где найти код доступа?</AccordionTrigger>
                  <AccordionContent>
                    Код доступа выдаётся сотрудником МФЦ при очном обращении. (ТУТ ТЕКСТ ПОМЕНЯЕМ)
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button className="mt-[16px] w-full" type='submit'>
                  Продолжить
              </Button>
          </FormNext>
      </Form>
      </DialogContent>
    </Dialog>
  );
}
