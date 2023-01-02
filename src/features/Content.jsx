import axios from 'axios'
import React, { useState } from 'react'
import CloseBtn from '../assets/delete_icon.svg'
import './content.css'
import FetchData from './FetchData'
import FormEdit from './FormEdit'
import ListCard from './ListCard'
import {URL_Ext} from '../Url_Ext'
// import ClipLoader from "react-spinners/ClipLoader";


const Content = () => {
  
  const [editStatus, setEditStatus] = useState(false)
  const [dumpData, setDumpData] = useState([])

  const { data } = FetchData(`${URL_Ext}/5R2I/todo/`)
   
  const delHandle = async (id) => {
    await axios.delete(`${URL_Ext}/5R2I/todo/${id}`)
    console.log('list todo deleted');
    window.location.reload();
  }

  const editHandle = async (id) => {
    setEditStatus(true)
    try {      
      const res = await axios.get(`${URL_Ext}+/5R2I/todo/${id}`)
      setDumpData(res.data)
    } catch (error) {
      console.log(error);
    }
    // getDB => edit form => onChange to editDB => onSubmit setEditDB._id === editDB
  }

  return (
    <div className="contentWrapper">
      {
        data.map((item) => {
          return (
            <ListCard
              key={item._id}
              date={item.dateline}
              todo={item.todo}
              priority={item.priority}
              delHandle={() => delHandle(item._id)}
              editHandle={() => editHandle(item._id)}
            />
          )
        })
      }
      {
        editStatus ?
          <div className="editContainer">
            <div className='editModal'>
              <div className='closeBtn' onClick={() => setEditStatus(false)}>
                <img src={CloseBtn} alt="" />
              </div>
              <FormEdit dumpData={dumpData} />
            </div>
          </div>
          : null
      }

    </div>


  )
}

export default Content