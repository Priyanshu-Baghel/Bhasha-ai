import React from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../Assets/Logo/Logo.png';
import { useAuth } from '../../store/auth';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/");
    window.location.reload();
  }

    const menuItems = [
        {
          name: 'Home',
          href: '/',
        },
        {
            name: 'Course',
            href: '/courses',
        },
        {
            name: 'Dubbing',
            href: '/dubbing',
        },
        {
            name: 'Subtitles',
            href: '/subtitles',
        },
        {
            name: 'Notes',
            href: '/notes ',
        },
        {
          name: 'About',
          href: '/about',
        },
        {
          name: 'Contact',
          href: '/contact',
        },
      ]

      const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
      }
    
    const {isLoggedIn} = useAuth();
  
  
    return (
    <>
        
        <div className="relative w-full bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
            {/* <Link to="signin"><h1>Hello</h1></Link> */}
              <span>

                <img src={Logo} width="50" height="30" alt=''/>
              </span>
              <span className="font-bold text-primary" >Bhasha.ai</span>
            </div>
            <div className="hidden grow items-start lg:flex">
              <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className="text-sm font-semibold text-gray-700 hover:text-primary"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            { isLoggedIn 
               ?
               <>
                <div className="hidden lg:block">
              <NavLink
                to="/">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Logout
                </button>
              </NavLink>
            </div> 
            </>
            : <div className="hidden lg:block">
              <NavLink
                to="/signin">
                <button
                    type="button"
                    className="rounded-md bg-black px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign In
                </button>
              </NavLink>
            </div>
          }

            <div className="lg:hidden">
              <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isMenuOpen && (
              <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2">
                        <span>
                            <img src={Logo} width="30" height="30"  alt=''/>
                        </span>
                        <span className="font-bold text-primary">Bhasha.ai</span>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          onClick={toggleMenu}
                          className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold"
                          >
                            <span className="ml-3 text-base font-medium text-gray-900 hover:text-primary">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </nav>
                    </div>
              { isLoggedIn 
               ? 
              <NavLink
                to="/">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                            Logout
                        </button>
                      </NavLink>
                    :<NavLink to="/signin">
                    <button
                      type="button"
                      className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Sign In
                    </button>
                    </NavLink> 
                  }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
      )
    }


export default Navbar;