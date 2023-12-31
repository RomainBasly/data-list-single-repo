import Layout from '@/components/Elements/Layout'
import CodeVerificationForm from '@/components/Elements/Form/CodeVerificationForm'

export default function VerifyEmail() {
  return (
    <Layout pageType="register">
      <CodeVerificationForm />
    </Layout>
  )
}
