const URL = 'https://68902e38944bf437b594f827.mockapi.io/api/1/users'
const text = "Hello World"

async function getMessage() {
  const response = await fetch(URL)

  if (!response.ok) {
    throw new Error('cannot fetch Data')
  }

  return response.json()
}

export default async function Page({ params }) {
  const blogs = await getMessage()
  console.log('blog: ', blogs)
  return (
    <div>
      {
        blogs.map((blog, index)=> (
          <div key={index}>
            {blog.name}{blog.id}
          </div>
        ))
      }
    </div>
  )
}
