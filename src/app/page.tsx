import { Button } from '@/components/ui'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div>
      {t('title')}
      <Button>Default</Button>
      <Button variant='ghost'>ghost</Button>
      <Button variant='outline'>outline</Button>
      <Button variant='secondary'>secondary</Button>
    </div>
  )
}
