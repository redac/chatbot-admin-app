interface SelectOptionType {
  label: string
  value: string
}

interface ListProps {
  label: string
  options?: string[] | undefined
  name: string
  id: string
  value?: string | undefined
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
}

export default function Select(props: ListProps) {
  return (
    <div className='grid grid-cols-6 items-center w-3/4 my-2'>
      <label className='font-medium text-gray-700' htmlFor={props.id}>
        {props.label}
      </label>
      <select
        className='col-span-5 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md'
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options && props.options.map((item) => <option value={item}>{item}</option>)}
      </select>
    </div>
  )
}
