export interface PageLayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string | JSX.Element
}

export function PageLayout(props: PageLayoutProps) {
  return (
    <div className='container mx-auto'>
      {typeof props.title === 'string' ? (
        <h1 className='h-20 my-12 text-6xl font-black text-transparent font-display bg-clip-text bg-gradient-to-tr from-blue-500 to-blue-300'>
          {props.title}
        </h1>
      ) : (
        props.title
      )}
      {props.children}
    </div>
  )
}
