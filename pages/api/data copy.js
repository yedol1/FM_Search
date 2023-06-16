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

    const page = req.query.page ? Number(req.query.page) : 1
    const limit = 20
    let offset = (page - 1) * limit
    if (page === 0) {
      offset = 20
    }

    const name = req.query.name ? req.query.name : ''
    const position = req.query.position ? req.query.position : ''
    const age = req.query.age ? req.query.age : ''
    const nationality = req.query.nationality ? req.query.nationality : ''
    const club = req.query.club ? req.query.club : ''

    const query = `SELECT * FROM fm_table WHERE Name LIKE ? AND Position LIKE ? AND Age LIKE ? AND Nationality LIKE ? AND Club LIKE ? LIMIT ${limit} OFFSET ${offset}`
    connection.query(
      query,
      [name, position, age, nationality, club, limit, offset],
      (err, result) => {
        if (err) {
          console.error(err)
          res.status(500).json({ error: 'Database query failed' })
          return
        }

        res.status(200).json(result)
      }
    )
  })
}
