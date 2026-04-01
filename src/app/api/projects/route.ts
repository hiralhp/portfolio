import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'projects-data.json')

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8')
    return Response.json(JSON.parse(data))
  } catch {
    return Response.json({ error: 'Could not read projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const projects = await request.json()
    if (!Array.isArray(projects)) {
      return Response.json({ error: 'Expected an array' }, { status: 400 })
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8')
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Could not save projects' }, { status: 500 })
  }
}
