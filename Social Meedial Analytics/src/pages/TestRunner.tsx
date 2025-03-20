
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getUsers, 
  getUserPosts, 
  getPostComments, 
  getAllPosts, 
  getPostsWithCommentCounts 
} from '@/lib/api';
import { 
  validateUsersResponse, 
  validatePost, 
  validateComment,
  testApiResponses 
} from '@/utils/testUtils';
import { toast } from 'sonner';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import ErrorDisplay from '@/components/ErrorDisplay';

const TestRunner = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<any>({});
  const [error, setError] = useState<Error | null>(null);

  const runTests = async () => {
    setIsRunningTests(true);
    setError(null);
    
    try {
      const results: Record<string, any> = {};
      
      // Test getUsers()
      results.users = await testApiResponses(
        getUsers,
        validateUsersResponse
      );
      
      // If users test passed, test getUserPosts()
      if (results.users.success && Object.keys(results.users.data).length > 0) {
        const firstUserId = Object.keys(results.users.data)[0];
        results.posts = await testApiResponses(
          () => getUserPosts(firstUserId),
          (posts) => Array.isArray(posts) && posts.every(validatePost)
        );
        
        // If posts test passed, test getPostComments()
        if (results.posts.success && results.posts.data.length > 0) {
          const firstPostId = results.posts.data[0].id;
          results.comments = await testApiResponses(
            () => getPostComments(firstPostId),
            (comments) => Array.isArray(comments) && comments.every(validateComment)
          );
        }
      }
      
      // Test complex queries
      results.allPosts = await testApiResponses(
        getAllPosts,
        (posts) => Array.isArray(posts) && posts.every(validatePost)
      );
      
      results.trendingPosts = await testApiResponses(
        getPostsWithCommentCounts,
        (posts) => Array.isArray(posts) && posts.every(post => 
          validatePost(post) && typeof post.commentCount === 'number'
        )
      );
      
      setTestResults(results);
      
      // Show success or failure toast
      const allTestsPassed = Object.values(results).every(result => result.success);
      
      if (allTestsPassed) {
        toast.success('All API tests passed!', {
          description: 'The application is successfully connected to the API endpoints.'
        });
      } else {
        toast.error('Some API tests failed', {
          description: 'Check the test results for details.'
        });
      }
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast.error('Test execution failed', {
        description: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsRunningTests(false);
    }
  };
  
  useEffect(() => {
    // Auto-run tests when component mounts
    runTests();
  }, []);

  return (
    <div className="container mx-auto max-w-4xl animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">API Test Runner</h1>
        <Button 
          onClick={runTests} 
          disabled={isRunningTests}
          variant="outline"
        >
          <RefreshCw size={16} className={`mr-2 ${isRunningTests ? "animate-spin" : ""}`} />
          Run Tests
        </Button>
      </div>
      
      {error && <ErrorDisplay message={error.message} onRetry={runTests} />}
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users API</TabsTrigger>
          <TabsTrigger value="posts">Posts API</TabsTrigger>
          <TabsTrigger value="comments">Comments API</TabsTrigger>
          <TabsTrigger value="complex">Complex Queries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <TestResultCard
            title="Get Users"
            endpoint="http://20.244.56.144/test/users"
            result={testResults.users}
            isLoading={isRunningTests && !testResults.users}
          />
        </TabsContent>
        
        <TabsContent value="posts">
          <TestResultCard
            title="Get User Posts"
            endpoint="http://20.244.56.144/test/users/{userId}/posts"
            result={testResults.posts}
            isLoading={isRunningTests && !testResults.posts}
          />
        </TabsContent>
        
        <TabsContent value="comments">
          <TestResultCard
            title="Get Post Comments"
            endpoint="http://20.244.56.144/test/posts/{postId}/comments"
            result={testResults.comments}
            isLoading={isRunningTests && !testResults.comments}
          />
        </TabsContent>
        
        <TabsContent value="complex">
          <div className="space-y-4">
            <TestResultCard
              title="Get All Posts (combined query)"
              endpoint="Multiple endpoints combined"
              result={testResults.allPosts}
              isLoading={isRunningTests && !testResults.allPosts}
            />
            
            <TestResultCard
              title="Get Trending Posts with Comment Counts"
              endpoint="Multiple endpoints combined"
              result={testResults.trendingPosts}
              isLoading={isRunningTests && !testResults.trendingPosts}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TestResultCardProps {
  title: string;
  endpoint: string;
  result?: {
    success: boolean;
    message?: string;
    data?: any;
  };
  isLoading: boolean;
}

const TestResultCard = ({ title, endpoint, result, isLoading }: TestResultCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>{title}</div>
          {result && (
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
              <span className={result.success ? "text-green-500" : "text-red-500"}>
                {result.success ? "Success" : "Failed"}
              </span>
            </div>
          )}
        </CardTitle>
        <div className="text-sm text-muted-foreground">{endpoint}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <RefreshCw className="animate-spin text-primary" size={24} />
          </div>
        ) : result ? (
          <div>
            {!result.success && result.message && (
              <div className="text-red-500 mb-2">{result.message}</div>
            )}
            {result.data && (
              <div className="bg-muted p-4 rounded-md overflow-x-auto max-h-40">
                <pre className="text-xs">{JSON.stringify(result.data, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground">Test not run yet</div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestRunner;
