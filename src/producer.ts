import { Kafka } from 'kafkajs'
import { faker } from '@faker-js/faker'

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['brave-boar-8805-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'YnJhdmUtYm9hci04ODA1JMvuD6u_vkSgHq9vJoYz_hg4L7c2Cv-Y7P0Dgq7nEb0',
      password: 'YmQyODMxOWQtMzc2Yy00NzJjLWJkMGEtNzFhYjMwMGE5ZDVm'
    },
    ssl: true
  })

  const producer = kafka.producer()

  await producer.connect()

  let i = 0
  while (i < 50000) {
    const user = {
      email: faker.internet.email({
        provider: 'gmail.com',
        firstName: faker.person.firstName().toLowerCase(),
        lastName: faker.person.lastName().toLowerCase()
      }),
      createdAt: faker.date.past()
    }

    await producer.send({
      topic: 'users',
      messages: [
        {
          value: JSON.stringify(user)
        }
      ]
    })
    i++
  }
}

bootstrap()
