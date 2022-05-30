interface InputProps {
  label: string
  onChange?: React.ChangeEventHandler | undefined
}

export default function Input(props: InputProps) {
  return (
    <div className='my-2 grid grid-cols-6 items-center w-3/4'>
      <label className='font-medium text-gray-700'>{props.label}</label>
      <input
        className='col-span-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md'
        type='text'
        onChange={props.onChange}
      />
    </div>
  )
}
