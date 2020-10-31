import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import departmentsRoutes from './routes/departments.routes'
import employeesRoutes from './routes/employees.routes'
import productsRoutes from './routes/products.routes'


interface Route {
  path: string;
  routes: express.Router
}

class App {
  app: express.Application
  routes: Route[] = []
  db: mongoose.Connection
  server: any

  constructor() {
    this.app = express()
  }

  connectToDb(url: string) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    this.db = mongoose.connection
    this.db.once('open', () => {
      console.log('Connected to the database')
    })
    this.db.on('error', err => console.log('Error ' + err))
  }

  addRoutes(path: string, routes: express.Router) {
    this.routes.push({ path, routes })
  }

  prepareRoutes() {
    for(const group of this.routes) {
      this.app.use(group.path, group.routes)
    }
  }

  run(port: string) {

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    this.prepareRoutes()

    this.server = this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  }

}

const app = new App()
app.connectToDb('mongodb://localhost:27017/booksDB')
app.addRoutes('/api/', departmentsRoutes)
app.addRoutes('/api/', employeesRoutes)
app.addRoutes('/api/', productsRoutes)
app.run('3000')

