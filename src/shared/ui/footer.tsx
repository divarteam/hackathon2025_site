import { MousePointer2 } from 'lucide-react'
import ImageNext from 'next/image'
import LinkNext from 'next/link'

import telegram from '@/src/shared/assets/images/icons/social/telegram.png'
import vk from '@/src/shared/assets/images/icons/social/vk.png'
import ok from '@/src/shared/assets/images/icons/social/ok.png'
import rutube from '@/src/shared/assets/images/icons/social/rutube.png'

export function Footer() {
  return (
    <footer className='flex flex-col bg-secondary justify-center p-5 md:flex-row md:p-10 sm:px-10 px-3 gap-5 text-[16px] rounded-t-xl mt-[50px] absolute left-0 right-0'>
      <div className='grid grid-cols-4 xl:w-[1280px] w-full px-[100px]'>
        <div className='flex flex-col gap-2 items-center'>
          <LinkNext className='opacity-50 w-full' href='#'>Личный кабинет</LinkNext>
          <LinkNext className='opacity-50 w-full' href='#'>Регистрация</LinkNext>
          <LinkNext className='opacity-50 w-full' href='#'>Помощь</LinkNext>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <LinkNext className='opacity-50 w-full' href='#'>Как найти услугу</LinkNext>
          <LinkNext className='opacity-50 w-full' href='#'>Карта центров обслуживания</LinkNext>
          <LinkNext className='opacity-50 w-full' href='#'>Партнёрам</LinkNext>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <LinkNext className='opacity-50' href='#'>
            <div className='flex gap-x-[16px] items-center'>
              <MousePointer2 className='w-[24px] h-[24px] rotate-90' />
              <span>Уфа</span>
            </div>
          </LinkNext>
        </div>
        <div className='flex gap-x-[8px] justify-center'>
          <LinkNext className='opacity-50 hover:opacity-100' href='https://t.me/gosuslugi' target='_blank'>
            <div className='w-[40px] h-[40px] bg-foreground hover:bg-[#33b3e3] rounded-[12px] flex justify-center items-center'>
              <ImageNext
                src={telegram}
                alt='telegram'
                width={21}
                height={18}
              />
            </div>
          </LinkNext>
          <LinkNext className='opacity-50 hover:opacity-100' href='https://vk.com/gosuslugi' target='_blank'>
            <div className='w-[40px] h-[40px] bg-foreground hover:bg-[#0077ff] rounded-[12px] flex justify-center items-center'>
              <ImageNext
                src={vk}
                alt='vk'
                width={21}
                height={18}
              />
            </div>
          </LinkNext>
          <LinkNext className='opacity-50 hover:opacity-100' href='https://ok.ru/gosuslugi' target='_blank'>
            <div className='w-[40px] h-[40px] bg-foreground hover:bg-[#ff7700] rounded-[12px] flex justify-center items-center'>
              <ImageNext
                src={ok}
                alt='ok'
                width={21}
                height={18}
              />
            </div>
          </LinkNext>
          <LinkNext className='opacity-50 hover:opacity-100' href='https://rutube.ru/channel/23789311/' target='_blank'>
            <div className='w-[40px] h-[40px] bg-foreground hover:bg-[#100943] rounded-[12px] flex justify-center items-center'>
              <ImageNext
                src={rutube}
                alt='rutube'
                width={21}
                height={18}
              />
            </div>
          </LinkNext>
        </div>
      </div>
    </footer>
  )
}
