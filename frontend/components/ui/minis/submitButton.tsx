const SubmitButton: React.FC<React.HTMLProps<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} className="disabled:bg-gray-800 bg-blue-800 text-gray-200 rounded-b-lg w-full h-8" type="submit" >
      Ok
    </button>
  )
}

export default SubmitButton
