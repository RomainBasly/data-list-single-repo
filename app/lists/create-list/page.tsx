import Layout from '@/components/Elements/Layout'
import React from 'react'
import classes from './classes.module.scss'
import { CreateListForm } from '@/components/Elements/Form/CreateListForm'
import SocketConnector from '@/components/Materials/SocketConnector'

export default function CreateList() {
  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <div className={classes['content']}>
          <h2 className={classes['subtitle']}>Créer une liste</h2>
          <CreateListForm />
        </div>
      </div>
    </Layout>
  )
}
