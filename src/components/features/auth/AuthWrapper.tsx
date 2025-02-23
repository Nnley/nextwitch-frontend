import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  heading: string
  backButtonLabel?: string
  backButtonHref?: string
  className?: string
}

export const AuthWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  heading,
  backButtonLabel,
  backButtonHref,
  className,
}) => {
  return (
    <div className={cn('flex h-full items-center justify-center', className)}>
      <Card className='w-[450px]'>
        <CardHeader className='flex-row items-center justify-center gap-3'>
          <Image className='object-fill' src='/images/logo.svg' alt='NexTwitch' width={40} height={40} />
          <CardTitle className='text-xl'>{heading}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className='-mt-2'>
          {backButtonLabel && backButtonHref && (
            <Button variant='ghost' className='w-full'>
              <Link href={backButtonHref}>{backButtonLabel}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
