import { useEffect, useState } from 'react';
import CountUp from './ui/pagecount';

const API_URL = 'https://v1.codeclub.workers.dev';

export function PageViewCounter() {
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        const incrementPageViews = async () => {
            try {
                await fetch(`${API_URL}/page-views/increment`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const response = await fetch(`${API_URL}/page-views/count`);
                const data = await response.json();
                setPageViews(data.count);
            } catch (error) {
                console.error('Error tracking page views:', error);
                // Set a default value if the API call fails
                setPageViews(0);
            }
        };

        incrementPageViews();
    }, []);

    return (
        <div className="text-center">
            <span className="text-white text-sm block mb-1">Page Views</span>
            <CountUp
                from={0}
                to={pageViews}
                separator=","
                direction="up"
                duration={1}
                className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700"
            />
        </div>
    );
} 