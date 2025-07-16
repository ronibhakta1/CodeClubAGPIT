import { Separator } from '../ui/separator';
import { FaGithub, FaLinkedin} from 'react-icons/fa';
import { usePageViews } from '../../contexts/PageViewsContext';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { pageViews, members } = usePageViews();

    return (
        <footer className="w-full bg-zinc-950 py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col mb-4 md:mb-0 items-center md:items-start">
                        <div className="flex items-center gap-2 mb-2">
                            <img src="/logo.png" alt="Code Club AGPIT" className="w-8 h-6" />
                            <span className="text-white text-lg font-semibold">CODE CLUB AGPIT</span>
                        </div>
                        <p className="text-gray-400 text-sm">A.G. Patil Institute of Technology, Solapur</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex items-center gap-8 mb-2">
                            <div className="text-center">
                                <span className="text-white text-sm block mb-1">Page Views</span>
                                <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                                    {pageViews.toLocaleString()}
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="text-white text-sm block mb-1">Members</span>
                                <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                                    {members}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://github.com/AGPIT" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="w-5 h-5 text-gray-400 hover:text-white" />
                            </a>
                            <a href="https://linkedin.com/company/code-club-agpit" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="w-5 h-5 text-blue-400 hover:text-blue-300" />
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-4 bg-zinc-800" />

                <div className="text-center text-gray-400 text-sm">
                    &copy; {currentYear} Code Club AGPIT. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;