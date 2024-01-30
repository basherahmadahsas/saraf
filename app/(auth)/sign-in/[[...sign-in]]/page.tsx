import { SignIn } from "@clerk/nextjs";

export default function Page() {
    console.log("Sign in page");
    return (
        <SignIn />
    );
}