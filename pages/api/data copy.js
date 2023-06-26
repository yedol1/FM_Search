import mysql from 'mysql'

export default function handler(req, res) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  connection.connect((err) => {
    if (err) {
      console.error(err)
      res.status(500).json({ error: 'Database connection failed' })
      return
    }
    const filter = req.query.filter ? req.query.filter : 'ca'
    const verify = req.query.verify ? 'DESC' : 'ASC'
    const page = req.query.page ? Number(req.query.page) : 1
    const limit = 20
    let offset = (page - 1) * limit
    if (page === 0) {
      offset = 20
    }

    if (filter === 'Date of birth' || filter === 'Values_column') {
      filter = `\`${filter}\``
    }

    const query = `SELECT *, 
    CASE
      WHEN pa < -10 THEN pa * -2
      WHEN pa < 0 THEN pa * -20
      ELSE pa
    END AS pa_converted FROM fm_table ORDER BY ${filter} ${verify} LIMIT ${limit} OFFSET ${offset}`

    connection.query(query, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ error: 'Database query failed' })
        return
      }

      res.status(200).json(result)
    })
  })
}
