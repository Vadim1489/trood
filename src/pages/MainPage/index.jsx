import React from 'react'
import Dashboard from '../../components/Dashboard'
import s from './index.module.css'
import Form from '../../components/Form'

export default function MainPage() {
  return (
    <div className={s.container}>
        <Dashboard/>
        <Form />
    </div>
  )
}
