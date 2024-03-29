import { Avatar, AvatarFallback } from './ui/Avatar'
import { AvatarProps } from '@radix-ui/react-avatar'
import { User } from 'next-auth'
import Image from 'next/image'
import { FC } from 'react'
import { Icons } from './Icons'

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
        {user.image ? (
            <div className='relative aspect-square h-full w-full'>
                <Image
                    fill
                    src={user.image}
                    alt='profile picture'
                    referrerPolicy='no-referrer'
                />

            </div>
            ) : 
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
                <Icons.user className='h-4 w-4'></Icons.user>
            </AvatarFallback>
        }
    </Avatar>
  )
}