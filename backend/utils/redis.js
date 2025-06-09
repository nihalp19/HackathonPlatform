import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://deciding-kit-18643.upstash.io',
  token: 'AUjTAAIjcDEwM2NjZGQ2YWFkNDc0N2YxYTI2NTI5NTg0MjJjODY3Y3AxMA',
})

await redis.set('foo', 'bar');
const data = await redis.get('foo');