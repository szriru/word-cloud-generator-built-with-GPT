import cn from 'classnames'
interface MainCardProps {
  children: React.ReactNode
  className?: string
}

export default function MainCard({ children, className }: MainCardProps) {
  return (
    <div className={cn(className, 'rounded-xl  w-fit h-fit ring-inset ring-neutral-400 ring-8 ring-transparent bg-neutral-50 dark:bg-neutral-700')}>
      {children}
    </div>
  )
}