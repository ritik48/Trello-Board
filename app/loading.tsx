import loadingSpinner from "@/public/loading.svg";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="absolute bg-[#00000084] inset-0 flex justify-center items-center">
            <Image src={loadingSpinner} alt="loading" width={70} />
        </div>
    );
}
