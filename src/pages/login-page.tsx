
'use client'
import { Card } from "@/src/shared/ui/card";
import logo from '@/src/shared/assets/images/logo.png'
import loading from '@/src/shared/assets/images/icons/loading.png'
import yes from '@/src/shared/assets/images/icons/yes.png'
import no from '@/src/shared/assets/images/icons/no.png'
import ImageNext from "next/image";
import { FloatingLabelInput } from "@/src/shared/ui/floating-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormNext from 'next/form'     
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/shared/ui/form";
import { Button } from "@/src/shared/ui/button";
import { useState } from "react";
import { InputOTP, InputOTPSlot } from "@/src/shared/ui/input-otp";
import { apiAuth } from "@/src/entities/auth/api";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { TrusterInVerificationCodeSType } from "@/src/entities/auth/schemas";

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
    const [step, setStep] = useState<'login' | 'code' | 'notify' | 'confidant'>('login')
    // const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [confidants, setConfidants] = useState<TrusterInVerificationCodeSType[]>([])

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
    // const users = [
    //     {full_name: 'Иванов Иван', status: 'loading'},
    //     {full_name: 'Ильинский Илья', status: 'yes'},
    //     {full_name: 'Денисов Денис', status: 'no'},
    //     {full_name: 'Марьина Мария', status: 'loading'},
    // ]

    async function onSubmitLoginForm() {
        loginForm.setValue('login', loginForm.getValues().login.trim())
        // console.log(loginForm.getValues())
        const res = await apiAuth.sendVerificationCodeForAuthorization({
            phone_or_email: loginForm.getValues().login.trim()
        })
        if (res) {
            setStep('code')
        }
    }
    async function onSubmitCodeForm() {
        codeForm.setValue('code', codeForm.getValues().code.trim())
        console.log(codeForm.getValues())

        const res = await apiAuth.confirmVerificationCodeForAuthorization({
            verification_code_value: codeForm.getValues().code.trim()
        })
        console.log(res)
        if (res) {
            if (res.type === 'authenticate_via_verification_code') {
                console.log('w')
                const res2 = await apiAuth.authenticate({
                    verification_code_value: codeForm.getValues().code.trim()
                })
                setCookie('token', res2.value, {
                    expires: new Date('2100-01-01'),
                })
                router.push('/profile')
            }
            else if (res.type === 'authenticate_via_verification_code_and_trust_from_my_user_accesses') {
                setStep('notify')

                const intervalId = setInterval(async () => {
                    const res = await apiAuth.getVerificationCode({
                        value: codeForm.getValues().code.trim()
                    })
                    if (res.are_all_truster_in_verification_code_s_status_confirmed) {
                        clearInterval(intervalId)
                        const res2 = await apiAuth.authenticate({
                            verification_code_value: codeForm.getValues().code.trim()
                        })
                        setCookie('token', res2.value, {
                            expires: new Date('2100-01-01'),
                        })
                        router.push('/profile')
                    }
                }, 3000)
            }
            else if (res.type === 'authenticate_via_verification_code_and_trust_from_my_trusters') {
                setStep('confidant')

                // первый запрос чтобы не ждать 3 сек
                const res = await apiAuth.getVerificationCode({
                    value: codeForm.getValues().code.trim()
                })
                setConfidants(res.truster_in_verification_code_s)

                const intervalId = setInterval(async () => {
                    const res = await apiAuth.getVerificationCode({
                        value: codeForm.getValues().code.trim()
                    })
                    setConfidants(res.truster_in_verification_code_s)
                    if (res.are_all_truster_in_verification_code_s_status_confirmed) {
                        clearInterval(intervalId)

                        setTimeout(async () => {
                            const res2 = await apiAuth.authenticate({
                                verification_code_value: codeForm.getValues().code.trim()
                            })
                            setCookie('token', res2.value, {
                                expires: new Date('2100-01-01'),
                            })
                            router.push('/profile')
                        }, 1000)
                    }
                }, 3000)
            }
            // setStep('confidant')
        }
    }
    
    return ( // mt-[14px] bg-body
        <div className='flex flex-col justify-center items-center h-screen bg-body min-w-screen absolute left-0 right-0 overflow-x-hidden'>

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
                                            label={<FormLabel>Номер телефона / E-Mail</FormLabel>}
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
                    {/* <Button className="mt-[12px]" variant={'ghost'}>Создать новый аккаунт</Button> */}
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
                        
                        <p className="w-full text-center">Код подтверждения отправлен на номер <span className="font-bold w-full text-center">+7 800 *** ** 35</span></p> {/* почту */}
                        

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
                                        <InputOTP
                                            {...field}
                                            maxLength={6}
                                            // onChange={code => console.log(code)}
                                            // {...codeForm.register('code', {
                                            // onChange: (e) => {
                                            //     const x = e.target.value
                                            //     if (x === '') setTimeout(() => codeForm.clearErrors())
                                            //     codeForm.setValue(
                                            //     'code',
                                            //     x.replace(/ /g, '').toLowerCase(),
                                            //     )
                                            // },
                                            // })}
                                        >
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
                                    Отправить код
                                </Button>
                            </FormNext>
                            <Button variant={'ghost'} className="mt-[16px] w-full" onClick={() => setStep('login')}>
                                Вернуться назад
                            </Button>
                        </Form>
                        {/* <FloatingLabelInput label={} /> */}
                    </Card>
                </div>
            )}

            {step === 'notify' && (
                <div className="flex flex-col">
                    <Card className="w-[402px] flex flex-col items-center px-[40px] py-[32px]">
                        <ImageNext
                            src={logo}
                            alt='logo'
                            width={193}
                            height={30}
                            className="py-[16px]"
                        />
                        
                        <p className="w-full text-center">Для входа в систему, нам необходимо удостовериться, что это именно вы.</p>
                        <p className="w-full">Мы уже отправили уведомление для подтверждения входа на устройства, с которых вы ранее входили в аккаунт.</p>
                        <p className="w-full">Чтобы продолжить, откройте уведомление и разрешите вход.</p>

                        <ImageNext
                            src={loading}
                            alt='loading'
                            width={24}
                            height={24}
                            className="animate-spin"
                        />
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
                        
                        <p className="w-full text-center">Для входа в систему, нам необходимо удостовериться, что это именно вы.</p>
                        <p className="w-full">Мы уже отправили уведомление на устройства доверенных лиц. Пожалуйста, дождитесь, пока они разрешат вход.</p>
                        <p className="w-full">Список доверенных лиц:</p>

                        <div className="w-full flex flex-col gap-y-[12px]">
                            {confidants.map(u => (
                                <div className="flex items-center gap-x-[12px]" key={u.truster_id}>
                                    {u.status === 'waiting_for_confirmation' && (
                                        <ImageNext
                                            src={loading}
                                            alt='loading'
                                            width={24}
                                            height={24}
                                            className="animate-spin"
                                        />
                                    )}
                                    {u.status === 'confirmed' && (
                                        <ImageNext
                                            src={yes}
                                            alt='yes'
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {u.status === 'not_confirmed' && (
                                        <ImageNext
                                            src={no}
                                            alt='no'
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {u.truster.fullname}
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
