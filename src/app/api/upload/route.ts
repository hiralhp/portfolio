import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename: lowercase, replace spaces/special chars with hyphens
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const base = file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const filename = `${base}.${ext}`

    const dir = path.join(process.cwd(), 'public', 'images', 'projects')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    fs.writeFileSync(path.join(dir, filename), buffer)

    return Response.json({ path: `/images/projects/${filename}` })
  } catch {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
