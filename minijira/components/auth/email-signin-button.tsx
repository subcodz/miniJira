import { Button } from "../ui/button";

export function EmailSignInButton() {
    return(
        <Button variant="clean_dark" className="w-full mt-2">
          <svg viewBox="0 0 24 24"
            className="h-5 w-5 fill-blue-500 "
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v.5l-10 6.25L2 6.5V6zm0 2.25l9.4 5.88c.37.23.83.23 1.2 0L22 8.25V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8.25z"/>
          </svg>
          Continue with Email
        </Button>
    )
}