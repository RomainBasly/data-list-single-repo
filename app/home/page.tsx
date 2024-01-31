import Layout from '@/components/Elements/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function Home() {
  return (
    <Layout pageType="default">
      <div style={{ color: 'red' }}>{'coucou'}</div>
      <Link href="/lists/create-list">Créer une liste</Link>
    </Layout>
  )
}
