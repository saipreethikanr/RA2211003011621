
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrendingPosts } from "@/data/mockData";
import { Post } from "@/types/social";
import { MessageSquare } from "lucide-react";

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = getTrendingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title="Trending Posts">
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground mb-6">
          Posts with the maximum number of comments, sorted by popularity
        </p>

        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full my-2" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual post data
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {post.userName.charAt(0)}
                      </div>
                      <span className="text-sm text-muted-foreground">{post.userName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm px-2 py-1 bg-secondary rounded-full">
                      <MessageSquare size={14} />
                      <span>{post.commentCount} Comments</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrendingPosts;
