import { Kafka } from 'kafkajs'

import { prisma } from '#/database/prisma.js'

async function bootstrap() {
  await prisma.$connect()

  const kafka = new Kafka({
    clientId: 'myapp',
    retry: {
      retries: 1
    },
    brokers: ['brave-boar-8805-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'YnJhdmUtYm9hci04ODA1JMvuD6u_vkSgHq9vJoYz_hg4L7c2Cv-Y7P0Dgq7nEb0',
      password: 'YmQyODMxOWQtMzc2Yy00NzJjLWJkMGEtNzFhYjMwMGE5ZDVm'
    },
    ssl: true
  })

  const consumer = kafka.consumer({
    groupId: `consumer-${Math.floor(Math.random() * 99999)}-group`,
    allowAutoTopicCreation: true
  })

  await consumer.connect()
  await consumer.subscribe({ topic: 'users', fromBeginning: true })

  const start = performance.now()
  await consumer.run({
    async eachMessage(payload) {
      const { email, createdAt } = JSON.parse(payload.message.value?.toString() ?? '{}')
      await prisma.user.create({
        data: {
          email,
          createdAt
        }
      })
    }
  })

  const end = performance.now()
  console.log((end - start).toFixed(3))
}

bootstrap()
