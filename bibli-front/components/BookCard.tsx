import Image from "next/image";
import IBook from "@/@types/Series";
import CollectionIndicator from "./CollectionIndicator";

interface Props {
    books: IBook[];
}


export default function BookCard({ books }: Props) {



    return (
        <>
            <div className="flex flex-col">
                {books.map(book => (
                    <div key= {book.id} className="flex ">
                        <div className="flex w-full outline-1 outline-gray-300 hover:outline-orange-400 rounded-xl m-1">
                            <div className="relative w-[60px] h-[90px] m-2">
                                <Image 
                                    src={book.book_cover!}
                                    alt={book.title}
                                    fill
                                    sizes="60px"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="self-center m-5 text-xl">{book.title}</h3>
                        </div>
                        <div className="self-center">
                            <CollectionIndicator/>
                        </div>
                    </div>
                    
                
                ))}
                
            </div>
        </>
    )

}