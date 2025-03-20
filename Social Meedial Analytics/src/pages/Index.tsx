
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Activity, TestTube } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Social Media Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore insights from your social media data with our intuitive dashboard
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Top Users</CardTitle>
              <CardDescription>
                Users with highest number of posts
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link to="/top-users">View Top Users</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <CardTitle>Trending Posts</CardTitle>
              <CardDescription>
                Posts with maximum comments
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link to="/trending-posts">View Trending Posts</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <CardTitle>Feed</CardTitle>
              <CardDescription>
                Real-time feed of latest posts
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link to="/feed">View Feed</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center mb-4">
              <TestTube className="h-6 w-6" />
            </div>
            <CardTitle>API Test Runner</CardTitle>
            <CardDescription>
              Test connection to social media API endpoints
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/test">Run API Tests</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
