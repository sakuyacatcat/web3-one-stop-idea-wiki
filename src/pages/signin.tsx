import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Link,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { FirebaseError } from '@firebase/util'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

export const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      })
      push('/')
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container py={14}>
      <Heading>サインイン</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'} isLoading={isLoading}>
            ログイン
          </Button>
        </Center>
        <Center>
          <Button variant="link" mt={8}>
            <Link href="/signup">新規登録画面へ</Link>
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default SignIn
