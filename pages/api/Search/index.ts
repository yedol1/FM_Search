import { NextApiRequest, NextApiResponse } from 'next'
import mysql, { Connection, MysqlError } from 'mysql'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection: Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  connection.connect((err: MysqlError | null) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: 'Database connection failed' })
      return
    }

    let filter: string = req.query.filter ? req.query.filter.toString() : 'ca'
    const verify: string = req.query.verify === 'true' ? 'DESC' : 'ASC'
    const page: number = req.query.page ? Number(req.query.page) : 1
    const limit: number = 20
    const options = req.query.options
      ? JSON.parse(req.query.options.toString())
      : []

    const whereClauses = options
      .map(({ key, value, operator }) => {
        return `${key} ${operator} ${value}`
      })
      .join(' AND ')
    let offset: number = (page - 1) * limit

    if (page === 0) {
      offset = 20
    }

    if (filter === 'Date of birth' || filter === 'Values_column') {
      filter = `\`${filter}\``
    }

    const query: string = `SELECT *, 
    CASE
      WHEN pa < -10 THEN pa * -2
      WHEN pa < 0 THEN pa * -20
      ELSE pa
    END AS pa_converted ,
    CASE
      WHEN Values_column = 347975206 THEN -1
      ELSE Values_column
    END AS Values_column FROM fm_table ${
      whereClauses ? `WHERE ${whereClauses}` : ''
    } ORDER BY ${filter} ${verify} LIMIT ${limit} OFFSET ${offset}`
    console.log(query)
    connection.query(query, (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Database query failed' })
        return
      }

      res.status(200).json(result)
    })
  })
}
