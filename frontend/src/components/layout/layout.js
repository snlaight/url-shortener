import NavBar from "../navigation/navbar"
const Layout =({ children })=> {

    return(
        <div className="font-bungee bg-gradient-to-b from-gray-900 to-gray-700 h-screen">
        <NavBar />
            <div>
                {children}
            </div>
        </div>
    )
}
export default Layout