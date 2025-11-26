import React from 'react'
import LoginPage, { LoginType } from './LoginPage'

export const SignupPage = () => {
  return (
    <LoginPage loginType={LoginType.Register} />
  )
}
