interface CardProps {
  children: JSX.Element | JSX.Element[]
}

export default function Card(props: CardProps) {
  return (
    <>
      <div className='w-full p-6 my-4 bg-white border rounded-lg shadow '>{props.children}</div>
    </>
  )
}
