import React, {useState} from 'react'
import './inputForm.css'
import axios from 'axios';
import { URL_Ext } from '../Url_Ext';

const InputForm = () => {
    const [date, setDate] = useState('');
    const [todo, setTodo] = useState('');
    const [priority, setPriority] = useState(true)

    const handleSubmit = async (e) => {
        const dataTodo = {
            dateline: date, todo, priority
        }
        try {
            await axios.post(`${URL_Ext}/5R2I/todo/add/`,  dataTodo )
            console.log('Submit 123', dataTodo );

        } catch (error) {
            console.log(error);
        }
        clearState();
    }

    const clearState = () => {
        setDate('');
        setTodo('');
        setPriority(true);
    }

  return (
    <div className='ltdFormContainer'>
        <div className='ltdWrapper'>
            <div className='headerForm'>add to do</div>
            <div className='inputForm'>
                <form className='ltdForm'>
                    <div className='iForm'>
                        <label htmlFor='date'>Date</label>
                        <input type='text' id='date' name="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                    </div>
                    <div className='iForm'>
                        <label htmlFor='todo'>To Do</label>
                        <textarea id='todo' name="todo" rows="5" cols="50" value={todo} onChange={(e)=>setTodo(e.target.value)} />
                    </div>
                    <div className='iForm' onChange={(e)=>setPriority(e.target.value)}>
                        <label htmlFor='todo'>Priority</label>
                        <div className='radioF'>
                            <label className='iRadio'>
                            <input type="radio" id='priority' name="priority" value={true}  defaultChecked/>
                                Yes
                            </label>
                            <label className='iRadio'>
                            <input type="radio" id='priority' name="priority" value={false}  />
                                No
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="submitBtn">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default InputForm