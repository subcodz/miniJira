import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex w-[calc(100%-2rem)] flex-col flex-1 items-center justify-center font-sans m-5 dark:bg-black">
      <h1 className="text-white font-mono text-[30px] sm:text-4xl flex top-10 text-left max-w-[55ch]"> Welcome to MiniJira</h1>
      <p className="text-gray-500 text-[16px] leading-5 mt-3 mb-10 max-w-[55ch] px-4">Your lightweight project management tool. The all in one place to manage, plan, track all your projects with all your people.</p>
      <Card className="w-[calc(100%-2rem)] max-w-[350px]  flex items-center bg-black border-1 border-gray-700 p-5  inset-shadow-gray-400/25 inset-shadow-md shadow-gray-700/30 shadow-2xl">

          <svg xmlns="http://www.w3.org/2000/svg" width="138" height="58" viewBox="0 0 78 30" fill="none" id="Logo"><g id="logomark"><path d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.4689 21.7736 24.469 21.7738 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z" fill="#394149"></path><path d="M39.3646 22.3934C38.3359 23.4221 36.9407 24 35.4859 24C33.0506 24 30.9859 22.413 30.2698 20.2167L25.7988 24.6877C27.8386 27.8819 31.4149 30 35.4859 30C38.532 30 41.4533 28.7899 43.6072 26.636L62.6366 7.6066C63.6653 6.57791 65.0605 6 66.5153 6C69.5448 6 72.0006 8.45584 72.0006 11.4853C72.0006 12.9401 71.4227 14.3353 70.394 15.364L63.3646 22.3934C62.3359 23.4221 60.9407 24 59.4859 24C57.0504 24 54.9856 22.4127 54.2696 20.2162L49.7986 24.6873C51.8383 27.8818 55.4147 30 59.4859 30C62.532 30 65.4533 28.7899 67.6072 26.636L74.6366 19.6066C76.7905 17.4527 78.0006 14.5314 78.0006 11.4853C78.0006 5.14214 72.8585 0 66.5153 0C63.4692 0 60.5479 1.21005 58.394 3.36396L39.3646 22.3934Z" fill="#394149"></path></g></svg>

        
          <div className="w-[50%] bg-gray-800 h-[2px] my-6"></div>

          <p className="text-gray-400 pb-2 text-[12px] font-jetbrains-mono">SIGN IN BELOW</p>

          <Button variant="clean_dark" className="w-full ">
            <svg viewBox="0 0 24 24" className="h-4 w-4"> {/* Google SVG icon */}
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          Continue with Google
        </Button>
        <Button variant="clean_dark" className="w-full mt-2">
          <svg viewBox="0 0 24 24"
            className="h-5 w-5 fill-blue-500 "
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v.5l-10 6.25L2 6.5V6zm0 2.25l9.4 5.88c.37.23.83.23 1.2 0L22 8.25V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8.25z"/>
          </svg>
          Continue with Email
        </Button>
      </Card>
    </div>
  );
}
