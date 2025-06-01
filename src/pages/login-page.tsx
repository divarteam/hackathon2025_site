
'use client'
import { Card } from "@/src/shared/ui/card";
import logo from '@/src/shared/assets/images/logo.png'
import loading from '@/src/shared/assets/images/icons/loading.png'
import yes from '@/src/shared/assets/images/icons/yes.png'
import no from '@/src/shared/assets/images/icons/no.png'
import ImageNext from "next/image";
import { FloatingLabelInput } from "../shared/ui/floating-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNext from 'next/form'     
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/shared/ui/form";
import { Button } from "@/src/shared/ui/button";
import { useState } from "react";
import { InputOTP, InputOTPSlot } from "../shared/ui/input-otp";

const LoginFormSchema = z.object({
  login: z.string().min(2, {
    message: "Введите логин",
  }),
})

const CodeFormSchema = z.object({
  code: z.string().min(6, {
    message: "Введите код",
  }),
})

export default function LoginPage() {
    const [step, setStep] = useState<'login' | 'code' | 'confidant'>('login')

    const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            login: "",
        },
    })
    const codeForm = useForm<z.infer<typeof CodeFormSchema>>({
        resolver: zodResolver(CodeFormSchema),
        defaultValues: {
            code: "",
        },
    })
    const users = [
        {full_name: 'Иванов Иван', status: 'loading'},
        {full_name: 'Ильинский Илья', status: 'yes'},
        {full_name: 'Денисов Денис', status: 'no'},
        {full_name: 'Марьина Мария', status: 'loading'},
    ]

    function onSubmitLoginForm() {
        console.log(loginForm.getValues())

        setStep('code')
    }
    function onSubmitCodeForm() {
        console.log(codeForm.getValues())

        setStep('confidant')
    }
    
    return ( // mt-[14px]
        <div className='flex flex-col justify-center items-center h-screen bg-body'>

            {step === 'login' && (
                <div className="flex flex-col">
                    <Card className="w-[402px] flex flex-col items-center px-[40px] py-[32px]">
                        <ImageNext
                            src={logo}
                            alt='logo'
                            width={193}
                            height={30}
                            className="py-[16px]"
                        />
                        
                        <p className="w-full">Введите номер телефона, прикреплённый к вашему аккаунту, в поле ниже:</p>

                        <Form {...loginForm}>
                            <FormNext
                                onSubmit={loginForm.handleSubmit(onSubmitLoginForm)}
                                className='w-full'
                                action={''}
                            >
                                <FormField
                                    control={loginForm.control}
                                    name='login'
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
                                            id='email'
                                            label={<FormLabel>Номер телефона</FormLabel>}
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
                                <Button className="mt-[16px] w-full" type='submit'>
                                    Продолжить
                                </Button>
                            </FormNext>
                        </Form>
                        {/* <FloatingLabelInput label={} /> */}
                    </Card>
                    <Button className="mt-[12px]" variant={'ghost'}>Создать новый аккаунт</Button>
                </div>
            )}

            {step === 'code' && (
                <div className="flex flex-col">
                    <Card className="w-[402px] flex flex-col items-center px-[40px] py-[32px]">
                        <ImageNext
                            src={logo}
                            alt='logo'
                            width={193}
                            height={30}
                            className="py-[16px]"
                        />
                        
                        <p className="w-full">Был отправлен код подтверждения на указанный номер телефона:</p>
                        <p className="text-primary w-full">+7 (800) 555-35-35</p>
                        <p className="w-full">Введите полученный код в поле ниже:</p>

                        <Form {...codeForm}>
                            <FormNext
                                onSubmit={codeForm.handleSubmit(onSubmitCodeForm)}
                                className='w-full'
                                action={''}
                            >
                                <FormField
                                    control={codeForm.control}
                                    name="code"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button className="mt-[16px] w-full" type='submit'>
                                    Продолжить
                                </Button>
                            </FormNext>
                        </Form>
                        {/* <FloatingLabelInput label={} /> */}
                    </Card>
                </div>
            )}

            {step === 'confidant' && (
                <div className="flex flex-col">
                    <Card className="w-[402px] flex flex-col items-center px-[40px] py-[32px]">
                        <ImageNext
                            src={logo}
                            alt='logo'
                            width={193}
                            height={30}
                            className="py-[16px]"
                        />
                        
                        <p className="w-full">Для входа в систему, нам необходимо удостовериться, что это именно вы.</p>
                        <p className="w-full">Мы уже отправили уведомление на устройства доверенных лиц. Пожалуйста, дождитесь, пока они разрешат вход.</p>
                        <p className="w-full">Список доверенных лиц:</p>

                        <div className="w-full flex flex-col gap-y-[12px]">
                            {users.map(u => (
                                <div className="flex items-center gap-x-[12px]" key={u.full_name}>
                                    {u.status === 'loading' && (
                                        <ImageNext
                                            src={loading}
                                            alt='loading'
                                            width={24}
                                            height={24}
                                            className="animate-spin"
                                        />
                                    )}
                                    {u.status === 'yes' && (
                                        <ImageNext
                                            src={yes}
                                            alt='yes'
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {u.status === 'no' && (
                                        <ImageNext
                                            src={no}
                                            alt='no'
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {u.full_name}
                                </div>
                            ))}
                        </div>
                        
                        <Button className="mt-[12px] w-full" variant={'secondary'}>Вернуться назад</Button>
                    </Card>
                </div>
            )}

        </div>
    )
}