import { Button } from "@/components/ui/button";
import Form from "./Form";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { PlusIcon } from "lucide-react";

export default function Create() {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit "
                >
                    <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                    Add New User
                </Button>
            </CredenzaTrigger>
            <CredenzaContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e: any) => e.preventDefault()}
            >
                <CredenzaHeader>
                    <CredenzaTitle>Add User</CredenzaTitle>
                    <CredenzaDescription>
                        Add a new user to create custom complaints.
                    </CredenzaDescription>
                </CredenzaHeader>
                <Form />
            </CredenzaContent>
        </Credenza>
    );
}
