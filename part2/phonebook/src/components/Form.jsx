const Form = ({ handleSubmit, makeChangeHandler }) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={makeChangeHandler("name")} />
        </div>
        <div>
          number: <input onChange={makeChangeHandler("number")} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form