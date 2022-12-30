import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { Container, Header } from '../styles'
import { PrismaClient, Prisma } from '@prisma/client'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O username precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O username pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O username precisa ter pelo menos 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>
export default function ConnectCalendar() {
  //   const {
  //     register,
  //     handleSubmit,
  //     setValue,
  //     formState: { errors, isSubmitting },
  //   } = useForm<RegisterFormData>({
  //     resolver: zodResolver(registerFormSchema),
  //   })

  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignIn = session.status === 'authenticated'

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignIn ? (
            <Button size="sm" disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se voce habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}
        <Button
          type="submit"
          onClick={handleNavigateToNextStep}
          disabled={!isSignIn}
        >
          Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
