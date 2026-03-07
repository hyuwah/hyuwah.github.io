import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

interface Post {
  slug: string
  data: {
    title: string
    description?: string
    pubDate: Date
  }
}

interface RecentPostsProps {
  posts: Post[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Recent Posts
        </h2>
        <Button variant="ghost" asChild>
          <a href="/blog">
            View all
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="py-4">
              <a href={`/blog/${post.slug}`} className="block">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300">
                    {post.data.title}
                  </h3>
                  <time className="text-sm text-slate-400 flex-shrink-0">
                    {post.data.pubDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </time>
                </div>
                {post.data.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {post.data.description}
                  </p>
                )}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}