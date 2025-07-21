import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ImageButton } from '../atoms';
import { NavigationMenu, NavigationMenuMobile } from '../molecules';

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <nav className="h-24">
      <div className={`fixed flex justify-between p-5 pb-2 rounded-b-lg drop-shadow-lg bg-secondary z-10 -mt-24 left-0 w-screen transform ${isOpened ? 'translate-y-44' : 'translate-y-0'} transition-transform duration-300 sm:hidden`}>
        <NavigationMenuMobile setIsOpened={setIsOpened} />
      </div>
      <div className="fixed flex top-0 w-screen justify-between bg-secondary px-5 h-24 z-50">
        <Link href="/" passHref>
          <a>
            <Image src="/svg/catly-logo.svg" alt="Catly logo" width="100%" height="100%" />
          </a>
        </Link>
        <NavigationMenu setIsOpened={setIsOpened} />
        <div className="flex justify-center sm:hidden">
          <ImageButton src="/svg/burger-menu.svg" alt="Menu" width="40%" height="40%" onClick={() => setIsOpened(!isOpened)} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
