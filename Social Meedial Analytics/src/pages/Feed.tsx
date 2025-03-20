
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeed, addNewPost } from "@/data/mockData";
import { Post } from "@/types/social";
import { RefreshCw } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = getFeed();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Simulate creating a new post
      const randomUserId = Math.floor(Math.random() * 7) + 1;
      const contents = [
        "Just shared a new photo from my trip!",
        "Working on an exciting new project",
        "Having coffee at my favorite spot",
        "Just finished reading an amazing book",
        "Learning something new today"
      ];
      const randomContent = contents[Math.floor(Math.random() * contents.length)];
      
      // Add the new post to our mock data
      addNewPost(randomUserId, randomContent);
      
      // Refetch the feed
      await new Promise(resolve => setTimeout(resolve, 800));
      const updatedFeed = getFeed();
      setPosts(updatedFeed);
    } catch (error) {
      console.error("Error refreshing feed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Layout title="Feed">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Real-time feed of posts, with newest at the top
          </p>
          
          <Button 
            onClick={handleRefresh} 
            disabled={loading || refreshing}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

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
                    <Skeleton className="h-4 w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full my-2" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual post data
            posts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`overflow-hidden transition-all duration-300 hover:shadow-md ${index === 0 ? "border-primary/50" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {post.userName.charAt(0)}
                      </div>
                      <span className="font-medium">{post.userName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <span>{post.commentCount} comments</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
