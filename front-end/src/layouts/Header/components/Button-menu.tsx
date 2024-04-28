import { ButtonMenuProps } from "@/types/props"
import { FC } from "react"

const ButtonMenu: FC<ButtonMenuProps> = ({ navbarToggleHandler, navbarOpen }) => {
    return (
        <button
            onClick={navbarToggleHandler}
            id="navbarToggler"
            aria-label="Mobile Menu"
            className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
        >
            <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
            />
            <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${navbarOpen ? "opacity-0 " : " "
                    }`}
            />
            <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
            />
        </button>
    )
}

export default ButtonMenu