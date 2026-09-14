import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="relative flex h-screen w-full justify-center overflow-hidden bg-primary/30">
            <img
                src={"./images/notFound.png"}
                className="absolute inset-0 h-full w-full object-cover"
                alt="heroimage"
            />
            <div className="absolute inset-0 bg-black/30   backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/30">
                <div className="font-editorial text-[36px] md:text-[70px] text-white">404</div>
                <p className='md:text-[24px] text-[18px] text-white font-editorial'>Page Not Found</p>
                <button
                    onClick={() => {
                        navigate('/')
                    }}
                    className="px-4 py-2 mt-4 bg-primary text-white rounded-md md:text-[16px] underline hover:scale-115 transition-transform cursor-pointer">Back to Home</button>
            </div>
        </div>
    );
};

export default NotFound;
