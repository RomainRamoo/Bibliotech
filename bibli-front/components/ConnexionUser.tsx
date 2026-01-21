'use client'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ConnexionUser () {
    const router = useRouter();
    const { login } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] =useState(false);

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            await login(username, password);
            router.push('/ma-collection');
        } catch {
            setError('Identifiants incorrects');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex justify-center min-h-screen px-4 pt-16">
                <div className='glass rounded-box p-6 w-full h-full max-w-sm sm:max-w-md md:max-w-lg'>
                    <div className="text-center font-bold text-3xl sm:text-4xl">
                        <h1>Accès à ma Bibliothèque</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center flex-col">
                            <fieldset className="fieldset w-full mb-6">
                                <legend className="fieldset-legend text-xl sm:text-2xl mb-2">Nom d'utilisateur</legend>
                                <input type="text" name="username" className="input input-warning w-full" required/>
                                <legend className="fieldset-legend text-xl sm:text-2xl mt-a mb-2">Mot de passe</legend>
                                <input type="password" name='password' className="input input-warning w-full" required/>
                                <div className='text-end mt-2'>
                                    <Link className='underline text-sm sm:text-base' href="#">Mot de passe oublié ?</Link>
                                </div>
                                
                            </fieldset>
                            {error && (
                                <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
                            )}
                            <button className="btn btn-warning w-full text-black text-lg sm:text-xl mb-4" type='submit' disabled={loading}>{loading ? "Connexion..." : "Me connecter"}</button>
                            <div className='text-center text-sm sm:text-base'>
                                <h2>Vous n&apos;avez pas de compte ?</h2>
                                <Link className=" underline" href={"/inscription"}>Inscrivez-vous</Link>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}