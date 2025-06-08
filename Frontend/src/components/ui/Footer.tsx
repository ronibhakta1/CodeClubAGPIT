import { useEffect, useState } from 'react';
import CountUp from '../ui/pagecount';
import { Separator } from '../ui/separator';
import { FaGithub, FaLinkedin, FaUsers } from 'react-icons/fa';

const API_URL = 'https://v1.codeclub.workers.dev';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [pageViews, setPageViews] = useState(() => {
        const savedCount = localStorage.getItem('pageViews');
        console.log('Initial pageViews from localStorage:', savedCount);
        return savedCount ? parseInt(savedCount, 10) : 0;
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchPageViews = async () => {
            try {
                console.log('Fetching page views...');
                const response = await fetch(`${API_URL}/page-views/count`);
                const data = await response.json();
                console.log('Page views response:', data);
                if (data.count !== undefined && isMounted) {
                    console.log('Setting page views to:', data.count);
                    setPageViews(data.count);
                    localStorage.setItem('pageViews', data.count.toString());
                }
            } catch (error) {
                console.error('Error fetching page views:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        const incrementPageViews = async () => {
            try {
                console.log('Attempting to increment page views...');
                const response = await fetch(`${API_URL}/page-views/increment`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                console.log('Increment response:', data);
                
                if (data.success) {
                    // After successful increment, fetch the updated count
                    const countResponse = await fetch(`${API_URL}/page-views/count`);
                    const countData = await countResponse.json();
                    if (countData.count !== undefined && isMounted) {
                        console.log('Setting page views to:', countData.count);
                        setPageViews(countData.count);
                        localStorage.setItem('pageViews', countData.count.toString());
                    }
                }
            } catch (error) {
                console.error('Error incrementing page views:', error);
            }
        };

        // First fetch the current count
        fetchPageViews();
        // Then increment if needed
        incrementPageViews();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, []);

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
                                {isLoading ? (
                                    <span className="text-xl md:text-2xl font-bold text-gray-400">Loading...</span>
                                ) : (
                                    <CountUp
                                        from={pageViews}
                                        to={pageViews}
                                        separator=","
                                        direction="up"
                                        duration={1}
                                        className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700"
                                    />
                                )}
                            </div>
                            <div className="text-center">
                                <span className="text-white text-sm block mb-1">Members</span>
                                <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
                                    100+
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