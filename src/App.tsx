import { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";

import './App.css'

interface Thing {
  todo: string,
  clicked: boolean
}

function App() {
  const [thingsToDo, setThingsToDo] = useState<Thing[]>([{ todo: 'homework', clicked: false }, { todo: 'Portfolio', clicked: false }, {todo: 'Get Job', clicked: false}])
  const [thingToAdd, setThingToAdd] = useState<string>('')

  const handleAddThing = (event: React.FormEvent) => {
    event.preventDefault();
    thingToAdd.length > 0 && setThingsToDo([...thingsToDo, { todo: thingToAdd, clicked: false }])
  }

  const handleThingClick = (liKey: number) => {
    const nextThingsToDo: Thing[] = thingsToDo.map((thing, key) => {
      return liKey === key ? { ...thing, clicked: !thing.clicked } : thing
    })
    setThingsToDo(nextThingsToDo)
  }

  const removeThing = (liKey: number) => {
    const nextThingsToDo: Thing[] = thingsToDo.filter((_, key) => liKey !== key)
      setThingsToDo(nextThingsToDo)
  }

  return (
    <>
      <div className='mainAppDiv'>
        <h1 className='title'>Lee's Big List Of Shit To Do:</h1>
        {thingsToDo.length > 0 && (
          <ul>
            {thingsToDo.map((thing, key) => {
              return (
                <div className='thingAndTrash' key={key}>
              <li
                className={thing.clicked ? 'thingList crossed' : 'thingList'}
                key={key}
                onClick={() => handleThingClick(key)}
              >{thing.todo}</li>
              <FaRegTrashCan fill="orange" size={50}
              onClick={() => removeThing(key)}/>
              </div>)
            })}
          </ul>
        )}
        <form onSubmit={(event) => handleAddThing(event)}>
          <input type="text" className='addThing'
            onChange={(event) => setThingToAdd(event.target.value)} />
          <input type="submit" className='submit' />
        </form>
      </div>
    </>
  )
}

export default App
