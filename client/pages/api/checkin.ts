// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Employee {
  name: string
  checkedIn: boolean
}
interface MyArray {
  [index: number]: Employee;
}

const myStrings: MyArray = [{name: 'Tom', checkedIn: true}, {name: 'Jim', checkedIn: false}];


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(myStrings)
}
