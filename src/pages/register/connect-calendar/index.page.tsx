import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { Container, Header } from '../styles'
import { PrismaClient, Prisma } from '@prisma/client'
import { ConnectBox, ConnectItem } from './styles'
import { signIn } from 'next-auth/react'

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
export default function Register() {
  //   const {
  //     register,
  //     handleSubmit,
  //     setValue,
  //     formState: { errors, isSubmitting },
  //   } = useForm<RegisterFormData>({
  //     resolver: zodResolver(registerFormSchema),
  //   })

  const router = useRouter()

  async function handleRegister(data: RegisterFormData) {}

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
          <Button variant="secondary" size="sm" onClick={handleConnectCalendar}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
