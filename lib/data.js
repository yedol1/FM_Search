import fs from 'fs'
import mysql from 'mysql'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_NAME)

const loadData = async () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      console.log('Connected to database')

      fs.readFile('data.json', 'utf8', async (err, data) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        const jsonData = JSON.parse(data)

        const promises = jsonData.map((item) => {
          return new Promise((resolve, reject) => {
            let dateParts = item['Date of birth'].split('/')
            let dateObject = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            )
            item['Date of birth'] = dateObject.toISOString().split('T')[0]

            const query = 'INSERT INTO fm_table SET ?'
            connection.query(query, item, (err, result) => {
              if (err) {
                console.error(err)
                reject(err)
                return
              }
              console.log('Data inserted', result)
              resolve()
            })
          })
        })

        try {
          await Promise.all(promises)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  })
}

loadData()
  .then(() => console.log('All data inserted'))
  .catch((err) => console.error(err))

export { loadData }
