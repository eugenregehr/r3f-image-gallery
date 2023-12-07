import Loadericon from "./LoaderIcon";

export default function Loader() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black">
            <Loadericon />
        </div>
    )
}