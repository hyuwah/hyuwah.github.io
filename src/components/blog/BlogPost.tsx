import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface BlogPostData {
  slug: string;
  data: {
    title: string;
    description?: string;
    pubDate: Date;
    updatedDate?: Date;
    tags?: string[];
  };
}

interface BlogPostProps {
  post: BlogPostData;
  children: ReactNode;
}

export default function BlogPost({ post, children }: BlogPostProps) {
  return (
    <>
      <nav className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <a href="/blog" className="inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </a>
        </Button>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
            {post.data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <time className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.data.pubDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {post.data.updatedDate && (
              <span>
                · Updated {post.data.updatedDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            )}
          </div>
          
          {post.data.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.data.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <hr className="border-slate-100 dark:border-slate-800 mb-8" />

        <div className="prose dark:prose-invert max-w-none">
          {children}
        </div>
      </article>
    </>
  );
}