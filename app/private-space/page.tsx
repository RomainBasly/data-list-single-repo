'use client'
import { AuthorizationApi } from '@/api/Back/AuthorizationApi'
import Layout from '@/components/Elements/Layout'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface PrivateSpaceProps {}

interface PrivateSpaceState {}

export default function PrivateSpace() {
  return <Layout pageType="default">{'coucou'}</Layout>
}
