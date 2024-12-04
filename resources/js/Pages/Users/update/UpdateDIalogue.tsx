import Form from "./Form";
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { User } from "@/types";
import { FaUserEdit } from "react-icons/fa";

export default function Update({ rowCurrent }: { rowCurrent: User }) {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <button className="w-full gap-2 flex justify-center items-center">
                    Edit
                    <FaUserEdit />
                </button>
            </CredenzaTrigger>
            <CredenzaContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e: any) => e.preventDefault()}
            >
                <CredenzaHeader>
                    <CredenzaTitle>Update User</CredenzaTitle>
                    <CredenzaDescription>
                        Update the user details.
                    </CredenzaDescription>
                </CredenzaHeader>
                <Form rowCurrent={rowCurrent} />
            </CredenzaContent>
        </Credenza>
    );
}
