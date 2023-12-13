import DefaultTemplate from '@/components/Elements/DefaultTemplate'
import Layout from '@/components/Elements/Layout'
import { Loader } from '@/components/Materials/Loader'

export default function Register() {
  return (
    <Layout pageType="register">
      <Loader />
    </Layout>
  )
}
