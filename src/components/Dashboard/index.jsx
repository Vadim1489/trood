import React from 'react'
import s from './index.module.css'
import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard() {
  return (
    <div className={s.container}>
      <h2>Projects:</h2>
      <div className={s.project}>
        <p>Create project</p>
        <AiOutlinePlus/>
      </div>
      <h2>Tasks:</h2>
      <div className={s.task}>
        <p>Create task</p>
        <AiOutlinePlus/>
      </div>
    </div>
  )
}
