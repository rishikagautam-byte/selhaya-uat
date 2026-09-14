export default function FloatingLogo() {
    return (
        <div className="flex relative justify-center z-20 h-0">
            <div className="absolute -top-8 md:-top-10 w-14 md:w-20 h-14 md:h-20 rounded-full bg-section-bg flex items-center justify-center">
                <img src="/images/logos/logo-black.png" alt="" width={40} height={40} />
            </div>
        </div>
    )
}