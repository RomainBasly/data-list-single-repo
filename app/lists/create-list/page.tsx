import Layout from '@/components/Elements/Layout'
import React from 'react'
import classes from './classes.module.scss'
import { CreateListForm } from '@/components/Elements/Form/CreateListForm'

export default function CreateList() {
  return (
    <Layout pageType="default">
      <div className={classes['root']}>
        <div className={classes['content']}>
          <h3 className={classes['subtitle']}>Créer une liste</h3>
          <CreateListForm />
        </div>
      </div>
    </Layout>
  )
}
