import React from 'react';
import { useLocation } from 'wouter';
import { signInAsGuest } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface GuestAuthProps {
  darkMode: boolean;
}

const GuestAuth: React.FC<GuestAuthProps> = ({ darkMode }) => {
  const [_, setLocation] = useLocation();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGuestSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await signInAsGuest();
      if (user) {
        // Redirect to resume maker after successful login
        setLocation('/resume');
      }
    } catch (error) {
      console.error("Guest authentication failed:", error);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300 p-4`}>
      <Card className={`w-full max-w-md shadow-xl ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to TailorIQ</CardTitle>
          <CardDescription className={`text-center ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
            Create and manage your professional resumes with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Firebase Configuration Required</AlertTitle>
            <AlertDescription>
              To enable Google Sign-in, add this Replit domain to your Firebase project's authorized domains.
              For now, you can continue as a guest.
            </AlertDescription>
          </Alert>
          
          <Button 
            onClick={handleGuestSignIn}
            variant="default"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Continue as Guest"}
          </Button>
        </CardContent>
        <CardFooter>
          <p className={`text-xs text-center w-full ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            By signing in, you agree to our <a href="#" className="underline hover:text-slate-900 dark:hover:text-slate-100">Terms of Service</a> and <a href="#" className="underline hover:text-slate-900 dark:hover:text-slate-100">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuestAuth;