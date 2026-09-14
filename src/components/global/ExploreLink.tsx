import { Link } from "react-router-dom";


export default function ExploreLink({
  to = "/the-house-of-selhaya",
  text = "explore The  House",
  uppercase = true,
  showArrow = true,
  arrowColor = "white",
  textsize = "20px",
  className = ""
}) {



  return (

    <Link
      to={to}
      className={`group text-[16px] md:text-[${textsize}] ${uppercase ? "uppercase" : ""} flex items-center gap-2 ${className}`}
    >
      <span className={`group-hover:scale-[1.02] transition-all duration-500 ${to ? "underline" : ""}`}>
        {text}
      </span>

      {showArrow && (
        <span className="group-hover:translate-x-2 transition-all duration-500">
          {arrowColor === "white" ?
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.78516H8M6.26087 5.28516L8 2.78516L6.26087 0.285156" stroke="white" />
            </svg>
            :
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.78516H8M6.26087 5.28516L8 2.78516L6.26087 0.285156" stroke="#281B13" />
            </svg>

          }
        </span>
      )}
    </Link>
  );
}