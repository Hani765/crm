import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import PopoverComponent from "./popover-component";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface LabelInputContainerProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    containerClassName?: string;
    label?: string;
    description?: string;
    errorMessage?: string;
    popoverMessage?: string;
    successMessage?: string;
    Icon?: React.ComponentType<any>;
}

const LabelInputContainer = React.forwardRef<
    HTMLInputElement,
    LabelInputContainerProps
>(
    (
        {
            className,
            containerClassName,
            label,
            description,
            errorMessage,
            popoverMessage,
            successMessage,
            Icon,
            type,
            ...inputProps
        },
        ref
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
        const isPasswordField = type === "password";
        const inputType = isPasswordField && isPasswordVisible ? "text" : type;

        return (
            <div className={cn("space-y-2 mb-2", containerClassName)}>
                {label && (
                    <Label
                        htmlFor={inputProps.id || inputProps.name}
                        className={`flex gap-1 items-center ${
                            errorMessage ? "text-red-500" : ""
                        }`}
                    >
                        {Icon && (
                            <Icon size={16} className="text-muted-foreground" />
                        )}
                        {label}
                        {inputProps.required ? (
                            <span className="text-red-500 ml-1">*</span>
                        ) : (
                            <span className="text-muted-foreground ml-1">
                                (Optional)
                            </span>
                        )}
                        {popoverMessage && (
                            <PopoverComponent description={popoverMessage} />
                        )}
                    </Label>
                )}

                <div className="relative">
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 ",
                            className,
                            errorMessage ? "border-red-500" : ""
                        )}
                        {...inputProps}
                    />
                    {isPasswordField && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-4 flex items-center text-muted-foreground"
                            onClick={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                            aria-label="Toggle password visibility"
                        >
                            {isPasswordVisible ? <IoEye /> : <IoEyeOff />}
                        </button>
                    )}
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-sm text-green-500 mt-1">
                        {successMessage}
                    </p>
                )}
                {description && (
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                )}
            </div>
        );
    }
);

LabelInputContainer.displayName = "LabelInputContainer";

export { LabelInputContainer };
