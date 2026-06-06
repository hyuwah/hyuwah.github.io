import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from 'lucide-react';

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description?: string;
    pubDate: Date;
    updatedDate?: Date;
    tags?: string[];
    draft?: boolean;
  };
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card key={post.slug} className="group border-0 shadow-none bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors -mx-6">
          <a 
            href={`/blog/${post.slug}`}
            className="block py-6 px-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                {post.data.title}
              </h2>
              <time className="text-sm text-slate-400 flex-shrink-0 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.data.pubDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
                {' · '}{Math.max(1, Math.ceil((post.data.description?.split(' ').length || 600) / 200))} min read
              </time>
            </div>
            
            {post.data.description && (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {post.data.description}
              </p>
            )}
            
            {post.data.tags && (
              <div className="flex flex-wrap gap-2">
                {post.data.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </a>
        </Card>
      ))}
    </div>
  );
}