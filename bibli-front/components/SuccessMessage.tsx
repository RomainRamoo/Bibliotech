interface IMessageProps {
    successMessage : string;
    isSuccessMessage : boolean;
}

export default function SuccessMessage ({successMessage, isSuccessMessage}:IMessageProps){
    

return (

    <div className={`mt-4 ${isSuccessMessage ? 'text-green-600' : 'text-red-500'} font-semibold text-center text-xl duration-3000`}>
        {successMessage}
    </div>
)
}