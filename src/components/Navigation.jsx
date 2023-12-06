import { useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";

export default function Navigation({ images }) {
  const [, params] = useRoute('/:id');
  const [, setLocation] = useLocation();
  const [enterClicked, setEnterClicked] = useState(false)

  const findImageIndex = (title) => images.findIndex(el => encodeURIComponent(el.title) === title);

  const handleNavigation = (direction) => {
    let imageIndex = findImageIndex(params.id);
    let nextIndex = direction === 'left'
      ? (imageIndex === 0 ? images.length - 1 : imageIndex - 1)
      : (imageIndex === images.length - 1 ? 0 : imageIndex + 1);

    setLocation(`/${encodeURIComponent(images[nextIndex].title)}`);
  }

  useEffect(() => { if (params?.id) setEnterClicked(true) }, [params])

  return (
    <div className="fixed bottom-7 sm:bottom-10 flex items-center justify-center w-full">
      {!enterClicked ?
        <div onClick={() => (setEnterClicked(true), setLocation(images[0].title))} className='flex items-center justify-center bg-gray-700 opacity-75 hover:opacity-100 p-4 rounded-full h-20 w-20 cursor-pointer text-white'>
          <span className="leading-none">Enter</span>
        </div> :
        <div className='flex items-center justify-center gap-4'>
          <div onClick={() => handleNavigation('left')}
            className='bg-gray-700 opacity-50 hover:opacity-100 p-4 rounded-full h-12 w-12 sm:h-16 sm:w-16 text-black cursor-pointer rotate-180'>
            <img src="arrow.svg" alt="arrow-left" />
          </div>
          <div onClick={() => (setLocation('/'), setEnterClicked(false))} className='bg-gray-700 opacity-50 hover:opacity-100 p-4 rounded-full h-12 w-12 sm:h-16 sm:w-16 text-black cursor-pointer'>
            <img src="home.svg" alt="home" />
          </div>
          <div onClick={() => handleNavigation('right')} className='bg-gray-700 opacity-50 hover:opacity-100 p-4 rounded-full h-12 w-12 sm:h-16 sm:w-16 text-black cursor-pointer'>
            <img src="arrow.svg" alt="arrow-right" />
          </div>
        </div>
      }
    </div>
  )
}
